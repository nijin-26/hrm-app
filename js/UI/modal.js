import { addEmployee, updateEmployee } from "../firebase/firebase.js";
import { allSkills, departments, roles } from "../main.js";

import {
  renderSkills,
  renderSelectedSkills,
  renderSkillDropdown,
  removeSelectedSkills,
} from "./skills.js";

import {
  modalContainer,
  modalContent,
  overlayContainer,
  body,
} from "../utils/elementSelectors.js";
import { validateForm } from "../utils/validation.js";
import { getFormattedDate } from "../utils/formatDate.js";
import { showToast } from "../utils/toast.js";

const openModal = () => {
  overlayContainer.classList.add("open");
  modalContainer.classList.add("open");
  body.style.overflow = "hidden";
};

const closeModal = () => {
  overlayContainer.classList.remove("open");
  modalContainer.classList.remove("open");
  body.style.overflow = "auto";
  modalContent.innerHTML = "";
};

function checkFileSize(input) {
  const maxFileSize = 2 * 1024 * 1024; // 2MB
  const fileSize = input.files[0]?.size;

  if (fileSize && fileSize > maxFileSize) return false;
  else return true;
}

const skillsContainerTemp = `
    <div class="skills-fitler-dropdown">
        <input
          class="skill-search-input"
          type="text"
          placeholder="Search skills to add"
        />
      <div class="dropdown-content">
        <ul class="skill-list">
          <div class="flex loader-container skills-loader">
            <span class="loader"></span>
          </div>
        </ul>
      </div>
      <div class="selected-skill flex">
        <!-- <span class="material-symbols-outlined"> page_control </span> -->
      </div>
    </div>
`;

const addEmpFormTemp = `
    <form class="add-employee-form">
    <div class="employee-form-image-container flex">
      <input type="file" class="add-employee-input-image" accept="image/*" />
      <button type="button" class="add-image-btn">+</button>
      <div class="image-round-container">
        <img
        src="./assets/images/placeholder-image.png"
        alt="placeholder image"
        />
      </div>
    </div>
    <div class="form-input-container">
      <div class="input-group flex justify-between">
        <div class="input-sub-group">
          <label for="fullName">Full Name</label>
          <input required
            class="emp-fullname"
            placeholder="Enter full name"
            type="text"
            id="fullName"
          />
        </div>
        <div class="input-sub-group">
          <label for="dateOfJoin">Date of Join</label>
          <input required class="emp-dateOfJoin" type="date" id="dateOfJoin" />
        </div>
      </div>
      <div class="input-group flex justify-between">
        <div class="input-sub-group">
          <label for="email">Email ID</label>
          <input required
            class="emp-email"
            placeholder="Enter email address"
            type="email"
            id="email"
          />
        </div>
        <div class="input-sub-group">
          <label for="mobileNumber">Mobile Number</label>
          <input required
            class="emp-mobileNumber"
            placeholder="Enter Mobile Number"
            type="text"
            id="mobileNumber"
          />
        </div>
      </div>
      <div class="input-group flex justify-between">
        <div class="input-sub-group">
          <label for="dateOfBirth">Date of Birth</label>
          <input required class="emp-dateOfBirth" type="date" id="dateOfBirth" />
        </div>
        <div class="input-sub-group">
          <label for="workLocation">Work Location</label>
          <select required
            class="emp-workLocation"
            name="workLocation"
            id="workLocation"
            autocomplete="off"
          >
            <option value="" selected disabled>
              Select work location
            </option>
            <option value="Trivandrum">Trivandrum</option>
            <option value="Kochi">Kochi</option>
            <option value="Calicut">Calicut</option>
          </select>
        </div>
      </div>
      <div class="input-group flex justify-between">
        <div class="input-sub-group">
          <label for="department">Department</label>
          <select required class="emp-department" name="department" id="department" autocomplete="off">
            <option value="" selected disabled>Select Department</option>
          </select>
        </div>
        <div class="input-sub-group">
          <label for="role">Role</label>
          <select required class="emp-role" name="role" id="role" autocomplete="off">
            <option value="" selected disabled>Select Role</option>
          </select>
        </div>
      </div>
      <div class="input-group flex form-skills-container">
      ${skillsContainerTemp}
      </div>
        <div class="flex loader-container add-employee-loader">
                    <span class="loader"></span>
         </div>
      <div class="input-group btns flex">
  
        <button
          type="button"
          class="btn btn-secondary add-emp-cancel-btn"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary add-emp-submit-btn">
          Submit
        </button>
      </div>
    </div>
  </form>
  `;

