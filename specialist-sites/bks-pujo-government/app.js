(function () {
  "use strict";

  var FORM_ID = "eco-briefing-form";
  var FILE_NAME = "bks-pujo-briefing-request.json";
  var LANGS = { en: "en", bn: "bn", hi: "hi" };

  function $(id) {
    return document.getElementById(id);
  }

  function currentLang() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get("lang");
    if (q && LANGS[q]) return q;
    try {
      var stored = window.localStorage.getItem("bks-gov-lang");
      if (stored && LANGS[stored]) return stored;
    } catch (err) {
      /* ignore */
    }
    return "en";
  }

  function setLang(lang) {
    var next = LANGS[lang] ? lang : "en";
    try {
      window.localStorage.setItem("bks-gov-lang", next);
    } catch (err) {
      /* ignore */
    }
    var url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);

    var pending = $("lang-pending");
    var select = $("lang-select");
    if (select) select.value = next;

    // Content remains English. Do not claim a Bangla or Hindi document.
    document.documentElement.lang = "en";
    if (pending) {
      if (next === "en") {
        pending.hidden = true;
        pending.textContent = "";
      } else if (next === "bn") {
        pending.hidden = false;
        pending.textContent =
          "Bangla translation is pending native review. This briefing is shown in English.";
      } else {
        pending.hidden = false;
        pending.textContent =
          "Hindi translation is pending native review. This briefing is shown in English.";
      }
    }
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

  function formPayload(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = String(value);
    });
    data.stored = false;
    data.production = false;
    data.posted = false;
    data.experience = "stakeholders";
    data.createdAt = new Date().toISOString();
    data.note =
      "Downloaded locally from the Bharatiya Krishak Samaj Pujo institutional briefing. Not submitted to a server. Not logged with any government department.";
    return data;
  }

  function setStatus(el, message, ok) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("is-ok", Boolean(ok));
    el.classList.toggle("is-err", !ok && Boolean(message));
  }

  function bindForm() {
    var form = $(FORM_ID);
    if (!form) return;
    var status = $("eco-briefing-status");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) {
        setStatus(
          status,
          "Complete the required fields. Nothing has been sent.",
          false
        );
        return;
      }
      downloadJson(FILE_NAME, formPayload(form));
      setStatus(
        status,
        "The briefing request has been downloaded as a file to this device. It was not submitted to a server and is not logged with any department.",
        true
      );
    });
  }

  function bindLang() {
    var select = $("lang-select");
    setLang(currentLang());
    if (!select) return;
    select.addEventListener("change", function () {
      setLang(select.value);
    });
  }

  function bindSeal() {
    var seal = $("bks-seal");
    if (!seal) return;
    seal.addEventListener("error", function () {
      seal.remove();
    });
  }

  function boot() {
    bindLang();
    bindForm();
    bindSeal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
