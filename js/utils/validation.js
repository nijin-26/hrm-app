import { showToast } from "./toast.js";

export const validateForm = (data, formEl) => {
  const validationErrors = {};

  if (!isValidFullName(data.fullName)) {
    validationErrors.fullName = "Full name is invalid";
    formEl["fullName"].classList.add("error");
    formEl.querySelector(".fullName-error").style.visibility = "visible";
  }

  if (!isValidEmail(data.email)) {
    validationErrors.email = "Email address is invalid";
    formEl["email"].classList.add("error");
    formEl.querySelector(".email-error").style.visibility = "visible";
  }

  if (!isValidMobile(data.mobile)) {
    validationErrors.mobileNumber =
      "Invalid mobile number. It should have 10 digits.";
    formEl["mobileNumber"].classList.add("error");
    formEl.querySelector(".mobile-error").style.visibility = "visible";
  }

  if (Object.keys(validationErrors).length === 0) return true;

  if (Object.keys(validationErrors).length > 0) {
    const errorMsgs = Object.values(validationErrors);
    errorMsgs.forEach((errMsg) => {
      showToast("error", errMsg);
    });
  }
};

function isValidFullName(fullName) {
  return /^[A-Za-z\s]+$/.test(fullName);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile(mobileNumber) {
  return /^[0-9]{10}$/.test(mobileNumber);
}
