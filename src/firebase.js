// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTL6xhQHrUXqxIhxoMyDL6WtSX8ddDoLU",
  authDomain: "eatio-ef82d.firebaseapp.com",
  projectId: "eatio-ef82d",
  storageBucket: "eatio-ef82d.firebasestorage.app",
  messagingSenderId: "911782225762",
  appId: "1:911782225762:web:39b0da91fdd7cb3059ee3b",
  measurementId: "G-HP26PLCLYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
