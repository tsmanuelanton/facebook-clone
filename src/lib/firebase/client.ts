// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHZ_KT-ewZloyK0M9x0vr1zVXdnJSYBew",
  authDomain: "facebook-clone-uo276213.firebaseapp.com",
  projectId: "facebook-clone-uo276213",
  storageBucket: "facebook-clone-uo276213.appspot.com",
  messagingSenderId: "73250121069",
  appId: "1:73250121069:web:dda0c0b09b9c4d1b816664",
  measurementId: "G-BCVMQBQL8W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);