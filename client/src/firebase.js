// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-be838.firebaseapp.com",
  projectId: "mern-blog-be838",
  storageBucket: "mern-blog-be838.appspot.com",
  messagingSenderId: "687838535005",
  appId: "1:687838535005:web:a0396d20c22084f23f1cb4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

