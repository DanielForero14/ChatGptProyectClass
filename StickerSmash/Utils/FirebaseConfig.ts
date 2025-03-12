// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcSzJFzka74dZGj6Xn3c7VoCdpYgpQsfc",
  authDomain: "dam-chatgpt-2025-1-dff60.firebaseapp.com",
  projectId: "dam-chatgpt-2025-1-dff60",
  storageBucket: "dam-chatgpt-2025-1-dff60.firebasestorage.app",
  messagingSenderId: "963641731928",
  appId: "1:963641731928:web:b29f1f3bc9edf03369932d",
  measurementId: "G-HBRXRMVM3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db_instance = getFirestore(app);