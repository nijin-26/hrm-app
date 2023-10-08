import { fetchEmployees, fetchSkills, isLoading } from "./firebase/firebase.js";
import {
  renderTable,
  renderSkills,
  removeSelectedSkills,
  renderSelectedSkills,
  renderSkillDropdown,
} from "./ui.js";
import { toggleTheme } from "./toggleTheme.js";
import { filterTable } from "./filter.js";
import { sortTable } from "./sort.js";

const searchEmployeeInput = document.querySelector(".search-employee-input");
const employeeTable = document.querySelector(".employee-list-table");
const departmentFilterInput = document.querySelector(".department-filter");
const roleFilterInput = document.querySelector(".role-filter");
const filterContainer = document.querySelector(".filter-container");
const searchSkillInput = document.querySelector(".skill-search-input");
const skillList = document.querySelector(".dropdown-content");
const selectedSkillsContainer = document.querySelector(".selected-skill");
const tableLoader = document.querySelector(
  ".loader-container.table-data-loader"
);
const skillsLoader = document.querySelector(".loader-container.skills-loader");

// Buttons
const openFilterBtn = document.querySelector(".enable-filter-btn");
const clearFilterBtn = document.querySelector(".clear-filter-btn");
const addEmployeeBtn = document.querySelector(".add-employee-btn");

export let selectedSkillsArray = [];
export let employeeData = [];

const setSelectedSkills = (selectedSkills) => {
  selectedSkillsArray = selectedSkills;
};

const resetSkillFilter = () => {
  searchSkillInput.value = "";
  searchSkillInput.dispatchEvent(new Event("input"));
  document
    .querySelectorAll(".selected-skill > p")
    .forEach((tagEl) => tagEl.remove());
  selectedSkillsArray = [];
  filterTable();
};

// <<<< Employee Table Events >>>>>>>>>>
const handleEmployeeTableClick = (e) => {
  if (e.target.id === "edit-action-btn") {
    console.log("Edit btn clicked", e.target.dataset);
  } else if (e.target.id === "delete-action-btn") {
    console.log("Delete btn is clicked");
  } else if (e.target.tagName === "TH" && e.target.dataset.column) {
    sortTable(e.target.dataset.column);
  } else {
    console.log(e.target.closest("tr").dataset);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchSkills((skills) => {
    if (skills && !isLoading()) skillsLoader.style.display = "none";
    renderSkills(skills);
  });

  fetchEmployees((employeeArr) => {
    if (employeeArr && !isLoading()) tableLoader.style.display = "none";
    employeeData = employeeArr;
    renderTable(employeeArr);
  });

  searchEmployeeInput.addEventListener("input", () => filterTable());
  departmentFilterInput.addEventListener("input", filterTable);
  roleFilterInput.addEventListener("input", filterTable);

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

  searchSkillInput.addEventListener("input", (e) => renderSkillDropdown(e));

  skillList.addEventListener("click", (e) =>
    renderSelectedSkills(e, setSelectedSkills)
  );

  clearFilterBtn.addEventListener("click", () => {
    filterContainer.classList.toggle("open-filter-options");
    searchEmployeeInput.value = "";
    departmentFilterInput.value = "";
    roleFilterInput.value = "";
    resetSkillFilter();
    filterTable();
  });

  addEmployeeBtn.addEventListener("click", () => {
    console.log("Add employee btn clicked");
  });

  selectedSkillsContainer.addEventListener("click", (e) =>
    removeSelectedSkills(e, setSelectedSkills)
  );

  employeeTable.addEventListener("click", handleEmployeeTableClick);

  // <<<<<< Keyboard shortcuts for Skill Search Input >>>>>>>>
  searchSkillInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      skillList.style.display = "none";
      renderSelectedSkills(event, setSelectedSkills);
      return;
    } else if (event.key === "Backspace" && event.target.value === "") {
      if (selectedSkillsArray.length !== 0) {
        removeSelectedSkills(event, setSelectedSkills);
      }
    } else {
      skillList.style.display = "block";
    }
  });
});

// <<<<<< Keyboard Shortcuts / Events for Document - START  >>>>>>>>>>>>>

document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== searchSkillInput) {
    e.preventDefault();
    searchEmployeeInput.focus();
  } else if (e.key === "Escape") {
    if (document.activeElement === searchEmployeeInput) {
      searchEmployeeInput.blur();
    } else if (document.activeElement === searchSkillInput) {
      searchSkillInput.blur();
    }
  } else if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
    if (e.key === "e" || e.key === "E") toggleTheme();
    else if (e.key === "f" || e.key === "F")
      filterContainer.classList.toggle("open-filter-options");
  }
});

// <<<<<< Keyboard Shortcuts / Events for Document - END  >>>>>>>>>>>>>
