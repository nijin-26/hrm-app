import { renderTable } from "../UI/employeeTable.js";

const nxtBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const itemsPerPage = 5;

let currentPage = 1;
let employeeData = [];

const showEmployees = (page) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const maxPage = Math.ceil(employeeData.length / itemsPerPage);

  const currentEmpsArr = employeeData.slice(startIndex, endIndex);

  prevBtn.disabled = page === 1;
  nxtBtn.disabled = page === maxPage;

  renderTable(currentEmpsArr);

  if (currentEmpsArr.length <= itemsPerPage && maxPage <= 1) {
    hidePagination();
  } else {
    showPagination();
  }
};

// Function to update page numbers
const updatePageNumbers = () => {
  const maxPage = Math.ceil(employeeData.length / itemsPerPage);
  const pageNumbers = document.getElementById("page-numbers");
  pageNumbers.innerHTML = "";

  for (let i = 1; i <= maxPage; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.textContent = i;
    pageNumber.addEventListener("click", () => goToPage(i));
    pageNumbers.appendChild(pageNumber);
  }

  setActivePage(currentPage);
};

const setActivePage = (page) => {
  const buttons = document.querySelectorAll("#page-numbers button");
  buttons.forEach((button, index) => {
    button.classList.toggle("active", index + 1 === page);
  });
};

const goToPage = (page) => {
  if (page >= 1 && page <= Math.ceil(employeeData.length / itemsPerPage)) {
    currentPage = page;
    setActivePage(page);
    showEmployees(currentPage);
  }
};

const previousPage = () => {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage < Math.ceil(employeeData.length / itemsPerPage)) {
    goToPage(currentPage + 1);
  }
};

const hidePagination = () => {
  const pageNumbers = document.getElementById("page-numbers");
  pageNumbers.style.display = "none";
  prevBtn.style.display = "none";
  nxtBtn.style.display = "none";
};

const showPagination = () => {
  const pageNumbers = document.getElementById("page-numbers");
  pageNumbers.style.display = "flex";
  prevBtn.style.display = "block";
  nxtBtn.style.display = "block";
};

nxtBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", previousPage);

export const displayEmployees = (page = 1, emplsData) => {
  if (emplsData.length === 0) return renderTable([]);
  employeeData = emplsData;
  updatePageNumbers();
  goToPage(page);
};
