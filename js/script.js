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
  resetSkillFilter();
  filterTable();
});

const resetSkillFilter = () => {
  searchSkillInput.value = "";
  searchSkillInput.dispatchEvent(new Event("input"));
  document
    .querySelectorAll(".selected-skill > p")
    .forEach((tagEl) => tagEl.remove());
  selectedSkillsArray = [];
  filterTable();
};

addEmployeeBtn.addEventListener("click", () => {
  console.log("Add employee btn clicked");
});

export let selectedSkillsArray = [];

searchSkillInput.addEventListener("focus", () => {
  skillList.style.display = "block";
  searchSkillInput.dispatchEvent(new Event("input"));
});

searchSkillInput.addEventListener("blur", () => {
  setTimeout(() => {
    skillList.style.display = "none";
  }, 50);
});

searchSkillInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const skills = skillList.querySelectorAll("li");

  skills.forEach((skill) => {
    const isSkillSelected = selectedSkillsArray.some(
      (selSkill) => selSkill.id === skill.dataset.skillId
    );

    if (searchValue === "") {
      if (!isSkillSelected) {
        skill.style.display = "block";
      } else {
        skill.style.display = "none";
      }
    } else if (
      !isSkillSelected &&
      skill.textContent.toLowerCase().includes(searchValue)
    ) {
      skill.style.display = "block";
    } else {
      skill.style.display = "none";
    }
  });
});

skillList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    let skillID = e.target.dataset.skillId;
    const skillName = e.target.textContent;

    if (!selectedSkillsArray.some((skill) => skill.id === skillID)) {
      searchSkillInput.value = "";
      selectedSkillsArray.push({ id: skillID, name: skillName });
      const temp = `<p  class="selected-skill-tag flex"> 
      <span>${skillName}</span> 
      <span class="material-symbols-outlined remove-selected-skill-tag" data-skill-id=${skillID}>
          do_not_disturb_on
      </span>
      </p>`;
      document.querySelector(".selected-skill").innerHTML += temp;
      filterTable();
    }
  }
});

document.querySelector(".selected-skill").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-selected-skill-tag")) {
    console.log("remove el is called");
    const targetSkillId = e.target.dataset.skillId;
    e.target.parentElement.remove();
    selectedSkillsArray = selectedSkillsArray.filter(
      (skill) => skill.id !== targetSkillId
    );
    filterTable();
    document.querySelector(
      `.skill-list > [data-skill="${targetSkillId}"]`
    ).style.display = "block";
  }
});
