import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
  set,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as strRef,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

import { showToast } from "../utils/toast.js";
import { closeModal } from "../UI/modal.js";

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
const storage = getStorage(app);

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

export const fetchDeparments = (callback) => {
  const deptRef = ref(db, "department/");
  onValue(
    deptRef,
    (snapshot) => {
      if (snapshot.exists()) callback(snapshot.val());
      else callback({});
    },
    (error) => showToast("error", "Error in fetching department.", error)
  );
};

export const fetchRoles = (callback) => {
  const roleRef = ref(db, "role/");
  onValue(
    roleRef,
    (snapshot) => {
      if (snapshot.exists()) callback(snapshot.val());
      else callback({});
    },
    (error) => showToast("error", "Error in fetching department.", error)
  );
};

const uploadImage = async (file) => {
  try {
    const storageRef = strRef(storage, crypto.randomUUID());

    return uploadBytes(storageRef, file).then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    });
  } catch (err) {
    loadingState = false;
    showToast("error", "Image upload failed.Try again.", err);
  }
};

function generateUniqueKey() {
  const key = Math.floor(1000 + Math.random() * 9000).toString();

  return get(child(ref(db), `employee/${key}`)).then((snapshot) => {
    if (snapshot.exists()) return generateUniqueKey();
    else return key;
  });
}

export const addEmployee = async (data, formElement) => {
  loadingState = true;
  if (data.imageURL) data.imageURL = await uploadImage(data.imageURL);
  else data.imageURL = "";

  const uniqueKey = await generateUniqueKey();

  set(ref(db, `employee/${uniqueKey}`), data, (error) => {
    loadingState = false;
    showToast("error", "Add Employee failed. Try again.", error);
  }).then(() => {
    loadingState = false;
    showToast("success", "Employee added successfully");
    formElement.reset();
    closeModal();
  });
};

export const updateEmployee = async (id, data, formElement) => {
  loadingState = true;
  if (data.imageURL) {
    if (typeof data.imageURL === "object")
      data.imageURL = await uploadImage(data.imageURL);
  }

  update(ref(db, `employee/${id}`), data, (error) => {
    loadingState = false;
    showToast("error", "Update Employee failed. Try again.", error);
  }).then(() => {
    loadingState = false;
    showToast("success", "Employee data updated successfully");
    formElement.reset();
    closeModal();
  });
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
