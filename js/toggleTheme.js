const toggleThemeBtn = document.querySelector(".toggle-mode");
const body = document.querySelector("body");

const setDark = () => {
  body.classList.add("dark-theme");
  toggleThemeBtn.textContent = "light_mode";
  localStorage.setItem("theme", "mode_night");
};

const setLight = () => {
  body.classList.remove("dark-theme");
  toggleThemeBtn.textContent = "mode_night";
  localStorage.setItem("theme", "light_mode");
};

document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme");
  currentTheme === "light_mode" ? setLight() : setDark();
});

toggleThemeBtn.addEventListener("click", (e) =>
  e.target.textContent === "light_mode" ? setLight() : setDark()
);
