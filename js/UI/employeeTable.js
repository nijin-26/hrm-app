import { deleteEmployee } from "../firebase/api.js";
import { allSkills, departments, employeeData, roles } from "../main.js";
import { showToast } from "../utils/toast.js";

import {
  tableErrorTag,
  employeeTable,
  modalContent,
} from "../utils/elementSelectors.js";
import { getFormattedDate } from "../utils/formatDate.js";

import { openModal, closeModal } from "./modal.js";

const createEmployeeTableRow = (employee) => {
  const temp = `
    <td> ${employee.id} </td>
    <td> ${employee.fullName} </td>
    <td> ${employee.email} </td>
    <td> ${getFormattedDate(employee.dateOfJoin)[0]} </td>
    <td class="action-btn-container">
    <span class="material-symbols-outlined edit-action-btn"   data-employee-id="${
      employee.id
    }"> edit_document </span>
    <span class="material-symbols-outlined delete-action-btn" data-employee-id="${
      employee.id
    }"> person_remove </span>
    </td>
  `;
  const tr = document.createElement("tr");
  tr.innerHTML = temp;
  tr.dataset.employeeId = employee.id;
  return tr;
};

const renderTable = (dataArr) => {
  const allRows = document.querySelectorAll("tr");

  if (dataArr.length === 0) {
    tableErrorTag.style.display = "block";
    allRows.forEach((el) => {
      if (el.id !== "table-header") el.style.display = "none";
    });
  } else {
    tableErrorTag.style.display = "none";
  }

  allRows.forEach((el) => {
    if (el.id !== "table-header") el.remove();
  });

  dataArr.forEach((employee) => {
    const tr = createEmployeeTableRow(employee);
    employeeTable.append(tr);
  });
};

const viewEmployee = (employeeId) => {
  const selectedEmployee = employeeData.find(
    (employee) => employee.id === employeeId
  );

  const dateOfBirth = getFormattedDate(selectedEmployee.dateOfBirth)[0];
  const dateOfJoin = getFormattedDate(selectedEmployee.dateOfJoin)[0];

  openModal();

  const employeeDetailsContainer = `
    <div class="view-employee-container flex">
    <div class="view-employee-image flex">
      <img src="${
        selectedEmployee.imageURL !== ""
          ? selectedEmployee.imageURL
          : "./assets/images/placeholder-image.png"
      }" width="200" alt="employee_image" />
      <p style="font-weight:500">${selectedEmployee.id}</p>
    </div>
    <div class="employee-details-container">
      <h1>${selectedEmployee.fullName}</h1>
      <h3>${departments[selectedEmployee.department]} - ${
    roles[selectedEmployee.role]
  }</h2>
      <div class="employee-detail-tag employee-email">
        <span class="material-symbols-outlined"> mail </span><span>
        <a href="mailto:${selectedEmployee.email}">${selectedEmployee.email}</a>
        </span>
      </div>
      <div class="employee-detail-tag employee-mobile">
        <span class="material-symbols-outlined"> call </span><span>
        <a href="tel:${selectedEmployee.mobile}">${selectedEmployee.mobile}</a>
        </span>
      </div>
      <div class="employee-detail-tag employee-work-location">
        <span class="material-symbols-outlined"> location_on </span
        ><span>${selectedEmployee.workLocation}</span>
      </div>
      <div class="employee-detail-tag employee-join-date">
        <span class="material-symbols-outlined"> calendar_month </span
        ><span>${dateOfJoin}</span>
      </div>
      <div class="employee-detail-tag employee-dob">
        <span class="material-symbols-outlined"> cake </span><span>${dateOfBirth}</span>
      </div>
    </div>
  </div>
  `;

  modalContent.innerHTML = employeeDetailsContainer;

  const skillsHead = document.createElement("h2");
  skillsHead.innerText = "Skills";
  skillsHead.style.margin = "0";
  modalContent.append(skillsHead);
  const employeeSkillsContainer = document.createElement("div");
  employeeSkillsContainer.classList.add(
    "flex",
    "selected-skill",
    "view-employee"
  );
  selectedEmployee.skill?.forEach((skill) => {
    const skillTag = `<p  class="selected-skill-tag flex">
    <span>${allSkills[skill].name}</span>
    </p>`;
    employeeSkillsContainer.innerHTML += skillTag;
  });
  modalContent.append(employeeSkillsContainer);
};

const deleteBtnHandler = (employeeId) => {
  const confirmationContent = `
  <form class="delete-employee-confirmation" data-employee-id="${employeeId}">
    <p>
      To confirm the deletion of this employee, please enter their ID, "${employeeId}"
      in the field below. Deletion cannot be undone.
    </p>
    <input
      required
      id="delete-confirmation-id-input"
      type="text"
      placeholder="Enter the employee's ID to proceed."
    />
    <div class="flex delete-employee-modal-btns">
      <button type="button" class="btn btn-secondary delete-cancel-btn">Cancel</button>
      <button type="submit" class="btn btn-primary delete-btn disabled" disabled>Delete</button>
    </div>
  </form>
  `;

  modalContent.innerHTML = confirmationContent;
  openModal();

  const deleteConfirmationForm = document.querySelector(
    ".delete-employee-confirmation"
  );
  const deleteBtn = document.querySelector(".delete-btn");
  const cancelBtn = document.querySelector(".delete-cancel-btn");
  const confirmationInput = document.querySelector(
    "#delete-confirmation-id-input"
  );

  confirmationInput.focus();

  confirmationInput.addEventListener("input", (e) => {
    if (e.target.value === "") {
      deleteBtn.disabled = true;
      deleteBtn.classList.add("disabled");
    } else {
      deleteBtn.disabled = false;
      deleteBtn.classList.remove("disabled");
    }
  });

  deleteConfirmationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (confirmationInput.value === employeeId)
      deleteEmployee(e.target.dataset.employeeId, () => closeModal());
    else showToast("warning", "You have entered a wrong ID. Please Try again.");
  });

  cancelBtn.addEventListener("click", closeModal);
};

export { renderTable, viewEmployee, deleteBtnHandler };
