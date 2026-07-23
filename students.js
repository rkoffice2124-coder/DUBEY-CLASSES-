import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

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

// Stores latest fee month paid by each student
let latestFee = {};

onAuthStateChanged(auth, (user) => {

  if (!user) {

    window.location.href = "login.html";

  } else {

    loadData();

  }

});
async function loadData() {

  // Load all students
  const studentSnapshot = await getDocs(collection(db, "admissions"));

  students = [];

  studentSnapshot.forEach((docSnap) => {

    students.push({
      id: docSnap.id,
      ...docSnap.data()
    });

  });

  // Load all fee records
  const feeSnapshot = await getDocs(collection(db, "fees"));

  latestFee = {};

  feeSnapshot.forEach((docSnap) => {

    const fee = docSnap.data();

    if (!fee.studentName || !fee.month) return;

    const name = fee.studentName.trim().toLowerCase();

    // Keep only the latest fee month for each student
    if (!latestFee[name] || fee.month > latestFee[name]) {
      latestFee[name] = fee.month;
    }

  });

  displayStudents(students);

}
function displayStudents(list) {

  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  // Today's date
  const today = new Date();

  // Previous month is the month that should already be paid
  let dueYear = today.getFullYear();
  let dueMonth = today.getMonth(); // 0 = January

  if (dueMonth === 0) {
    dueMonth = 12;
    dueYear--;
  }

  const dueMonthString =
    dueYear + "-" + String(dueMonth).padStart(2, "0");

  list.forEach((s) => {

    const studentName = (s.name || "").trim().toLowerCase();

    const lastPaid = latestFee[studentName] || "";

    // Student is paid only if latest paid month is
    // equal to or after the last completed month.
    const isPaid = lastPaid >= dueMonthString;

    const phone = "91" + (s.mobile || "").replace(/\D/g, "");

    const message = encodeURIComponent(
`Dear Parent,

The tuition fee of ${s.name} is pending.

Please pay the fee at your earliest convenience.

Thank you.

DUBEY CLASSES
📞 7503322363`
    );
    table.innerHTML += `
      <tr>

        <td>
          <a href="student-profile.html?id=${s.id}"
             style="text-decoration:none;color:#0d47a1;font-weight:bold;">
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
// -------------------- SEARCH --------------------

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

// -------------------- DELETE STUDENT --------------------

window.deleteStudent = async function(id) {

  const ok = confirm("Are you sure you want to delete this student?");

  if (!ok) return;

  try {

    await deleteDoc(doc(db, "admissions", id));

    alert("✅ Student deleted successfully.");

    loadData();

  } catch (error) {

    alert("Error: " + error.message);

  }

};