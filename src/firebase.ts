// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqSrpINb11lGJKMnuKOVbK5VwZ8acxdO0",
  authDomain: "stride-cc49c.firebaseapp.com",
  projectId: "stride-cc49c",
  storageBucket: "stride-cc49c.firebasestorage.app",
  messagingSenderId: "1042880771931",
  appId: "1:1042880771931:web:a5822991f2629efbfa0c7e",
  measurementId: "G-35JYW2KC18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);