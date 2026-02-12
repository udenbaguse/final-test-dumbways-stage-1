(function () {
  const root = document.documentElement;
  const themeToggleButton = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("bs-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = prefersDark ? "dark" : "light";
  const activeTheme = savedTheme || defaultTheme;

  root.setAttribute("data-bs-theme", activeTheme);

  if (!themeToggleButton) return;

  const updateButtonIcon = (theme) => {
    themeToggleButton.innerHTML =
      theme === "dark"
        ? '<i class="bi bi-sun-fill" aria-hidden="true"></i>'
        : '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>';
    themeToggleButton.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggleButton.setAttribute(
      "title",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  updateButtonIcon(activeTheme);

  themeToggleButton.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-bs-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-bs-theme", nextTheme);
    localStorage.setItem("bs-theme", nextTheme);
    updateButtonIcon(nextTheme);
  });
})();
