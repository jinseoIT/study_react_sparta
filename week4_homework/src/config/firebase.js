// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "sparta-react-basic-e1e36.firebaseapp.com",
  projectId: "sparta-react-basic-e1e36",
  storageBucket: "sparta-react-basic-e1e36.appspot.com",
  messagingSenderId: "97465609225",
  appId: "1:97465609225:web:3654389e5c8795417adcd8",
  measurementId: "G-59H4060T7P"
};

initializeApp(firebaseConfig)

export const db = getFirestore();