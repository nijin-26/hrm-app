import { fetchEmployees, fetchSkills } from "./firebase/firebase.js";
import {
  renderTable,
  renderSkills,
  removeSelectedSkills,
  renderSelectedSkills,
  renderSkillDropdown,
} from "./ui.js";
import { filterTable } from "./filter.js";

const employeeTable = document.querySelector(".employee-list-table");
const departmentFilterInput = document.querySelector(".department-filter");
const roleFilterInput = document.querySelector(".role-filter");
const filterContainer = document.querySelector(".filter-container");
const searchSkillInput = document.querySelector(".skill-search-input");
const skillList = document.querySelector(".dropdown-content");

// Buttons
const openFilterBtn = document.querySelector(".enable-filter-btn");
const clearFilterBtn = document.querySelector(".clear-filter-btn");
const addEmployeeBtn = document.querySelector(".add-employee-btn");

export let selectedSkillsArray = [];
export let employeeData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchSkills((skills) => renderSkills(skills));

  fetchEmployees((employeeArr) => {
    employeeData = employeeArr;
    renderTable(employeeArr);
  });

  const setSelectedSkills = (selectedSkills) => {
    selectedSkillsArray = selectedSkills;
  };

  departmentFilterInput.addEventListener("input", filterTable);
  roleFilterInput.addEventListener("input", filterTable);

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

  openFilterBtn.addEventListener("click", () =>
    filterContainer.classList.toggle("open-filter-options")
  );

  searchSkillInput.addEventListener("focus", () => {
    skillList.style.display = "block";
    searchSkillInput.dispatchEvent(new Event("input"));
  });

  searchSkillInput.addEventListener("blur", () => {
    setTimeout(() => {
      skillList.style.display = "none";
    }, 100);
  });

  searchSkillInput.addEventListener("input", (e) =>
    renderSkillDropdown(e, selectedSkillsArray)
  );

  skillList.addEventListener("click", (e) =>
    renderSelectedSkills(e, selectedSkillsArray, setSelectedSkills)
  );

  clearFilterBtn.addEventListener("click", () => {
    filterContainer.classList.toggle("open-filter-options");
    departmentFilterInput.value = "";
    roleFilterInput.value = "";
    resetSkillFilter();
    filterTable();
  });

  const resetSkillFilter = () => {
    searchSkillInput.value = "";
    searchSkillInput.dispatchEvent(new Event("input"));
    document
      .querySelectorAll(".selected-skill > p")
      .forEach((tagEl) => tagEl.remove());
    selectedSkillsArray = [];
    filterTable();
  };

  addEmployeeBtn.addEventListener("click", () => {
    console.log("Add employee btn clicked");
  });

  document
    .querySelector(".selected-skill")
    .addEventListener("click", (e) =>
      removeSelectedSkills(e, selectedSkillsArray, setSelectedSkills)
    );
});
