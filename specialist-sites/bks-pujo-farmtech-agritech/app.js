(function () {
  "use strict";

  var FILENAME = "bks-pujo-farmer-interest.json";

  function $(id) {
    return document.getElementById(id);
  }

  function currentLang() {
    if (window.BKS_CHROME && typeof window.BKS_CHROME.readLang === "function") {
      return window.BKS_CHROME.readLang();
    }
    return document.documentElement.lang || "en";
  }

  function pack() {
    var root = window.BKS_I18N || {};
    var code = currentLang();
    return root[code] || root.en || {};
  }

  function msg(path, fallback) {
    var cur = pack();
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i += 1) {
      if (cur == null) return fallback;
      cur = cur[parts[i]];
    }
    return cur == null ? fallback : cur;
  }

  function setHidden(el, hidden) {
    if (!el) return;
    if (hidden) el.setAttribute("hidden", "");
    else el.removeAttribute("hidden");
  }

  function payloadFrom(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });
    data.stored = false;
    data.production = false;
    data.experience = "farmers";
    data.form = "bks-pujo-farmer-interest";
    data.createdAt = new Date().toISOString();
    data.note =
      "Local interest note from the FarmTech + AgriTech page. Not enrolment. Not a promise of Rs 1 lakh.";
    return data;
  }

  function downloadFile(filename, payload) {
    var blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function bindForm() {
    var form = $("farmer-form");
    var status = $("form-status");
    if (!form) return;

    var fields = [
      { id: "name", error: "name-error" },
      { id: "locality", error: "locality-error" },
      { id: "consent", error: "consent-error" }
    ];

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var valid = true;

      fields.forEach(function (item) {
        var input = $(item.id);
        var error = $(item.error);
        var wrap = input ? input.closest(".field") : null;
        var ok = input && input.checkValidity();
        setHidden(error, ok);
        if (wrap) wrap.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        if (status) {
          status.textContent = msg("form.needFields", "Please complete the required fields.");
          status.classList.add("is-error");
        }
        var first = form.querySelector(":invalid");
        if (first && typeof first.focus === "function") first.focus();
        return;
      }

      downloadFile(FILENAME, payloadFrom(form));
      if (status) {
        status.classList.remove("is-error");
        status.textContent = msg(
          "form.success",
          "Thank you. If you wish to continue, write to contact@bkswbengal.org."
        );
      }
    });
  }

  function boot() {
    bindForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
