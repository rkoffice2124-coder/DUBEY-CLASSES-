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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadStudents();
  }
});

async function loadStudents() {
  const snapshot = await getDocs(collection(db, "admissions"));

  students = [];

  snapshot.forEach((doc) => {
    students.push(doc.data());
  });

  displayStudents(students);
}

function displayStudents(list) {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  list.forEach((s) => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.father}</td>
        <td>${s.className}</td>
        <td>${s.mobile}</td>
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
