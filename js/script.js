const filterContainer = document.querySelector(".filter-container");
const openFilterBtn = document.querySelector(".enable-filter-btn");

openFilterBtn.addEventListener("click", () => {
  filterContainer.classList.toggle("open-filter-options");
});

const searchSkillInput = document.querySelector(".skill-search-input");
const skillList = document.querySelector(".dropdown-content");

const selectedSkillsArray = [];

// Show the dropdown when input is focused
searchSkillInput.addEventListener("focus", () => {
  skillList.style.display = "block";
});

// Hide the dropdown when input is blurred
searchSkillInput.addEventListener("blur", () => {
  setTimeout(() => {
    skillList.style.display = "none";
  }, 200);
});
