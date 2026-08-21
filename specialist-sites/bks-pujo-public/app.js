(function () {
  "use strict";

  var nav = document.querySelector(".site-nav");
  var toggle = document.getElementById("nav-toggle");
  var panel = document.getElementById("nav-panel");
  var langButtons = document.querySelectorAll(".lang button");
  var langBanner = document.getElementById("lang-pending");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });
  }

  if (panel) {
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNavOpen(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNavOpen(false);
  });

  function setLanguage(code) {
    document.documentElement.lang = "en";
    langButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-lang") === code ? "true" : "false");
    });
    if (langBanner) {
      langBanner.hidden = code === "en";
    }
  }

  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.getAttribute("data-lang") || "en");
    });
  });

  var reveals = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (node) {
      node.classList.add("is-in");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (node) {
      observer.observe(node);
    });
  }

  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }
})();
