import { filterTable } from "./filter.js";

const searchSkillInput = document.querySelector(".skill-search-input");
const skillList = document.querySelector(".dropdown-content > .skill-list");
const selectedSkillsContainer = document.querySelector(".selected-skill");
const tableErrorTag = document.querySelector(".error-tag");
const employeeTable = document.querySelector(".employee-list-table");

// <<<<< Function to render/view all skills fetched from db >>>>>>>>
export const renderSkills = (skills) => {
  for (const skillID in skills) {
    const li = document.createElement("li");
    li.textContent = skills[skillID].name;
    li.dataset.skillId = skillID;
    skillList.append(li);
  }
};

// <<<<< Function to render/view all or filtered + sorted employees in the table. >>>>>>>>
export const renderTable = (dataArr) => {
  const allRows = document.querySelectorAll("tr");

  if (dataArr.length === 0) {
    tableErrorTag.style.display = "block";
    allRows.forEach((el) => {
      if (el.id !== "table-header") el.style.display = "none";
      return;
    });
  } else {
    tableErrorTag.style.display = "none";
  }

  allRows.forEach((el) => el.id !== "table-header" && el.remove());

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

// <<<<< Function to render/view skills drop down when input changes. >>>>>>>>
export const renderSkillDropdown = (e, selectedSkillsArray) => {
  const searchValue = e.target.value.toLowerCase();
  const skills = skillList.querySelectorAll("li");

  skills.forEach((skill) => {
    const isSkillSelected = selectedSkillsArray.some(
      (selSkill) => selSkill.id === skill.dataset.skillId
    );

    if (searchValue === "") {
      if (!isSkillSelected) {
        skill.style.display = "block";
      } else {
        skill.style.display = "none";
      }
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

// <<<<< Function to render/view selected skills >>>>>>>>
export const renderSelectedSkills = (
  e,
  selectedSkillsArray,
  setSelectedSkills
) => {
  if (e.target.tagName === "LI") {
    let skillID = e.target.dataset.skillId;
    const skillName = e.target.textContent;

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
  }
};

// <<<<< Function to remove skills from selected list >>>>>>>>
export const removeSelectedSkills = (
  e,
  selectedSkillsArray,
  setSelectedSkills
) => {
  if (e.target.classList.contains("remove-selected-skill-tag")) {
    const targetSkillId = e.target.dataset.skillId;
    e.target.parentElement.remove();

    const updatedSkillList = selectedSkillsArray.filter(
      (skill) => skill.id !== targetSkillId
    );
    setSelectedSkills(updatedSkillList);

    filterTable();
    document.querySelector(
      `.skill-list > [data-skill="${targetSkillId}"]`
    ).style.display = "block";
  }
};
