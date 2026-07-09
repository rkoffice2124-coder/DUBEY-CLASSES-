import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
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

// Load student details
async function loadStudent() {

  if (!id) {
    alert("Student ID not found.");
    return;
  }

  const studentRef = doc(db, "admissions", id);
  const snap = await getDoc(studentRef);

  if (!snap.exists()) {
    alert("Student not found.");
    return;
  }

  const s = snap.data();

  document.getElementById("name").value = s.name || "";
  document.getElementById("father").value = s.father || "";
  document.getElementById("className").value = s.className || "";
  document.getElementById("mobile").value = s.mobile || "";
  document.getElementById("address").value = s.address || "";
}

loadStudent();

// Update student
document.getElementById("editForm").addEventListener("submit", async (e) => {

  e.preventDefault();

  await updateDoc(doc(db, "admissions", id), {

    name: document.getElementById("name").value,
    father: document.getElementById("father").value,
    className: document.getElementById("className").value,
    mobile: document.getElementById("mobile").value,
    address: document.getElementById("address").value

  });

  alert("✅ Student updated successfully!");

  window.location.href = "students.html";

});