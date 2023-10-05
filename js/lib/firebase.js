import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVJaFfoEBM3-ZqT89iRzQ-1K9dKIoThO8",
  authDomain: "hrm-app-6cb10.firebaseapp.com",
  databaseURL:
    "https://hrm-app-6cb10-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hrm-app-6cb10",
  storageBucket: "hrm-app-6cb10.appspot.com",
  messagingSenderId: "588841693832",
  appId: "1:588841693832:web:7a98a8759551243ee0653d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue };
