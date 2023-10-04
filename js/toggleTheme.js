const toggleThemeBtn = document.querySelector(".toggle-mode");
const body = document.querySelector("body");

const toggleTheme = (e) => {
  if (toggleThemeBtn.textContent === "light_mode") {
    body.classList.remove("dark-theme");
    toggleThemeBtn.textContent = "mode_night";
    localStorage.setItem("theme", "light_mode");
  } else {
    body.classList.add("dark-theme");
    toggleThemeBtn.textContent = "light_mode";
    localStorage.setItem("theme", "mode_night");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    toggleTheme.textContent = currentTheme;
    toggleTheme();
  }
});

toggleThemeBtn.addEventListener("click", toggleTheme);
