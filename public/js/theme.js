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

(function () {
  const navLinks = Array.from(
    document.querySelectorAll('.navbar-nav .nav-link[href^="#"]')
  );
  if (!navLinks.length) return;

  const sections = navLinks
    .map((link) => {
      const targetSelector = link.getAttribute("href");
      return document.querySelector(targetSelector);
    })
    .filter(Boolean);
  if (!sections.length) return;

  const clearActive = () => {
    navLinks.forEach((link) => link.classList.remove("active"));
  };

  const setActive = (sectionId) => {
    clearActive();
    const activeLink = navLinks.find(
      (link) => link.getAttribute("href") === `#${sectionId}`
    );
    if (activeLink) activeLink.classList.add("active");
  };

  const getActiveSectionId = () => {
    const viewPoint = window.scrollY + window.innerHeight * 0.35;

    for (const section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (viewPoint >= top && viewPoint < bottom) {
        return section.id;
      }
    }

    const nearBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    if (nearBottom) {
      return sections[sections.length - 1].id;
    }

    return "";
  };

  const syncActiveNav = () => {
    const activeSectionId = getActiveSectionId();
    if (!activeSectionId) {
      clearActive();
      return;
    }
    setActive(activeSectionId);
  };

  let animationFrameId = 0;
  const queueSync = () => {
    if (animationFrameId) return;
    animationFrameId = window.requestAnimationFrame(() => {
      animationFrameId = 0;
      syncActiveNav();
    });
  };

  window.addEventListener("scroll", queueSync, { passive: true });
  window.addEventListener("resize", queueSync);
  syncActiveNav();
})();

(function () {
  const lazyVideos = Array.from(
    document.querySelectorAll("video source[data-src]")
  );
  if (!lazyVideos.length) return;

  const hydrateVideo = (sourceNode) => {
    const videoNode = sourceNode.parentElement;
    const src = sourceNode.getAttribute("data-src");
    if (!videoNode || !src) return;
    if (sourceNode.getAttribute("src")) return;

    sourceNode.setAttribute("src", src);
    sourceNode.removeAttribute("data-src");
    videoNode.load();
  };

  if (!("IntersectionObserver" in window)) {
    lazyVideos.forEach(hydrateVideo);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sourceNode = entry.target.querySelector("source[data-src]");
        if (sourceNode) hydrateVideo(sourceNode);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "300px 0px" }
  );

  lazyVideos.forEach((sourceNode) => {
    const videoNode = sourceNode.parentElement;
    if (videoNode) observer.observe(videoNode);
  });
})();
