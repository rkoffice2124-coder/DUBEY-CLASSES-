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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {

  const snap = await getDoc(doc(db, "fees", id));

  if (!snap.exists()) {
    alert("Receipt not found.");
    throw new Error("Receipt not found.");
  }

  const data = snap.data();

  // Receipt Number
  document.getElementById("receiptNo").textContent =
    "DC-" + id.substring(0, 8).toUpperCase();

  document.getElementById("studentName").textContent =
    data.studentName || "";

  document.getElementById("fatherName").textContent =
    data.father || "";

  document.getElementById("studentClass").textContent =
    data.studentClass || "";

  document.getElementById("feeMonth").textContent =
    data.month || "";

  document.getElementById("amount").textContent =
    "₹" + (data.amount || 0);

  document.getElementById("paidDate").textContent =
    data.paidOn?.toDate().toLocaleDateString("en-IN") || "";

}
