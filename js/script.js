// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyB0zpVuHT3i5EYrUIJHlBodTqodbnh6_0o",
    authDomain: "store-b75fb.firebaseapp.com",
    projectId: "store-b75fb",
    storageBucket: "store-b75fb.appspot.com",
    messagingSenderId: "571076537304",
    appId: "1:571076537304:web:ef70e73465b2dc5918a0ad",
    measurementId: "G-38TQFJVW0B"
  };





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

document.addEventListener("DOMContentLoaded", function () {
    const formOpenBtn = document.querySelector("#form-open");
    const home = document.querySelector(".home");
    const formContainer = document.querySelector(".form_container");
    const formCloseBtn = document.querySelector(".form_close");
    const signupBtn = document.querySelector("#signup");
    const loginBtn = document.querySelector("#login");
    const pwShowHide = document.querySelectorAll(".pw_hide");


    if (formOpenBtn && home) {
        formOpenBtn.addEventListener("click", () => home.classList.add("show"));
    }

    if (formCloseBtn && home) {
        formCloseBtn.addEventListener("click", () => home.classList.remove("show"));
    }

    if (pwShowHide.length > 0) {
        pwShowHide.forEach((icon) => {
            icon.addEventListener("click", () => {
                let getPwInput = icon.parentElement.querySelector("input");
                if (getPwInput) {
                    if (getPwInput.type === "password") {
                        getPwInput.type = "text";
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    } else {
                        getPwInput.type = "password";
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    }
                }
            });
        });
    }


    

    if (signupBtn && formContainer) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.classList.add("active");
        });
    }

    if (loginBtn && formContainer) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.classList.remove("active");
        });
    }

    // Signup functionality
    const signupButton = document.getElementById("signupBtn1");
    if (signupButton) {
        signupButton.addEventListener("click", (e) => {
          e.preventDefault()
            const email = document.getElementById('email1');
            const password = document.getElementById('pass1');
            const cpass=document.getElementById('cpass');
            // console.log(email.value,password.value,cpass.value);
            // console.log(cpass);
            
            

            if(!email||!password||!cpass){
              
              Toastify({
                text: "One or more elements are missing",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
            }).showToast();
              return;
            }
            if(password.value!==cpass.value){
              
              Toastify({
                text: "password do not match!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
            }).showToast();
              return;
            }

            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    // Signed up
                    Toastify({
                        text: "signup successfull",
                        duration: 3000, // Duration in milliseconds
                        close: true,
                        gravity: "top", // or "bottom"
                        position: "right", // or "left"
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                    }).showToast();
                    formContainer.classList.remove("active");
                    email.value='';
                    password.value='';
                    cpass.value=''
                })
                .catch((error) => {
                    console.error(error.code, error.message);
                    Toastify({
                        text: "Signup failed: " + error.message,
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                    }).showToast();
                });
        });
    }

    // Login functionality
    const loginButton = document.getElementById("btn2");
    if (loginButton) {
        loginButton.addEventListener("click", (e) => {
          e.preventDefault();
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            

            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    // Signed in
                    Toastify({
                        text: "Login successful!",
                        duration: 3000, // Duration in milliseconds
                        close: true,
                        gravity: "top", // or "bottom"
                        position: "right", // or "left"
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                    }).showToast();
                    location.href='./Todo.html'
                    email.value='';
                    password.value='';
                   
                   
                })
                .catch((error) => {
                    console.error(error.code, error.message);
                    Toastify({
                        text: "Login failed: " + error.message,
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                    }).showToast();
                });
        });
    }
});
