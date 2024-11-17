
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmYh8h8gQ1AW7bV8ffX4vRgyKJjDt620s",
  authDomain: "monito-d7205.firebaseapp.com",
  projectId: "monito-d7205",
  storageBucket: "monito-d7205.appspot.com",
  messagingSenderId: "304467228958",
  appId: "1:304467228958:web:d86d4b3ea9aa6e2d06f10f",
  measurementId: "G-83PQ4GZ044"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth
