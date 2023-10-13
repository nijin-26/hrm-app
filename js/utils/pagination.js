import { employeeData } from "../main.js";

const itemsPerPage = 10;
let currentPage = 1;

export const showEmployees = (page) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let currentSetOfEmps;

  for (let i = startIndex; i < endIndex && i < employeeData.length; i++) {
    currentSetOfEmps.push(employeeData[i]);
  }
};

function updatePageNumbers() {
  const maxPage = Math.ceil(employeeData.length / itemsPerPage);
  const pageNumbers = document.getElementById("page-numbers");
  pageNumbers.innerHTML = "";

  for (let i = 1; i <= maxPage; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.textContent = i;
    pageNumber.onclick = () => goToPage(i);
    pageNumbers.appendChild(pageNumber);
  }
}

function goToPage(page) {
  if (page >= 1 && page <= Math.ceil(employeeData.length / itemsPerPage)) {
    currentPage = page;
    showEmployees(currentPage);
    updatePageNumbers();
  }
}

function previousPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function nextPage() {
  if (currentPage < Math.ceil(employeeData.length / itemsPerPage)) {
    goToPage(currentPage + 1);
  }
}
