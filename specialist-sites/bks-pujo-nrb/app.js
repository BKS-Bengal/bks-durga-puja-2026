(function () {
  "use strict";

  var FILENAME = "bks-pujo-nrb-interest.json";

  function $(id) {
    return document.getElementById(id);
  }

  function setupNav() {
    var toggle = $("nav-toggle");
    var nav = $("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector(".nav-toggle-text").textContent = open ? "Close" : "Menu";
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function downloadJson(payload) {
    var blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = FILENAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function clearFieldErrors(form) {
    form.querySelectorAll(".field.is-invalid").forEach(function (field) {
      field.classList.remove("is-invalid");
    });
  }

  function markInvalid(input) {
    var field = input.closest(".field");
    if (field) field.classList.add("is-invalid");
  }

  function setupForm() {
    var form = $("nrb-interest-form");
    var status = $("form-status");
    if (!form || !status) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearFieldErrors(form);
      status.textContent = "";
      status.className = "form-status";

      if (!form.reportValidity()) {
        var firstBad = form.querySelector(":invalid");
        if (firstBad) {
          markInvalid(firstBad);
          firstBad.focus();
        }
        status.textContent = "Please complete the required fields. Nothing has been downloaded.";
        status.classList.add("is-error");
        return;
      }

      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = String(value).trim();
      });

      var payload = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        native_village: data.native_village || "",
        lives_now: data.lives_now || "",
        consent: data.consent === "yes",
        role: "supporter-nrb",
        stored: false,
        production: false,
        experience: "nrb",
        createdAt: new Date().toISOString(),
        note: "Downloaded locally from the Bharatiya Krishak Samaj Pujo supporters page. Not submitted to a server. No payment was taken."
      };

      try {
        downloadJson(payload);
      } catch (err) {
        status.textContent = "The file could not be downloaded in this browser. Please try again, or write to contact@bkswbengal.org.";
        status.classList.add("is-error");
        return;
      }

      status.textContent = "The information has been downloaded as bks-pujo-nrb-interest.json. It has not been uploaded. Nothing here takes money.";
      status.classList.add("is-ok");
    });

    form.addEventListener("input", function (event) {
      var target = event.target;
      if (target && target.closest) {
        var field = target.closest(".field");
        if (field) field.classList.remove("is-invalid");
      }
      if (status.classList.contains("is-error")) {
        status.textContent = "";
        status.className = "form-status";
      }
    });
  }

  function boot() {
    setupNav();
    setupForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
