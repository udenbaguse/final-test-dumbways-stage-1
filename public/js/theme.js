(function () {
  const root = document.documentElement;
  const themeToggleButton = document.getElementById("themeToggle");
  const pageShell = document.querySelector(".page-shell");
  const savedTheme = localStorage.getItem("bs-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const REVEAL_DURATION_MS = 1000;
  const defaultTheme = prefersDark ? "dark" : "light";
  const activeTheme = savedTheme || defaultTheme;

  const updateButtonIcon = (theme) => {
    if (!themeToggleButton) return;

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

  const applyTheme = (theme) => {
    root.setAttribute("data-bs-theme", theme);
    localStorage.setItem("bs-theme", theme);
    updateButtonIcon(theme);
  };

  let isThemeAnimating = false;

  const runBackgroundReveal = (currentTheme, nextTheme) => {
    if (!themeToggleButton || !pageShell || isThemeAnimating) return;
    isThemeAnimating = true;

    const buttonRect = themeToggleButton.getBoundingClientRect();
    const originX = buttonRect.left + buttonRect.width / 2;
    const originY = buttonRect.top + buttonRect.height / 2;

    applyTheme(nextTheme);

    const revealNode = document.createElement("div");
    revealNode.className = `theme-backdrop-circle to-${currentTheme} active`;
    revealNode.style.left = `${originX}px`;
    revealNode.style.top = `${originY}px`;

    document.body.insertBefore(revealNode, pageShell);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        revealNode.classList.remove("active");
      });
    });

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      revealNode.remove();
      isThemeAnimating = false;
    };

    revealNode.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName === "transform") finish();
      },
      { once: true }
    );

    window.setTimeout(finish, REVEAL_DURATION_MS + 150);
  };

  applyTheme(activeTheme);

  if (!themeToggleButton) return;

  themeToggleButton.addEventListener("click", () => {
    if (isThemeAnimating) return;
    const currentTheme = root.getAttribute("data-bs-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    if (prefersReducedMotion) {
      applyTheme(nextTheme);
      return;
    }

    if (!pageShell) {
      applyTheme(nextTheme);
      return;
    }

    runBackgroundReveal(currentTheme, nextTheme);
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

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;
  if (window.matchMedia("(max-width: 767.98px)").matches) return;

  const sections = Array.from(
    document.querySelectorAll(
      "#tech-stack, #work-experiences, #my-projects, #contact-me"
    )
  );
  if (!sections.length) return;

  const MAX_SHIFT_Y = 18;
  const MAX_SHIFT_X = 10;

  const updateParallax = () => {
    const viewportHeight = window.innerHeight || 1;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const centerOffset =
        rect.top + rect.height * 0.5 - viewportHeight * 0.5;
      const normalized = Math.max(-1, Math.min(1, centerOffset / viewportHeight));
      const shiftY = normalized * -MAX_SHIFT_Y;
      const shiftX =
        (index % 2 === 0 ? 1 : -1) * normalized * MAX_SHIFT_X;

      section.style.setProperty("--depth-shift-x", `${shiftX.toFixed(2)}px`);
      section.style.setProperty("--depth-shift-y", `${shiftY.toFixed(2)}px`);
    });
  };

  let rafId = 0;
  const queueUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      updateParallax();
    });
  };

  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  updateParallax();
})();

// Scroll reveal trigger
(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealGroups = [
    { selector: "main.container.py-5", effectClass: "scroll-reveal--up" },
    { selector: "#tech-stack .section-title", effectClass: "scroll-reveal--soft" },
    { selector: "#tech-stack .tech-carousel-track", effectClass: "scroll-reveal--soft" },
    {
      selector: "#work-experiences .experience-card",
      effectClass: "scroll-reveal--left",
    },
    { selector: "#my-projects .portfolio-card", effectClass: "scroll-reveal--right" },
    { selector: "#contact-me .col-12.col-lg-8", effectClass: "scroll-reveal--up" },
    { selector: "footer .container", effectClass: "scroll-reveal--soft" },
  ];

  const targets = revealGroups.flatMap((group) =>
    Array.from(document.querySelectorAll(group.selector)).map((element, index) => ({
      element,
      effectClass: group.effectClass,
      index,
    }))
  );

  if (!targets.length) return;

  targets.forEach(({ element, effectClass, index }) => {
    element.classList.add("scroll-reveal");
    if (effectClass) element.classList.add(effectClass);
    element.style.transitionDelay = String(Math.min(index * 85, 340)) + "ms";
  });

  if (prefersReducedMotion) {
    targets.forEach(({ element }) => element.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach(({ element }) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  targets.forEach(({ element }) => observer.observe(element));
})();

