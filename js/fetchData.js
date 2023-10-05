import { db, ref, onValue } from "./lib/firebase.js";

const employeeListingContainer = document.querySelector(
  ".employee-list-container"
);
const employeeTable = document.querySelector(".employee-list-table");
const departmentFilterInput = document.querySelector(".department-filter");
const roleFilterInput = document.querySelector(".role-filter");
const skillList = document.querySelector(".skill-list");

let employeeData;

const fetchEmployees = (dataCallback) => {
  const employeeRef = ref(db, "employee/");
  onValue(employeeRef, (snapshot) => {
    if (snapshot.exists()) dataCallback(snapshot.val());
    else dataCallback([]);
  });
  // dataCallback([]);
};

const fetchSkills = (dataCallback) => {
  const skillsRef = ref(db, "skill/");
  onValue(skillsRef, (snapshot) => {
    if (snapshot.exists()) dataCallback(snapshot.val());
    else dataCallback([]);
  });
  dataCallback([]);
};

const renderTable = (dataArr) => {
  if (dataArr.length === 0) {
    document.querySelector(".error-tag").style.display = "block";
    document.querySelectorAll("tr").forEach((el) => {
      if (el.id !== "table-header") el.style.display = "none";
      return;
    });
  } else {
    document.querySelector(".error-tag").style.display = "none";
    // employeeTable.style.display = "";
  }

  document
    .querySelectorAll("tr")
    .forEach((el) => el.id !== "table-header" && el.remove());

  dataArr.forEach((employee) => {
    const temp = `
        <td> ${employee.id} </td>
        <td> ${employee.fullName} </td>
        <td> ${employee.email} </td>
        <td> ${employee.dateOfJoin} </td>
        <td class="action-btn-container">
        <span id="edit-action-btn" class="material-symbols-outlined"  data-employee-id="${employee.id}"> edit_document </span>
        <span id="delete-action-btn" class="material-symbols-outlined" data-employee-id="${employee.id}"> person_remove </span>
        </td>
    `;
    const tr = document.createElement("tr");
    tr.innerHTML = temp;
    tr.dataset.employeeId = employee.id;
    employeeTable.append(tr);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  fetchSkills((skills) => {
    for (const skillID in skills) {
      const li = document.createElement("li");
      li.textContent = skills[skillID].name;
      li.dataset.skill = skillID;
      skillList.append(li);
    }
  });

  fetchEmployees((employeeArr) => {
    employeeData = employeeArr;
    renderTable(employeeArr);
  });

  employeeTable.addEventListener("click", (e) => {
    if (e.target.id === "edit-action-btn") {
      console.log("Edit btn clicked", e.target.dataset);
    } else if (e.target.id === "delete-action-btn") {
      console.log("Delte btn is clicked");
    } else if (e.target.tagName === "TH") {
      console.log("head clicked");
    } else {
      console.log(e.target.closest("tr").dataset);
    }
  });
});

export const filterTable = () => {
  const selectedDepartment = departmentFilterInput.value;
  const selectedRole = roleFilterInput.value;

  const filteredEmployees = employeeData.filter((employee) => {
    if (selectedDepartment !== "" && selectedRole !== "")
      return (
        employee.department[0] === selectedDepartment &&
        employee.role[0] === selectedRole
      );
    else if (selectedDepartment !== "" && selectedRole === "")
      return employee.department[0] === selectedDepartment;
    else if (selectedRole !== "" && selectedDepartment === "")
      return employee.role[0] === selectedRole;
    else return employee;
  });

  renderTable(filteredEmployees);
};

departmentFilterInput.addEventListener("input", filterTable);
roleFilterInput.addEventListener("input", filterTable);
