(function () {
  "use strict";

  var LANG_KEY = "bks-specialist-lang";
  var LANGS = { en: true, bn: true, hi: true };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function readLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q = params.get("lang");
      if (q && LANGS[q]) return q;
    } catch (err) {}
    try {
      var stored = window.localStorage.getItem(LANG_KEY);
      if (stored && LANGS[stored]) return stored;
    } catch (err2) {}
    var htmlLang = document.documentElement.lang;
    if (htmlLang && LANGS[htmlLang]) return htmlLang;
    return "en";
  }

  function writeLang(code) {
    try {
      window.localStorage.setItem(LANG_KEY, code);
    } catch (err) {}
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", code);
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (err2) {}
  }

  function getPath(obj, path) {
    if (!obj || !path) return null;
    var cur = obj;
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i += 1) {
      if (cur == null) return null;
      cur = cur[parts[i]];
    }
    return cur == null ? null : cur;
  }

  function applyLang(code) {
    var packRoot = window.BKS_I18N || {};
    var pack = packRoot[code] || packRoot.en;
    if (!pack) return;
    document.documentElement.lang = code === "bn" ? "bn" : code === "hi" ? "hi" : "en";

    $all("[data-i18n]").forEach(function (el) {
      var val = getPath(pack, el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });

    $all("[data-i18n-html]").forEach(function (el) {
      var val = getPath(pack, el.getAttribute("data-i18n-html"));
      if (val != null) el.innerHTML = val;
    });

    $all("[data-i18n-placeholder]").forEach(function (el) {
      var val = getPath(pack, el.getAttribute("data-i18n-placeholder"));
      if (val != null) el.setAttribute("placeholder", val);
    });

    $all("[data-i18n-aria]").forEach(function (el) {
      var val = getPath(pack, el.getAttribute("data-i18n-aria"));
      if (val != null) el.setAttribute("aria-label", val);
    });

    $all("[data-i18n-alt]").forEach(function (el) {
      var val = getPath(pack, el.getAttribute("data-i18n-alt"));
      if (val != null) el.setAttribute("alt", val);
    });

    if (pack.meta) {
      if (pack.meta.title) document.title = pack.meta.title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc && pack.meta.description) desc.setAttribute("content", pack.meta.description);
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && pack.meta.ogTitle) ogTitle.setAttribute("content", pack.meta.ogTitle);
      var ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && pack.meta.ogDescription) ogDesc.setAttribute("content", pack.meta.ogDescription);
    }

    $all(".lang-bar button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === code ? "true" : "false");
    });
  }

  function bindLang() {
    $all(".lang-bar button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var code = btn.getAttribute("data-lang") || "en";
        writeLang(code);
        applyLang(code);
        if (typeof window.BKS_RENDER === "function") {
          window.BKS_RENDER(code);
        }
      });
    });
  }

  function setDrawer(open) {
    var drawer = $("#nav-drawer");
    var backdrop = $("#nav-backdrop");
    var toggle = $("#nav-toggle");
    if (!drawer || !toggle) return;
    drawer.hidden = !open;
    if (backdrop) backdrop.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var closeBtn = $("#nav-close");
      if (closeBtn) closeBtn.focus();
    }
  }

  function bindNav() {
    var toggle = $("#nav-toggle");
    var closeBtn = $("#nav-close");
    var backdrop = $("#nav-backdrop");
    var drawer = $("#nav-drawer");
    if (toggle) {
      toggle.addEventListener("click", function () {
        setDrawer(toggle.getAttribute("aria-expanded") !== "true");
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
    if (backdrop) backdrop.addEventListener("click", function () { setDrawer(false); });
    if (drawer) {
      drawer.addEventListener("click", function (event) {
        if (event.target.closest("a")) setDrawer(false);
      });
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setDrawer(false);
    });
  }

  function bindReveal() {
    var nodes = $all("[data-reveal]");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("is-in"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach(function (node) { observer.observe(node); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindNav();
    bindLang();
    bindReveal();
    applyLang(readLang());
    if (window.location.hash) {
      var target = document.querySelector(window.location.hash);
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  });

  window.BKS_CHROME = {
    applyLang: applyLang,
    readLang: readLang
  };
})();
