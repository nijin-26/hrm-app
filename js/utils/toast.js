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
  toastContainer.innerHTML += `  
   <div class="${type} active">
        <span class="material-symbols-outlined toast-icon">${
          icons[type]
        } </span>
        <p>${msg ? msg : defaultMsgs[type]}</p>
    </div>`;

  // toastContainer.querySelector("div").classList.add("active");

  timeOutId_1 = setTimeout(() => {
    toastContainer.querySelector(`.${type}`).classList.remove("active");
  }, 3000);

  timeOutId_2 = setTimeout(() => {
    toastContainer.querySelector(`.${type}`).remove();
    clearTimeout(timeOutId_1);
  }, 3200);
};

window.addEventListener("unload", () => {
  clearTimeout(timeOutId_1);
  clearTimeout(timeOutId_2);
});

// showToast("error");
// showToast("success");
