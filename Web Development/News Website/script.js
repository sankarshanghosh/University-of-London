const toggleButton = document.getElementById("dark-mode-toggle");
const body = document.querySelector("body");

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkmode", "dark");
  } else {
    localStorage.clear("darkmode");
    localStorage.setItem("darkmode", "light");
  }
});

window.onload = () => {
  const dark = localStorage.getItem("darkmode");
  if (dark === "dark") {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
};
