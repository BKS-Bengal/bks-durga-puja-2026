(function () {
  "use strict";

  var LANG_KEY = "protyaborton-lang";
  var LANGS = { bn: true, en: true };
  var DEFAULT_LANG = "bn";
  var API_URL = "/api/register";

  var CREATOR_TYPES = {
    agri_digital_creator: true,
    youtuber: true,
    rural_vlogger: true
  };

  var MEDIA_TYPES = {
    journalist: true,
    media_editor: true
  };

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
    return DEFAULT_LANG;
  }

  function t(lang, path) {
    var dict = window.PROTYABORTON_REGISTER_I18N[lang] || window.PROTYABORTON_REGISTER_I18N.bn;
    var parts = path.split(".");
    var cur = dict;
    for (var i = 0; i < parts.length; i += 1) {
      if (!cur) return path;
      cur = cur[parts[i]];
    }
    return cur == null ? path : cur;
  }

  function applyI18n(lang) {
    document.documentElement.lang = lang;
    document.body.classList.remove("lang-bn", "lang-en");
    document.body.classList.add("lang-" + lang);
    document.title = t(lang, "meta.title");
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t(lang, "meta.description"));

    $all("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(lang, key);
      if (val != null) el.textContent = val;
    });

    $all("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var val = t(lang, key);
      if (val != null) el.setAttribute("placeholder", val);
    });

    $all(".lang-bar button").forEach(function (btn) {
      var code = btn.getAttribute("data-lang");
      btn.setAttribute("aria-pressed", code === lang ? "true" : "false");
    });
  }

  function normalizeMobile(mobile) {
    var digits = String(mobile || "").replace(/\D/g, "");
    if (digits.length === 12 && digits.indexOf("91") === 0) digits = digits.slice(2);
    if (digits.length === 11 && digits.charAt(0) === "0") digits = digits.slice(1);
    return digits;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidMobile(mobile) {
    var digits = normalizeMobile(mobile);
    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
  }

  function isValidUrl(url) {
    if (!url) return true;
    try {
      var parsed = new URL(url.indexOf("://") === -1 ? "https://" + url : url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch (err) {
      return false;
    }
  }

  function setFieldError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var err = document.getElementById(fieldId + "-error");
    if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
    if (err) err.textContent = message || "";
  }

  function clearErrors() {
    $all(".field-error").forEach(function (el) { el.textContent = ""; });
    $all("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
    var alert = $("#form-alert");
    if (alert) {
      alert.hidden = true;
      alert.textContent = "";
    }
  }

  function getParticipantType() {
    var sel = $("#participant_type");
    return sel ? sel.value : "";
  }

  function updateConditionalFields() {
    var type = getParticipantType();
    var creator = CREATOR_TYPES[type];
    var media = MEDIA_TYPES[type];
    var other = type === "other";

    $("#field-channel").classList.toggle("is-hidden", !creator);
    $("#field-organisation").classList.toggle("is-hidden", !media);
    $("#field-role").classList.toggle("is-hidden", !media);
    $("#field-other-type").classList.toggle("is-hidden", !other);

    var websiteLabel = $("#website-label");
    if (websiteLabel) {
      websiteLabel.textContent = media
        ? (readLang() === "bn" ? "প্রকাশনা / মিডিয়া লিংক" : "Publication / media link")
        : t(readLang(), "fields.website");
    }
  }

  function validateClient(lang) {
    clearErrors();
    var ok = true;
    var fullName = $("#full_name").value.trim();
    var mobile = $("#mobile").value.trim();
    var email = $("#email").value.trim().toLowerCase();
    var city = $("#city").value.trim();
    var type = getParticipantType();
    var website = $("#website_or_social").value.trim();
    var consent = $("#consent").checked;
    var attendance = $("#attendance_confirmation").checked;

    if (!fullName) {
      setFieldError("full_name", t(lang, "required"));
      ok = false;
    }
    if (!isValidMobile(mobile)) {
      setFieldError("mobile", t(lang, "errors.mobile"));
      ok = false;
    }
    if (!email || !isValidEmail(email)) {
      setFieldError("email", t(lang, "errors.email"));
      ok = false;
    }
    if (!type) {
      setFieldError("participant_type", t(lang, "required"));
      ok = false;
    }
    if (!city) {
      setFieldError("city", t(lang, "required"));
      ok = false;
    }
    if (CREATOR_TYPES[type] && !$("#channel_or_publication").value.trim()) {
      setFieldError("channel_or_publication", t(lang, "required"));
      ok = false;
    }
    if (MEDIA_TYPES[type] && !$("#organisation").value.trim()) {
      setFieldError("organisation", t(lang, "required"));
      ok = false;
    }
    if (type === "other" && !$("#other_participant_type").value.trim()) {
      setFieldError("other_participant_type", t(lang, "required"));
      ok = false;
    }
    if (website && !isValidUrl(website)) {
      setFieldError("website_or_social", t(lang, "errors.url"));
      ok = false;
    }
    if (!attendance) {
      setFieldError("attendance_confirmation", t(lang, "required"));
      ok = false;
    }
    if (!consent) {
      setFieldError("consent", t(lang, "errors.consent"));
      ok = false;
    }
    return ok;
  }

  function collectPayload() {
    var interests = $all('input[name="interest_area"]:checked').map(function (el) {
      return el.value;
    });
    return {
      full_name: $("#full_name").value.trim(),
      mobile: $("#mobile").value.trim(),
      email: $("#email").value.trim().toLowerCase(),
      participant_type: getParticipantType(),
      organisation: $("#organisation").value.trim(),
      channel_or_publication: $("#channel_or_publication").value.trim(),
      district: $("#district").value.trim(),
      city: $("#city").value.trim(),
      role_or_designation: $("#role_or_designation").value.trim(),
      website_or_social: $("#website_or_social").value.trim(),
      other_participant_type: $("#other_participant_type").value.trim(),
      interest_area: interests,
      attendance_confirmation: $("#attendance_confirmation").checked ? "yes" : "",
      consent: $("#consent").checked,
      website: $("#website_hp").value
    };
  }

  function showFormAlert(lang, key) {
    var alert = $("#form-alert");
    if (!alert) return;
    alert.hidden = false;
    alert.textContent = t(lang, "errors." + key) || t(lang, "errors.server");
    alert.className = "register-alert register-alert--error";
    alert.setAttribute("role", "alert");
    alert.focus();
  }

  function showSuccess(lang) {
    var formWrap = $("#registration-form-wrap");
    var success = $("#registration-success");
    if (formWrap) formWrap.hidden = true;
    if (success) {
      success.hidden = false;
      var h2 = success.querySelector("h2");
      if (h2) h2.focus();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setSubmitting(isSubmitting) {
    var btn = $("#submit-btn");
    var lang = readLang();
    if (!btn) return;
    btn.disabled = isSubmitting;
    btn.textContent = isSubmitting ? t(lang, "submitting") : t(lang, "submit");
  }

  function bindLangToggle() {
    $all(".lang-bar button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var code = btn.getAttribute("data-lang");
        if (!LANGS[code]) return;
        try { window.localStorage.setItem(LANG_KEY, code); } catch (err) {}
        applyI18n(code);
        updateConditionalFields();
      });
    });
  }

  function bindForm() {
    var form = $("#registration-form");
    if (!form) return;

    $("#participant_type").addEventListener("change", updateConditionalFields);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var lang = readLang();
      if (!validateClient(lang)) {
        showFormAlert(lang, "validation");
        return;
      }

      setSubmitting(true);
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectPayload())
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { status: res.status, data: data };
          });
        })
        .then(function (result) {
          if (result.status === 201 && result.data.ok) {
            showSuccess(lang);
            return;
          }
          if (result.status === 409) {
            showFormAlert(lang, "duplicate");
            return;
          }
          if (result.status === 429) {
            showFormAlert(lang, "rateLimited");
            return;
          }
          if (result.status === 503) {
            showFormAlert(lang, "config");
            return;
          }
          if (result.status === 400) {
            showFormAlert(lang, "validation");
            return;
          }
          showFormAlert(lang, "server");
        })
        .catch(function () {
          showFormAlert(lang, "network");
        })
        .finally(function () {
          setSubmitting(false);
        });
    });
  }

  function init() {
    var lang = readLang();
    applyI18n(lang);
    bindLangToggle();
    bindForm();
    updateConditionalFields();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