const renderAddEmployeeForm = () => {
  modalContent.innerHTML = addEmpFormTemp;

  const empAddForm = document.querySelector(".add-employee-form");
  const imageInput = empAddForm.querySelector(".add-employee-input-image");
  const empImageAddBtn = empAddForm.querySelector(".add-image-btn");
  const empImageContainer = empAddForm.querySelector(
    ".employee-form-image-container img"
  );
  const fullName = empAddForm.querySelector("input.emp-fullname");
  const dateOfJoin = empAddForm.querySelector("input.emp-dateOfJoin");
  const email = empAddForm.querySelector("input.emp-email");
  const mobileNumber = empAddForm.querySelector("input.emp-mobileNumber");
  const dateOfBirth = empAddForm.querySelector("input.emp-dateOfBirth");
  const workLocation = empAddForm.querySelector("select.emp-workLocation");
  const department = empAddForm.querySelector("select.emp-department");
  const role = empAddForm.querySelector("select.emp-role");

  const addEmpLoader = empAddForm.querySelector(".add-employee-loader");
  const cancelBtn = empAddForm.querySelector("button.add-emp-cancel-btn");

  // Skills
  const skillsContainer = empAddForm.querySelector(".form-skills-container");
  const skillsLoader = skillsContainer.querySelector(".skills-loader");
  const skillInput = skillsContainer.querySelector(".skill-search-input");
  const dropdownContainer = skillsContainer.querySelector(".dropdown-content");
  const skillListContainer = skillsContainer.querySelector(
    ".dropdown-content .skill-list"
  );
  const selectedSkillTagContainer =
    skillsContainer.querySelector(".selected-skill");

  skillsLoader.style.display = "none";

  renderSkills(allSkills, skillListContainer);

  skillInput.addEventListener("focus", () => {
    dropdownContainer.style.display = "block";
    skillInput.dispatchEvent(new Event("input"));
  });

  skillInput.addEventListener("blur", () => {
    setTimeout(() => {
      dropdownContainer.style.display = "none";
    }, 100);
  });

  let selectedSkillsArr = [];

  skillInput.addEventListener("input", (e) => {
    renderSkillDropdown(e, skillListContainer, selectedSkillsArr);
  });

  const setSelectedSkills = (selSkills) => {
    selectedSkillsArr = selSkills;
  };

  dropdownContainer.addEventListener("click", (e) => {
    renderSelectedSkills(
      e,
      setSelectedSkills,
      selectedSkillsArr,
      selectedSkillTagContainer,
      skillInput
    );
  });

  selectedSkillTagContainer.addEventListener("click", (e) => {
    removeSelectedSkills(
      e,
      setSelectedSkills,
      selectedSkillsArr,
      selectedSkillTagContainer
    );
  });

  cancelBtn.addEventListener("click", closeModal);
  addEmpLoader.style.display = "none";
  imageInput.value = "";

  const handleImageInput = () => imageInput.click();
  empImageAddBtn.addEventListener("click", handleImageInput);

  const resetSelectedImage = () => {
    imageInput.value = "";
    empImageContainer.src = "./assets/images/placeholder-image.png";
    empImageAddBtn.innerHTML = "+";
    empImageAddBtn.removeEventListener("click", resetSelectedImage);
    setTimeout(() => {
      empImageAddBtn.addEventListener("click", handleImageInput);
    }, 100);
  };

  imageInput.addEventListener("input", (e) => {
    if (!checkFileSize(e.target)) {
      e.target.value = "";
      showToast("warning", "The selected  image size exceeds 2MB.");
      return;
    }
    empImageContainer.src = URL.createObjectURL(imageInput.files[0]);
    if (e.target.files[0]) {
      empImageAddBtn.innerHTML = "x";
      empImageAddBtn.removeEventListener("click", handleImageInput);
      empImageAddBtn.addEventListener("click", resetSelectedImage);
    }
  });

  for (const id in departments) {
    const option = document.createElement("option");
    option.innerHTML = departments[id];
    option.value = id;
    department.append(option);
  }

  for (const id in roles) {
    const option = document.createElement("option");
    option.innerHTML = roles[id];
    option.value = id;
    role.append(option);
  }

  empAddForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const empData = {
      fullName: fullName?.value,
      dateOfBirth: dateOfBirth?.valueAsDate.getTime(),
      dateOfJoin: dateOfJoin?.valueAsDate.getTime(),
      email: email?.value,
      mobile: mobileNumber?.value,
      workLocation: workLocation?.value,
      imageURL: imageInput?.files[0] ? imageInput.files[0] : "",
      department: department?.value,
      role: role?.value,
      skill: selectedSkillsArr.map((skill) => skill.id),
    };
    const isValid = validateForm(empData);
    if (isValid) {
      addEmployee(empData, empAddForm);
    }
  });
};

