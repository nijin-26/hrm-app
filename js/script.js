const filterContainer = document.querySelector(".filter-container");
const skillList = document.querySelector(".dropdown-content");

// Buttons
const openFilterBtn = document.querySelector(".enable-filter-btn");
const clearFilterBtn = document.querySelector(".clear-filter-btn");
const addEmployeeBtn = document.querySelector(".add-employee-btn");

// Input
const searchSkillInput = document.querySelector(".skill-search-input");

openFilterBtn.addEventListener("click", () =>
  filterContainer.classList.toggle("open-filter-options")
);

clearFilterBtn.addEventListener("click", () =>
  filterContainer.classList.toggle("open-filter-options")
);

addEmployeeBtn.addEventListener("click", () => {
  console.log("Add employee btn clicked");
});

const selectedSkillsArray = [];

searchSkillInput.addEventListener(
  "focus",
  () => (skillList.style.display = "block")
);

searchSkillInput.addEventListener("blur", () => {
  setTimeout(() => {
    skillList.style.display = "none";
  }, 200);
});
