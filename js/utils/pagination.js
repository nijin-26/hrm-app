const employees = [
  /* Your employee data here */
];
const itemsPerPage = 10;
let currentPage = 1;

function showEmployees(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const employeeTable = document.getElementById("employee-table");
  employeeTable.innerHTML = ""; // Clear previous data

  for (let i = startIndex; i < endIndex && i < employees.length; i++) {
    const employee = employees[i];
    const row = document.createElement("tr");
    row.innerHTML = `<td>${employee.name}</td><td>${employee.position}</td>`;
    employeeTable.appendChild(row);
  }
}

function updatePageNumbers() {
  const maxPage = Math.ceil(employees.length / itemsPerPage);
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
  if (page >= 1 && page <= Math.ceil(employees.length / itemsPerPage)) {
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
  if (currentPage < Math.ceil(employees.length / itemsPerPage)) {
    goToPage(currentPage + 1);
  }
}

showEmployees(currentPage);
updatePageNumbers();
