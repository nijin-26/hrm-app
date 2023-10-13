import { renderTable } from "../ui.js";
const nxtBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");

const itemsPerPage = 5;
let currentPage = 1;

let employeeData = [];

const showEmployees = (page) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const maxPage = Math.ceil(employeeData.length / itemsPerPage);

  let currentEmpsArr = [];

  for (let i = startIndex; i < endIndex && i < employeeData.length; i++) {
    currentEmpsArr.push(employeeData[i]);
  }
  prevBtn.disabled = false;
  nxtBtn.disabled = false;
  prevBtn.classList.remove("disabled");
  nxtBtn.classList.remove("disabled");

  console.log(endIndex, itemsPerPage);

  if (page === 1) {
    prevBtn.disabled = true;
    prevBtn.classList.add("disabled");
  } else if (page === maxPage) {
    nxtBtn.disabled = true;
    nxtBtn.classList.add("disabled");
  }

  renderTable(currentEmpsArr);
};

function updatePageNumbers(empls) {
  employeeData = empls;
  const maxPage = Math.ceil(employeeData.length / itemsPerPage);
  const pageNumbers = document.getElementById("page-numbers");
  pageNumbers.innerHTML = "";

  for (let i = 1; i <= maxPage; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.textContent = i;
    pageNumber.addEventListener("click", (e) => goToPage(i));
    pageNumbers.appendChild(pageNumber);
  }

  pageNumbers.firstElementChild.classList.add("active");
}

const setActivePage = (page) => {
  document.querySelectorAll("#page-numbers button").forEach((el) => {
    if (el.textContent === String(page)) el.classList.add("active");
    else el.classList.remove("active");
  });
};

function goToPage(page) {
  if (page >= 1 && page <= Math.ceil(employeeData.length / itemsPerPage)) {
    currentPage = page;
    setActivePage(page);
    showEmployees(currentPage, employeeData);
  }
}

function previousPage() {
  if (currentPage > 1) {
    updatePageNumbers(employeeData);
    goToPage(currentPage - 1);
  }
}

function nextPage() {
  if (currentPage < Math.ceil(employeeData.length / itemsPerPage)) {
    updatePageNumbers(employeeData);
    goToPage(currentPage + 1);
  }
}

export const displayEmployees = (page = 1, emplsData) => {
  updatePageNumbers(emplsData);
  showEmployees(page);
};

nxtBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", previousPage);
