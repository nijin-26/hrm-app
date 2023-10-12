import {
  fetchDeparments,
  fetchEmployees,
  fetchRoles,
  fetchSkills,
  isLoading,
} from "./firebase/firebase.js";
import { toggleTheme } from "./toggleTheme.js";
import { filterTable } from "./filter.js";
import { sortTable } from "./sort.js";

import {
  renderTable,
  renderSkills,
  removeSelectedSkills,
  renderSelectedSkills,
  renderSkillDropdown,
  viewEmployee,
  closeModal,
  deleteBtnHandler,
  openModal,
  renderAddEmployeeForm,
  editEmployee,
} from "./ui.js";

import {
  searchEmployeeInput,
  employeeTable,
  departmentFilterInput,
  roleFilterInput,
  filterContainer,
  searchSkillInput,
  dropdownContent,
  selectedSkillsContainer,
  tableLoader,
  skillsLoader,
  overlayContainer,
  openFilterBtn,
  clearFilterBtn,
  addEmployeeBtn,
  modalCloseBtn,
} from "./utils/elementSelectors.js";

export let selectedSkillsArray = [];
export let employeeData = [];
export let departments;
export let roles;

const setSelectedSkills = (selectedSkills) => {
  selectedSkillsArray = selectedSkills;
};

const isModalOpen = () => {
  return overlayContainer.classList.contains("open") ? true : false;
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
  if (e.target.classList.contains("edit-action-btn")) {
    const empId = e.target.dataset.employeeId;
    const selectedEmp = employeeData.find((emp) => emp.id === empId);
    editEmployee(selectedEmp);
  } else if (e.target.classList.contains("delete-action-btn")) {
    deleteBtnHandler(e.target.dataset.employeeId);
  } else if (e.target.tagName === "TH") {
    if (e.target.dataset.column) sortTable(e.target.dataset.column);
    else return;
  } else {
    viewEmployee(e.target.closest("tr").dataset.employeeId);
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

  fetchDeparments((depts) => (departments = depts));
  fetchRoles((roleData) => (roles = roleData));

  searchEmployeeInput.addEventListener("input", () => filterTable());
  departmentFilterInput.addEventListener("input", filterTable);
  roleFilterInput.addEventListener("input", filterTable);

  openFilterBtn.addEventListener("click", () =>
    filterContainer.classList.toggle("open-filter-options")
  );

  searchSkillInput.addEventListener("focus", () => {
    dropdownContent.style.display = "block";
    searchSkillInput.dispatchEvent(new Event("input"));
  });

  searchSkillInput.addEventListener("blur", () => {
    setTimeout(() => {
      dropdownContent.style.display = "none";
    }, 100);
  });

  searchSkillInput.addEventListener("input", (e) => renderSkillDropdown(e));

  dropdownContent.addEventListener("click", (e) =>
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
    openModal();
    renderAddEmployeeForm();
  });

  selectedSkillsContainer.addEventListener("click", (e) =>
    removeSelectedSkills(e, setSelectedSkills)
  );

  employeeTable.addEventListener("click", handleEmployeeTableClick);

  overlayContainer.addEventListener("click", closeModal);
  modalCloseBtn.addEventListener("click", closeModal);

  // <<<<<< Keyboard shortcuts for Skill Search Input >>>>>>>>
  searchSkillInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      dropdownContent.style.display = "none";
      renderSelectedSkills(event, setSelectedSkills);
      return;
    } else if (event.key === "Backspace" && event.target.value === "") {
      if (selectedSkillsArray.length !== 0) {
        removeSelectedSkills(event, setSelectedSkills);
      }
    } else {
      dropdownContent.style.display = "block";
    }
  });
});

// <<<<<< Keyboard Shortcuts / Events for Document - START  >>>>>>>>>>>>>

document.addEventListener("keydown", (e) => {
  if (!isModalOpen()) {
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
      if (e.key === "l" || e.key === "L") toggleTheme();
      else if (e.key === "f" || e.key === "F")
        filterContainer.classList.toggle("open-filter-options");
    }
  }
});

// <<<<<< Keyboard Shortcuts / Events for Document - END  >>>>>>>>>>>>>
