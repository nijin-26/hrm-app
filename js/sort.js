import { filteredEmployees } from "./filter.js";
import { employeeData } from "./main.js";
import { renderTable } from "./ui.js";

export let currentSortColumn = "";
let currentSortFlag = 1;

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
};