const editEmployee = (selectedEmp) => {
  modalContent.innerHTML = addEmpFormTemp;
  openModal();

  const empAddForm = document.querySelector(".add-employee-form");
  const imageInput = empAddForm.querySelector(".add-employee-input-image");
  const empImageAddBtn = empAddForm.querySelector(".add-image-btn");
  const empImageContainer = empAddForm.querySelector(
    ".employee-form-image-container img"
  );
  const fullName = empAddForm.querySelector("input.emp-fullname");
  const dateOfJoin = empAddForm.querySelector("input.emp-dateOfJoin");
  const email = empAddForm.querySelector("input.emp-email");
  const mobileNumber = empAddForm.querySelector("input.emp-mobileNumber");
  const dateOfBirth = empAddForm.querySelector("input.emp-dateOfBirth");
  const workLocation = empAddForm.querySelector("select.emp-workLocation");
  const department = empAddForm.querySelector("select.emp-department");
  const role = empAddForm.querySelector("select.emp-role");
  // TODO: Skills containers

  const addEmpLoader = empAddForm.querySelector(".add-employee-loader");
  const cancelBtn = empAddForm.querySelector("button.add-emp-cancel-btn");

  // Skills
  const skillsContainer = empAddForm.querySelector(".form-skills-container");
  const skillsLoader = skillsContainer.querySelector(".skills-loader");
  const skillInput = skillsContainer.querySelector(".skill-search-input");
  const dropdownContainer = skillsContainer.querySelector(".dropdown-content");
  const skillListContainer = skillsContainer.querySelector(
    ".dropdown-content .skill-list"
  );
  const selectedSkillTagContainer =
    skillsContainer.querySelector(".selected-skill");

  skillsLoader.style.display = "none";

  renderSkills(allSkills, skillListContainer);

  skillInput.addEventListener("focus", () => {
    dropdownContainer.style.display = "block";
    skillInput.dispatchEvent(new Event("input"));
  });

  skillInput.addEventListener("blur", () => {
    setTimeout(() => {
      dropdownContainer.style.display = "none";
    }, 100);
  });

  let selectedSkillsArr = [];

  selectedSkillsArr = selectedEmp.skill?.map((sk) => {
    const temp = `<p  class="selected-skill-tag flex">
      <span>${allSkills[sk].name}</span>
      <span class="material-symbols-outlined remove-selected-skill-tag" data-skill-id=${sk}>
          do_not_disturb_on
      </span>
    </p>`;
    selectedSkillTagContainer.innerHTML += temp;

    return {
      id: sk,
      name: allSkills[sk].name,
    };
  });

  skillInput.addEventListener("input", (e) => {
    renderSkillDropdown(e, skillListContainer, selectedSkillsArr);
  });

  const setSelectedSkills = (selSkills) => {
    selectedSkillsArr = selSkills;
  };

  dropdownContainer.addEventListener("click", (e) => {
    renderSelectedSkills(
      e,
      setSelectedSkills,
      selectedSkillsArr,
      selectedSkillTagContainer,
      skillInput
    );
  });

  selectedSkillTagContainer.addEventListener("click", (e) => {
    removeSelectedSkills(
      e,
      setSelectedSkills,
      selectedSkillsArr,
      selectedSkillTagContainer
    );
  });

  cancelBtn.addEventListener("click", closeModal);
  addEmpLoader.style.display = "none";
  imageInput.value = "";
  empImageContainer.src = selectedEmp.imageURL
    ? selectedEmp.imageURL
    : "./assets/images/placeholder-image.png";

  const handleImageInput = () => imageInput.click();
  empImageAddBtn.addEventListener("click", handleImageInput);

  const resetSelectedImage = () => {
    imageInput.value = "";
    empImageContainer.src = "./assets/images/placeholder-image.png";
    empImageAddBtn.innerHTML = "+";
    empImageAddBtn.removeEventListener("click", resetSelectedImage);
    setTimeout(() => {
      empImageAddBtn.addEventListener("click", handleImageInput);
    }, 100);
  };

  imageInput.addEventListener("input", (e) => {
    if (checkFileSize(e.target))
      empImageContainer.src = URL.createObjectURL(imageInput.files[0]);
    if (e.target.files[0]) {
      empImageAddBtn.innerHTML = "x";
      empImageAddBtn.removeEventListener("click", handleImageInput);
      empImageAddBtn.addEventListener("click", resetSelectedImage);
    }
  });

  for (const id in departments) {
    const option = document.createElement("option");
    option.innerHTML = departments[id];
    option.value = id;
    department.append(option);
  }

  for (const id in roles) {
    const option = document.createElement("option");
    option.innerHTML = roles[id];
    option.value = id;
    role.append(option);
  }

  fullName.value = selectedEmp.fullName;
  dateOfJoin.value = getFormattedDate(selectedEmp.dateOfJoin)[1];
  email.value = selectedEmp.email;
  mobileNumber.value = selectedEmp.mobile;
  dateOfBirth.value = getFormattedDate(selectedEmp.dateOfBirth)[1];
  workLocation.value = selectedEmp.workLocation;
  department.value = selectedEmp.department;
  role.value = selectedEmp.role;

  empAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let selectedImage = "";
    if (imageInput.files[0]) selectedImage = imageInput.files[0];
    else if (selectedEmp.imageURL !== "") selectedImage = selectedEmp.imageURL;

    const empData = {
      fullName: fullName?.value,
      dateOfBirth: dateOfBirth?.valueAsDate.getTime(),
      dateOfJoin: dateOfJoin?.valueAsDate.getTime(),
      email: email?.value,
      mobile: mobileNumber?.value,
      workLocation: workLocation?.value,
      imageURL: selectedImage,
      department: department?.value,
      role: role?.value,
      skill: selectedSkillsArr.map((skill) => skill.id),
    };

    const isValid = validateForm(empData);
    if (isValid) {
      updateEmployee(selectedEmp.id, empData, empAddForm);
    }
  });
};

export { openModal, closeModal, renderAddEmployeeForm, editEmployee };
