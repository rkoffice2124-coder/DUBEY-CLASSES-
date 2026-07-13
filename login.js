import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

/* Firebase Configuration */

const firebaseConfig = {
  apiKey: "AIzaSyCoeRFMHkzxXtF6_Uqnv-c6xLWtA_8UzPs",
  authDomain: "dubey-classes-87996.firebaseapp.com",
  projectId: "dubey-classes-87996",
  storageBucket: "dubey-classes-87996.firebasestorage.app",
  messagingSenderId: "534008754523",
  appId: "1:534008754523:web:14f00ba6a8c368dba52a7e"
};

/* Initialize Firebase */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Login Form */

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    errorBox.innerHTML = "";

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Welcome to DUBEY CLASSES Admin Dashboard");

        window.location.href = "admin.html";

    }

    catch (error) {

        switch (error.code) {

            case "auth/invalid-email":
                errorBox.innerHTML = "Invalid email address.";
                break;

            case "auth/user-not-found":
                errorBox.innerHTML = "No admin account found.";
                break;

            case "auth/wrong-password":
                errorBox.innerHTML = "Incorrect password.";
                break;

            case "auth/invalid-credential":
                errorBox.innerHTML = "Incorrect email or password.";
                break;

            default:
                errorBox.innerHTML = "Login failed. Please try again.";

        }

    }

});
