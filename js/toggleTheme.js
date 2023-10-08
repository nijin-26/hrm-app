const toggleThemeBtn = document.querySelector(".toggle-theme");
const body = document.querySelector("body");

const setDark = () => {
  console.log("set dark is called");
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
  if (currentTheme) currentTheme === "light_mode" ? setLight() : setDark();
});

toggleThemeBtn.addEventListener("click", (e) =>
  e.target.textContent === "light_mode" ? setLight() : setDark()
);

export const toggleTheme = () => {
  toggleThemeBtn.textContent === "light_mode" ? setLight() : setDark();
};
