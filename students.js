import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoeRFMHkzxXtF6_Uqnv-c6xLWtA_8UzPs",
  authDomain: "dubey-classes-87996.firebaseapp.com",
  projectId: "dubey-classes-87996",
  storageBucket: "dubey-classes-87996.firebasestorage.app",
  messagingSenderId: "534008754523",
  appId: "1:534008754523:web:14f00ba6a8c368dba52a7e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let students = [];
let paidStudents = new Set();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadData();
  }
});

async function loadData() {

  // Load Students
  const studentSnapshot = await getDocs(collection(db, "admissions"));

  students = [];

  studentSnapshot.forEach((doc) => {
    students.push({
      id: doc.id,
      ...doc.data()
    });
  });

  // Load Fee Records
const feeSnapshot = await getDocs(collection(db, "fees"));

paidStudents.clear();

// Expected paid month = Previous month
const today = new Date();

today.setMonth(today.getMonth() - 1);

const expectedMonth =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0");

// Store latest paid month of every student
const latestPayment = {};

feeSnapshot.forEach((doc) => {

  const fee = doc.data();

  if (!fee.studentName || !fee.month) return;

  const name = fee.studentName.trim().toLowerCase();

  if (
    !latestPayment[name] ||
    fee.month > latestPayment[name]
  ) {
    latestPayment[name] = fee.month;
  }

});

// Mark Paid only if latest paid month
// is Expected Month or later
Object.keys(latestPayment).forEach((name) => {

  if (latestPayment[name] >= expectedMonth) {
    paidStudents.add(name);
  }

});

  displayStudents(students);
}

function displayStudents(list) {

  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  list.forEach((s) => {

    const studentName = (s.name || "").trim().toLowerCase();

    const isPaid = paidStudents.has(studentName);

    const phone = "91" + (s.mobile || "").replace(/\D/g, "");

    const message = encodeURIComponent(
`Dear Parent,

This is a gentle reminder that the tuition fee of ${s.name} is pending.

Kindly pay the fee at your earliest convenience.

Thank you.

DUBEY CLASSES
📞 7503322363`
    );

    table.innerHTML += `
      <tr>

        <td>
          <a href="student-profile.html?id=${s.id}" style="text-decoration:none;color:#0d47a1;font-weight:bold;">
            ${s.name}
          </a>
        </td>

        <td>${s.father}</td>

        <td>${s.className}</td>

        <td>${s.mobile}</td>

        <td>
          ${
            isPaid
              ? "—"
              : `<a href="https://wa.me/${phone}?text=${message}" target="_blank">
                  <button>📱 WhatsApp</button>
                 </a>`
          }
        </td>

        <td>
          ${
            isPaid
              ? "<span style='color:green;font-weight:bold'>🟢 Paid</span>"
              : "<span style='color:red;font-weight:bold'>🔴 Pending</span>"
          }
        </td>

        <td>
          <button onclick="window.location.href='edit-student.html?id=${s.id}'">
            ✏️ Edit
          </button>
        </td>

        <td>
          <button onclick="deleteStudent('${s.id}')">
            🗑️ Delete
          </button>
        </td>

      </tr>
    `;
  });
}

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", () => {

  const text = searchBox.value.toLowerCase();

  const filtered = students.filter((s) =>
    (s.name || "").toLowerCase().includes(text) ||
    (s.father || "").toLowerCase().includes(text) ||
    (s.className || "").toLowerCase().includes(text) ||
    (s.mobile || "").toLowerCase().includes(text)
  );

  displayStudents(filtered);
});

window.deleteStudent = async function(id) {

  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    await deleteDoc(doc(db, "admissions", id));
    alert("✅ Student deleted successfully.");
    loadData();
  } catch (error) {
    alert(error.message);
  }

};