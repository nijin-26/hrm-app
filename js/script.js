import { filterTable } from "./fetchData.js";

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

clearFilterBtn.addEventListener("click", () => {
  filterContainer.classList.toggle("open-filter-options");
  document.querySelector(".department-filter").value = "";
  document.querySelector(".role-filter").value = "";
  filterTable();
});

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

searchSkillInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const skills = skillList.querySelectorAll("li");

  skills.forEach((skill) => {
    const skillName = skill.dataset.skill.toLowerCase();
    if (skillName.includes(searchValue)) {
      skill.style.display = "block";
    } else {
      skill.style.display = "none";
    }
  });
});

skillList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    let skillID = e.target.dataset.skill;
    const skillName = e.target.textContent;

    const isSkillSelected = selectedSkillsArray.some(
      (skill) => skillID in skill
    );
    if (!isSkillSelected) {
      selectedSkillsArray.push({ id: skillID, name: skillName });
      renderSelectedSkills();
    }
  }
});

const renderSelectedSkills = () => {
  // selectedSkillsArray.forEach((skill) => {
  //   const p = document.createElement("p");
  //   p.textContent = skill.name;
  //   document.querySelector(".skills-fitler-dropdown").append(p);
  // });
  // console.log("render selected skills", selectedSkillsArray);
};
