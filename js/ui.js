import { filterTable } from "./filter.js";
import { employeeData, selectedSkillsArray } from "./main.js";

const searchSkillInput = document.querySelector(".skill-search-input");
const skillList = document.querySelector(".dropdown-content > .skill-list");
const selectedSkillsContainer = document.querySelector(".selected-skill");
const tableErrorTag = document.querySelector(".error-tag");
const employeeTable = document.querySelector(".employee-list-table");
const modalContainer = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const overlayContainer = document.querySelector(".overlay");

const createSkillListItem = (skillID, name) => {
  const li = document.createElement("li");
  li.textContent = name;
  li.dataset.skillId = skillID;
  return li;
};

const createEmployeeTableRow = (employee) => {
  const temp = `
    <td> ${employee.id} </td>
    <td> ${employee.fullName} </td>
    <td> ${employee.email} </td>
    <td> ${employee.dateOfJoin} </td>
    <td class="action-btn-container">
    <span class="material-symbols-outlined edit-action-btn"   data-employee-id="${employee.id}"> edit_document </span>
    <span class="material-symbols-outlined delete-action-btn" data-employee-id="${employee.id}"> person_remove </span>
    </td>
  `;
  const tr = document.createElement("tr");
  tr.innerHTML = temp;
  tr.dataset.employeeId = employee.id;
  return tr;
};

export const renderSkills = (skills) => {
  for (const skillID in skills) {
    const li = createSkillListItem(skillID, skills[skillID].name);
    skillList.append(li);
  }
};

export const renderTable = (dataArr) => {
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

export const renderSkillDropdown = (e) => {
  const searchValue = e.target.value.toLowerCase();
  const skills = skillList.querySelectorAll("li");

  skills.forEach((skill) => {
    const isSkillSelected = selectedSkillsArray.some(
      (selSkill) => selSkill.id === skill.dataset.skillId
    );

    if (searchValue === "") {
      skill.style.display = isSkillSelected ? "none" : "block";
    } else if (
      !isSkillSelected &&
      skill.textContent.toLowerCase().includes(searchValue)
    ) {
      skill.style.display = "block";
    } else {
      skill.style.display = "none";
    }
  });
};

export const renderSelectedSkills = (e, setSelectedSkills) => {
  let target;
  const skills = skillList.querySelectorAll("li");

  if (e.type === "keydown") {
    Array.from(skills).some((skillEl) => {
      if (skillEl.style.display === "block") {
        target = skillEl;
        return true;
      }
      return false;
    });
  } else if (e.target.tagName === "LI") {
    target = e.target;
  } else {
    return;
  }

  let skillID = target.dataset.skillId;
  const skillName = target.textContent;

  if (!selectedSkillsArray.some((skill) => skill.id === skillID)) {
    searchSkillInput.value = "";
    selectedSkillsArray.push({ id: skillID, name: skillName });
    setSelectedSkills(selectedSkillsArray);
    const temp = `<p  class="selected-skill-tag flex">
      <span>${skillName}</span>
      <span class="material-symbols-outlined remove-selected-skill-tag" data-skill-id=${skillID}>
          do_not_disturb_on
      </span>
      </p>`;
    selectedSkillsContainer.innerHTML += temp;
    filterTable();
  }
};

export const removeSelectedSkills = (e, setSelectedSkills) => {
  let targetSkillId;

  if (e.type === "keydown") {
    targetSkillId = selectedSkillsArray.at(-1).id;
  } else if (e.target.classList.contains("remove-selected-skill-tag")) {
    targetSkillId = e.target.dataset.skillId;
  } else {
    return;
  }

  const selectedSkillTag = document.querySelector(
    `.selected-skill [data-skill-id="${targetSkillId}"]`
  );

  if (selectedSkillTag) {
    selectedSkillTag.parentElement.remove();
  }

  const updatedSkillList = selectedSkillsArray.filter(
    (skill) => skill.id !== targetSkillId
  );

  setSelectedSkills(updatedSkillList);

  filterTable();

  const skillListItem = document.querySelector(
    `.skill-list > [data-skill-id="${targetSkillId}"]`
  );

  if (skillListItem) {
    skillListItem.style.display = "block";
  }
};

export const viewEmployee = (employeeId) => {
  const selectedEmployee = employeeData.find(
    (employee) => employee.id === parseInt(employeeId)
  );

  overlayContainer.classList.add("open");
  modalContainer.classList.add("open");

  const employeeDetailsContainer = `
    <div class="view-employee-container flex">
    <div class="view-employee-image flex">
      <img src="./assets/images/placeholder-image.png" width="200" alt="employee_image" />
      <p>${selectedEmployee.id}</p>
    </div>
    <div class="employee-details-container">
      <h1>${selectedEmployee.fullName}</h1>
      <h2>Development - Trainee</h2>
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
        ><span>${selectedEmployee.dateOfJoin}</span>
      </div>
      <div class="employee-detail-tag employee-dob">
        <span class="material-symbols-outlined"> cake </span><span>${selectedEmployee.dateOfBirth}</span>
      </div>
    </div>
  </div>
  `;
  modalContent.innerHTML = employeeDetailsContainer;
  // modalContainer.append(employeeDetailsContainer);
};
