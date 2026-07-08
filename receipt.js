import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
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

// Get document ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  const snap = await getDoc(doc(db, "fees", id));

  if (snap.exists()) {
    const data = snap.data();

    document.getElementById("studentName").textContent = data.studentName || "";
    document.getElementById("fatherName").textContent = data.father || "";
    document.getElementById("studentClass").textContent = data.studentClass || "";
    document.getElementById("feeMonth").textContent = data.month || "";
    document.getElementById("amount").textContent = "₹" + data.amount;
    document.getElementById("paidDate").textContent =
      data.paidOn?.toDate().toLocaleDateString() || "";
  } else {
    alert("Receipt not found.");
  }
}