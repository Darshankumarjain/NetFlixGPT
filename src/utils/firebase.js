// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbOHE91UjgJRFPTxB15IaA15H2ZMGtC2M",
  authDomain: "netflixgpt-e53d7.firebaseapp.com",
  projectId: "netflixgpt-e53d7",
  storageBucket: "netflixgpt-e53d7.firebasestorage.app",
  messagingSenderId: "460065231790",
  appId: "1:460065231790:web:16da0afec625a30e6cae3f",
  measurementId: "G-BXWLDP8V9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();