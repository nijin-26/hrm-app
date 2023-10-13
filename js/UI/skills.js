import { filterTable } from "../filter.js";
import { selectedSkillsArray } from "../main.js";

import {
  searchSkillInput,
  skillList,
  selectedSkillsContainer,
} from "../utils/elementSelectors.js";

const createSkillListItem = (skillID, name) => {
  const li = document.createElement("li");
  li.textContent = name;
  li.dataset.skillId = skillID;
  return li;
};

const renderSkills = (skills, skillListElement) => {
  for (const skillID in skills) {
    const li = createSkillListItem(skillID, skills[skillID].name);
    if (skillListElement) skillListElement.append(li);
    else skillList.append(li);
  }
};

const renderSkillDropdown = (e, dropdownContainer, selSkills) => {
  const searchValue = e.target.value.toLowerCase();

  let skills = dropdownContainer
    ? dropdownContainer.querySelectorAll("li")
    : skillList.querySelectorAll("li");

  skills.forEach((skill) => {
    let isSkillSelected = selSkills
      ? selSkills.some((selSkill) => selSkill.id === skill.dataset.skillId)
      : selectedSkillsArray.some((s) => s.id === skill.dataset.skillId);

    if (searchValue === "") {
      skill.style.display = isSkillSelected ? "none" : "block";
    } else if (
      !isSkillSelected &&
      skill.textContent.toLowerCase().includes(searchValue)
    ) {
      skill.style.display = "block";
    } else {
      skill.style.display = "none";
    }
  });
};

const renderSelectedSkills = (
  e,
  setSelectedSkills,
  selectedSkills,
  skillsContainer = selectedSkillsContainer,
  skillsearchinput = searchSkillInput
) => {
  let target;
  const skills = skillList.querySelectorAll("li");

  if (e.type === "keydown") {
    Array.from(skills).some((skillEl) => {
      if (skillEl.style.display === "block") {
        target = skillEl;
        return true;
      }
      return false;
    });
  } else if (e.target.tagName === "LI") {
    target = e.target;
  } else {
    return;
  }

  let skillID = target.dataset.skillId;
  const skillName = target.textContent;

  const arrayToRender = selectedSkills ? selectedSkills : selectedSkillsArray;

  if (!arrayToRender.some((skill) => skill.id === skillID)) {
    skillsearchinput.value = "";
    arrayToRender.push({ id: skillID, name: skillName });
    setSelectedSkills(arrayToRender);
    const temp = `<p  class="selected-skill-tag flex">
      <span>${skillName}</span>
      <span class="material-symbols-outlined remove-selected-skill-tag" data-skill-id=${skillID}>
          do_not_disturb_on
      </span>
    </p>`;
    skillsContainer.innerHTML += temp; // Render to the specified or default container
    filterTable();
  }
};

const removeSelectedSkills = (
  e,
  setSelectedSkills,
  selectedSkills = selectedSkillsArray,
  skillsContainer
) => {
  let targetSkillId;

  if (e.type === "keydown") {
    targetSkillId = selectedSkills.at(-1).id;
  } else if (e.target.classList.contains("remove-selected-skill-tag")) {
    targetSkillId = e.target.dataset.skillId;
  } else {
    return;
  }

  let selectedSkillTag;
  if (skillsContainer)
    selectedSkillTag = skillsContainer.querySelector(
      `[data-skill-id="${targetSkillId}"]`
    );
  else
    selectedSkillTag = document.querySelector(
      `.selected-skill [data-skill-id="${targetSkillId}"]`
    );

  if (selectedSkillTag) {
    selectedSkillTag.parentElement.remove();
  }

  const updatedSkillList = selectedSkills.filter(
    (skill) => skill.id !== targetSkillId
  );

  setSelectedSkills(updatedSkillList);

  filterTable();

  const skillListItem = document.querySelector(
    `.skill-list > [data-skill-id="${targetSkillId}"]`
  );

  if (skillListItem) {
    skillListItem.style.display = "block";
  }
};

export {
  renderSkills,
  renderSkillDropdown,
  renderSelectedSkills,
  removeSelectedSkills,
};
