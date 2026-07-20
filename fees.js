import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
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

// Check login
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

const form = document.getElementById("feeForm");
const classSelect = document.getElementById("studentClass");
const amountInput = document.getElementById("amount");

// Set fee to ₹1500
function setFee() {
  amountInput.value = 1500;
}

// Auto set fee
classSelect.addEventListener("change", setFee);
setFee();

// Save Fee
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {

    const receiptNo = "DC-" + Date.now();

    const docRef = await addDoc(collection(db, "fees"), {
      receiptNo: receiptNo,
      studentName: document.getElementById("studentName").value.trim(),
      father: document.getElementById("father").value.trim(),
      studentClass: classSelect.value,
      month: document.getElementById("feeMonth").value,
      amount: Number(amountInput.value),
      paidOn: new Date()
    });

    alert("✅ Fee saved successfully!");

    window.location.href = "receipt.html?id=" + docRef.id;

  } catch (error) {

    console.error(error);

    alert("Error saving fee: " + error.message);

  }

});