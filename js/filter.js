import { renderTable } from "./ui.js";
import { employeeData, selectedSkillsArray } from "./main.js";

const searchEmployeeInput = document.querySelector(".search-employee-input");
const departmentFilterInput = document.querySelector(".department-filter");
const roleFilterInput = document.querySelector(".role-filter");

let searchedEmployeeList = [];

export const filterByEmployeeName = () => {
  const searchedEmployeeName = searchEmployeeInput.value.toLowerCase();

  searchedEmployeeList = employeeData.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchedEmployeeName)
  );

  filterTable();
};

export const filterTable = () => {
  const selectedDepartment = departmentFilterInput.value;
  const selectedRole = roleFilterInput.value;

  let employeeList = employeeData;
  if (searchedEmployeeList.length !== 0) employeeList = searchedEmployeeList;

  const filteredEmployees = employeeList.filter((employee) => {
    if (selectedDepartment !== "" && selectedRole !== "")
      return (
        employee.department[0] === selectedDepartment &&
        employee.role[0] === selectedRole
      );
    else if (
      selectedDepartment !== "" &&
      selectedRole !== "" &&
      selectedSkillsArray.length !== 0
    ) {
      const filteredBySkill = selectedSkillsArray.every((selectedSkill) => {
        if (selectedSkill.id in employee.skill) return employee;
      });
      return (
        employee.department[0] === selectedDepartment &&
        employee.role[0] === selectedRole &&
        filteredBySkill
      );
    } else if (selectedDepartment !== "" && selectedRole === "")
      return employee.department[0] === selectedDepartment;
    else if (selectedRole !== "" && selectedDepartment === "")
      return employee.role[0] === selectedRole;
    else if (selectedSkillsArray.length !== 0) {
      const filteredBySkill = selectedSkillsArray.every((selectedSkill) => {
        if (selectedSkill.id in employee.skill) return employee;
      });
      return filteredBySkill;
    } else return employee;
  });

  renderTable(filteredEmployees);
};
