// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADpcsWRpDF62w3N9vC7fJ5zZx0Yi3Rml0",
  authDomain: "vita-train-ai.firebaseapp.com",
  projectId: "vita-train-ai",
  storageBucket: "vita-train-ai.firebasestorage.app",
  messagingSenderId: "502976041522",
  appId: "1:502976041522:web:495c433750c54792d9a22b",
  measurementId: "G-XWT7B6SKM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);