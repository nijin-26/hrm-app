import { toggleThemeBtn, body } from "./utils/elementSelectors.js";

const setTheme = (theme) => {
  body.classList.toggle("dark-theme", theme === "mode_night");
  toggleThemeBtn.textContent =
    theme === "mode_night" ? "light_mode" : "mode_night";
  localStorage.setItem("theme", theme);
};

document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme") || "light_mode";
  setTheme(currentTheme);
});

export const toggleTheme = () => {
  const currentTheme = body.classList.contains("dark-theme")
    ? "light_mode"
    : "mode_night";
  setTheme(currentTheme);
};

toggleThemeBtn.addEventListener("click", toggleTheme);
