// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8GcDfV58a9ZhhLoNjHYUmlObjGPgvNKo",
    authDomain: "crickify-2c977.firebaseapp.com",
    projectId: "crickify-2c977",
    storageBucket: "crickify-2c977.firebasestorage.app",
    messagingSenderId: "687492233123",
    appId: "1:687492233123:web:d47a3035d4b60b42facc16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);