// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwtjTNDS3SRRuTELHppREwgCZmAmvrc7k",
  authDomain: "myproject-72b0f.firebaseapp.com",
  projectId: "myproject-72b0f",
  storageBucket: "myproject-72b0f.firebasestorage.app",
  messagingSenderId: "371528787568",
  appId: "1:371528787568:web:7463ea681af42c80ee36b5",
  measurementId: "G-7FNMVBYP5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
