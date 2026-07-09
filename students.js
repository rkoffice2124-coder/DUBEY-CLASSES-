import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
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

  // Load Fees
  const feeSnapshot = await getDocs(collection(db, "fees"));

  paidStudents.clear();

  const currentMonth = new Date().toISOString().slice(0,7);

  feeSnapshot.forEach((doc) => {

    const fee = doc.data();

    if (fee.month === currentMonth && fee.studentName) {

      paidStudents.add(
        fee.studentName.trim().toLowerCase()
      );

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

    const phone = "91" + (s.mobile || "").replace(/\D/g,"");

    const message = encodeURIComponent(
`Dear Parent,

This is a gentle reminder that the tuition fee of ${s.name} for this month is still pending.

Kindly pay the fee at your earliest convenience.

Thank you.

DUBEY CLASSES
📞 7503322363`
    );

    table.innerHTML += `
    <tr>

      <td>${s.name}</td>

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
