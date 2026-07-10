import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc
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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {

  const studentSnap = await getDoc(doc(db, "admissions", id));

  if (!studentSnap.exists()) {
    alert("Student not found.");
    throw new Error("Student not found.");
  }

 let student = studentSnap.data();

  document.getElementById("studentName").textContent =
    student.name || "";

  document.getElementById("fatherName").textContent =
    student.father || "";

  document.getElementById("studentClass").textContent =
    student.className || "";

  document.getElementById("mobile").textContent =
    student.mobile || "";

  document.getElementById("address").textContent =
    student.address || "-";

  document.getElementById("admissionDate").textContent =
    student.admissionDate || "-";

  let totalPaid = 0;
  let lastPayment = "Not Available";
  let paidThisMonth = false;

  const currentMonth = new Date().toISOString().slice(0, 7);

  const feeSnapshot = await getDocs(collection(db, "fees"));

  feeSnapshot.forEach((feeDoc) => {

    const fee = feeDoc.data();

    if (
      (fee.studentName || "").trim().toLowerCase() ===
      (student.name || "").trim().toLowerCase()
    ) {

      totalPaid += Number(fee.amount || 0);

      if (fee.paidOn) {
        lastPayment = fee.paidOn.toDate().toLocaleDateString("en-IN");
      }

      if (fee.month === currentMonth) {
        paidThisMonth = true;
      }

    }

  });
  // WhatsApp Button
document.getElementById("whatsappBtn").onclick = () => {

  const phone = "91" + (student.mobile || "").replace(/\D/g, "");

  const message = encodeURIComponent(
`Dear Parent,

Student: ${student.name}

Thank you for being a part of DUBEY CLASSES.

For any query, please contact:
📞 7503322363`
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

};

// Edit Button
document.getElementById("editBtn").onclick = () => {
  window.location.href = `edit-student.html?id=${id}`;
};

// Delete Button
document.getElementById("deleteBtn").onclick = async () => {

  if (!confirm("Delete this student?")) return;

  await deleteDoc(doc(db, "admissions", id));

  alert("Student deleted successfully.");

  window.location.href = "students.html";

};