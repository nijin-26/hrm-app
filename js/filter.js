import { renderTable } from "./ui.js";
import { employeeData, selectedSkillsArray } from "./main.js";
import { currentSortColumn, sortTable } from "./sort.js";

import {
  searchEmployeeInput,
  departmentFilterInput,
  roleFilterInput,
} from "./utils/elementSelectors.js";

export let filteredEmployees = [];

export const filterTable = () => {
  const searchEmployeeName = searchEmployeeInput.value.toLowerCase();
  const selectedDepartment = departmentFilterInput.value;
  const selectedRole = roleFilterInput.value;

  filteredEmployees = employeeData;

  if (searchEmployeeName !== "") {
    filteredEmployees = filteredEmployees.filter((employee) =>
      employee.fullName.toLowerCase().includes(searchEmployeeName)
    );
  }

  if (selectedDepartment !== "") {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.department === selectedDepartment
    );
  }

  if (selectedRole !== "") {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.role === selectedRole
    );
  }

  if (selectedSkillsArray.length > 0) {
    filteredEmployees = filteredEmployees.filter((employee) => {
      return selectedSkillsArray.every((selectedSkill) =>
        employee.skill?.includes(selectedSkill.id)
      );
    });
  }

  if (currentSortColumn) sortTable(currentSortColumn);
  else renderTable(filteredEmployees);
};
