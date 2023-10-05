import { db, ref, onValue } from "./lib/firebase.js";

const employeeListingContainer = document.querySelector(
  ".employee-list-container"
);
const employeeTable = document.querySelector(".employee-list-table");

const fetchEmployees = (dataCallback) => {
  const employeeRef = ref(db, "employee/");
  onValue(employeeRef, (snapshot) => {
    if (snapshot.exists()) dataCallback(snapshot.val());
    else dataCallback([]);
  });
};

const renderTable = (dataArr) => {
  if (dataArr.length === 0) {
    employeeTable.remove();
    employeeListingContainer.innerHTML = `
            <p class="error-tag">No data found. Add an employee.</p>
        `;
    return;
  }

  dataArr.forEach((employee) => {
    const temp = `
        <td> ${employee.id} </td>
        <td> ${employee.fullName} </td>
        <td> ${employee.email} </td>
        <td> ${employee.dateOfJoin} </td>
        <td class="action-btn-container">
        <span class="material-symbols-outlined edit-action-btn" data-employee-id="${employee.id}"> edit_document </span>
        <span class="material-symbols-outlined delete-action-btn" data-employee-id="${employee.id}"> person_remove </span>
        </td>
    `;
    const tr = document.createElement("tr");
    tr.innerHTML = temp;
    employeeTable.append(tr);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  renderTable([]);
  //   fetchEmployees((employeeArr) => renderTable(employeeArr));
});
