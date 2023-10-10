import { filteredEmployees } from "./filter.js";
import { employeeData } from "./main.js";
import { renderTable } from "./ui.js";

const headers = document.querySelectorAll(".employee-list-table th");

export let currentSortColumn = "";
let currentSortFlag = 1;

function toggleSortIndicator(column) {
  headers.forEach((header) => {
    const indicator = header.querySelector(".sort-indicator");
    if (indicator) {
      if (header.dataset.column === column) {
        indicator.innerHTML =
          currentSortFlag === 1 ? "arrow_drop_down" : "arrow_drop_up";
      } else {
        indicator.innerHTML = "";
      }
    }
  });
}

export const sortTable = (column) => {
  currentSortColumn = column;

  const sortedEmployeeData =
    filteredEmployees.length === 0 ? employeeData : filteredEmployees;

  sortedEmployeeData.sort((a, b) => {
    if (a[column] < b[column]) return -1 * currentSortFlag;
    if (a[column] > b[column]) return 1 * currentSortFlag;
    return 0;
  });
  currentSortFlag = currentSortFlag * -1;
  renderTable(sortedEmployeeData);
  toggleSortIndicator(column);
};
