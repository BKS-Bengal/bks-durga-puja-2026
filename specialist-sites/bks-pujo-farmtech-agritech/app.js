(function () {
  "use strict";

  var FILENAME = "bks-pujo-farmer-interest.json";

  function $(id) {
    return document.getElementById(id);
  }

  function setHidden(el, hidden) {
    if (!el) return;
    if (hidden) el.setAttribute("hidden", "");
    else el.removeAttribute("hidden");
  }

  function bindNav() {
    var toggle = $("nav-toggle");
    var nav = $("site-nav");
    var mast = document.querySelector(".mast");
    if (!toggle || !nav || !mast) return;

    function close() {
      mast.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function open() {
      mast.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function () {
      if (mast.classList.contains("is-open")) close();
      else open();
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
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
      "Downloaded locally from the FarmTech + AgriTech Integrated Farming page. Not submitted to a server. Not enrolment. Not a promise of Rs 1 lakh.";
    return data;
  }

  function downloadJson(filename, payload) {
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
        var ok = input && input.checkValidity();
        setHidden(error, ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        if (status) {
          status.textContent = "Please complete the required fields.";
          status.classList.add("is-error");
        }
        var first = form.querySelector(":invalid");
        if (first && typeof first.focus === "function") first.focus();
        return;
      }

      downloadJson(FILENAME, payloadFrom(form));
      if (status) {
        status.classList.remove("is-error");
        status.textContent =
          "The information has been downloaded as a file to your device. It has not been uploaded. This is not enrolment. Rs 1 lakh is not promised.";
      }
    });
  }

  function boot() {
    bindNav();
    bindForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
