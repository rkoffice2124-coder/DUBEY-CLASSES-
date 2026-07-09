import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Firebase Configuration
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
  if (user) {
    loadDashboard();
  } else {
    window.location.href = "login.html";
  }
});

async function loadDashboard() {

  // Total Students
  const studentSnapshot = await getDocs(collection(db, "admissions"));
  document.getElementById("totalStudents").textContent = studentSnapshot.size;

  // Total Fee Collected
  const feeSnapshot = await getDocs(collection(db, "fees"));

  let totalFee = 0;

  feeSnapshot.forEach((doc) => {
    totalFee += doc.data().amount || 0;
  });

  const feeElement = document.getElementById("totalFees");

  if (feeElement) {
    feeElement.textContent = "₹" + totalFee;
  }

}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {

  try {

    await signOut(auth);

    alert("Logged out successfully!");

    window.location.href = "login.html";

  } catch (error) {

    alert("Logout failed: " + error.message);

  }

});
