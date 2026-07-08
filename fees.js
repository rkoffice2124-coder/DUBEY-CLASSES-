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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

const classSelect = document.getElementById("studentClass");
const amountInput = document.getElementById("amount");

// Automatically set fee amount
classSelect.addEventListener("change", () => {
  const cls = parseInt(classSelect.value);

  if (cls >= 6 && cls <= 8) {
    amountInput.value = 2000;
  } else if (cls >= 9 && cls <= 10) {
    amountInput.value = 2500;
  }
});

const form = document.getElementById("feeForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const docRef = await addDoc(collection(db, "fees"), {
    studentName: document.getElementById("studentName").value,
    father: document.getElementById("father").value,
    studentClass: classSelect.value,
    month: document.getElementById("feeMonth").value,
    amount: Number(amountInput.value),
    paidOn: new Date()
});
    studentName: document.getElementById("studentName").value,
    studentClass: classSelect.value,
    month: document.getElementById("feeMonth").value,
    amount: Number(amountInput.value),
    paidOn: new Date()
  });

  alert("Fee saved successfully!");
  form.reset();
});
