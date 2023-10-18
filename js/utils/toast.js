import { toastContainer } from "./elementSelectors.js";

const icons = {
  success: "new_releases",
  error: "report",
  warning: "warning",
};

const defaultMsgs = {
  success: "Successful",
  error: "Error Occured. Try Again.",
  warning: "Warning. Please check again.",
};

let timeOutId_1;
let timeOutId_2;

export const showToast = (type, msg, payloadObj) => {
  const toast = document.createElement("div");
  toast.innerHTML = `
    <span class="material-symbols-outlined toast-icon">${icons[type]}</span>
    <p>${msg ? msg : defaultMsgs[type]}</p>
  `;
  toastContainer.appendChild(toast);
  console.log(payloadObj && payloadObj);

  timeOutId_1 = setTimeout(() => toast.classList.add(type, "active"), 300);

  timeOutId_2 = setTimeout(() => {
    toast.classList.remove("active");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
};

window.addEventListener("unload", () => {
  clearTimeout(timeOutId_1);
  clearTimeout(timeOutId_2);
});
