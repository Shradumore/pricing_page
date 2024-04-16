// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgY-hjfxKAjn5tIv1G2FsPZC--At8mzls",
  authDomain: "aiservices-2c600.firebaseapp.com",
  projectId: "aiservices-2c600",
  storageBucket: "aiservices-2c600.appspot.com",
  messagingSenderId: "941270180039",
  appId: "1:941270180039:web:dfad449c8cfbc3a78d9ee2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
