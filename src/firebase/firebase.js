// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0fuN8CGrV2HtBOzS19nPL0A8cCuhZ7Pw",
  authDomain: "bitagorapeces.firebaseapp.com",
  projectId: "bitagorapeces",
  storageBucket: "bitagorapeces.appspot.com",
  messagingSenderId: "655875001351",
  appId: "1:655875001351:web:c2e7306592a6ab0f0deea2",
  measurementId: "G-9Z06PHPF6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);