import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { showToast } from "../utils/toast.js";

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

let loadingState = false;
export const isLoading = () => loadingState;

export const fetchEmployees = (dataCallback) => {
  loadingState = true;
  const employeeRef = ref(db, "employee/");
  onValue(
    employeeRef,
    (snapshot) => {
      loadingState = false;
      // showToast("success", "Employee data & skills fetched successfully.");
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArr = [];
        for (const key in data) {
          const object = {
            id: key,
            ...data[key],
          };
          dataArr.push(object);
        }
        dataCallback(dataArr);
      } else dataCallback([]);
    },
    (error) => showToast("error", "Error from fetch employees", error)
  );
};

export const fetchSkills = (dataCallback) => {
  loadingState = true;
  const skillsRef = ref(db, "skill/");
  onValue(
    skillsRef,
    (snapshot) => {
      loadingState = false;
      if (snapshot.exists()) {
        dataCallback(snapshot.val());
      } else dataCallback([]);
    },
    (error) => showToast("error", "Error from fetching skills", error)
  );
  dataCallback([]);
};

export const deleteEmployee = (employeeId, isDeleted) => {
  loadingState = true;
  const employeeRef = ref(db, "employee/");
  update(employeeRef, { [employeeId]: null }, (error) =>
    showToast("error", "Error occured while removing the employee", error)
  ).then(() => {
    isDeleted();
    showToast("success", "The selected employee is deleted successfuly");
  });
};
