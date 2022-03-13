// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdoa44w_HH0d8xXRNeo_dKrqRo8UJdfLc",
  authDomain: "kittysearch-fc073.firebaseapp.com",
  projectId: "kittysearch-fc073",
  storageBucket: "kittysearch-fc073.appspot.com",
  messagingSenderId: "977379175356",
  appId: "1:977379175356:web:a4bc4981f7dec80a5f19b9",
  measurementId: "G-54NSBYW6SB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
