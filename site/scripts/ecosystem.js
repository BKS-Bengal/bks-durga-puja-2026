/* Audience-experience renderer. Additive. No payment. */
(function () {
  const LANGS = [
    { id: "en", name: "English" },
    { id: "bn", name: "বাংলা" },
    { id: "hi", name: "हिन्दी" }
  ];

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function qsLang() {
    const params = new URLSearchParams(location.search);
    const q = params.get("lang");
    if (q === "bn" || q === "hi" || q === "en") return q;
    try {
      const stored = localStorage.getItem("bks-lang");
      if (stored === "bn" || stored === "hi" || stored === "en") return stored;
    } catch (err) { /* ignore */ }
    return "en";
  }

  function setLang(lang) {
    try { localStorage.setItem("bks-lang", lang); } catch (err) { /* ignore */ }
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
    document.documentElement.lang = lang === "bn" ? "bn" : lang === "hi" ? "hi" : "en";
  }

  function downloadJson(filename, payload) {
    if (window.BksCampaign && typeof window.BksCampaign.downloadJson === "function") {
      window.BksCampaign.downloadJson(filename, payload);
      return;
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function formPayload(form, kind) {
    const data = {};
    new FormData(form).forEach((value, key) => { data[key] = value; });
    data.stored = false;
    data.production = false;
    data.experience = kind;
    data.createdAt = new Date().toISOString();
    data.note = "Downloaded locally from Bharatiya Krishak Samaj Pujo. Not submitted to a server.";
    return data;
  }

  function bindDownload(formId, filename, statusId, kind) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      downloadJson(filename, formPayload(form, kind));
      const status = document.getElementById(statusId);
      if (status) status.textContent = "The information has been downloaded as a file to your device.";
    });
  }

  function primaryNav(base) {
    return [
      { id: "home", href: base + "/index.html", label: "Home" },
      { id: "puja", href: base + "/index.html#puja", label: "The Puja" },
      { id: "ifs", href: base + "/index.html#ifs", label: "Integrated Farming" },
      { id: "participate", href: base + "/index.html#participate", label: "Participate" },
      { id: "krishak", href: base + "/index.html#krishak", label: "Bharatiya Krishak Samaj" }
    ];
  }

  function audienceNav(base) {
    return [
      { id: "sponsors", href: "https://bks-pujo-sponsor.vercel.app/", label: "Sponsors" },
      { id: "stakeholders", href: "https://bks-pujo-government.vercel.app/", label: "Government & Institutions" },
      { id: "farmers", href: "https://bks-pujo-farmtech-agritech.vercel.app/", label: "Farmers / FarmTech + AgriTech" },
      { id: "public", href: "https://bks-pujo-public.vercel.app/", label: "Public / Puja" },
      { id: "nrb", href: "https://bks-pujo-nrb.vercel.app/", label: "NRB / Supporters" }
    ];
  }

  function currentKeys(expId) {
    if (expId === "public") return { primary: "puja", audience: "public" };
    if (expId === "umbrella") return { primary: "home", audience: "" };
    if (expId === "sponsors") return { primary: "", audience: "sponsors" };
    if (expId === "farmers") return { primary: "", audience: "farmers" };
    if (expId === "stakeholders") return { primary: "", audience: "stakeholders" };
    if (expId === "nrb") return { primary: "", audience: "nrb" };
    return { primary: "", audience: "" };
  }

  function navAnchors(items, currentId) {
    return items.map(function (item) {
      const cur = item.id === currentId ? " aria-current='page'" : "";
      return "<a href='" + escapeHtml(item.href) + "'" + cur + ">" + escapeHtml(item.label) + "</a>";
    }).join("");
  }

  function renderHeader(data, exp, base, lang) {
    const s = data.shared;
    const keys = currentKeys(exp.id);
    const pageNav = (exp.nav || []).map(function (item) {
      return "<a href='" + escapeHtml(item.href) + "'>" + escapeHtml(item.label) + "</a>";
    }).join("");
    const options = LANGS.map(function (item) {
      return "<option value='" + item.id + "'" + (item.id === lang ? " selected" : "") + ">" + item.name + "</option>";
    }).join("");
    const primary = navAnchors(primaryNav(base), keys.primary);
    const audience = navAnchors(audienceNav(base), keys.audience);
    const drawerPrimary = navAnchors(primaryNav(base), keys.primary);
    const drawerAudience = navAnchors(audienceNav(base), keys.audience);

    return (
      "<header class='site-header'>" +
      "<div class='header-inner'>" +
      "<div class='brand-row'>" +
      "<a class='brand-lockup brand-lockup--bks' href='" + base + "/index.html' aria-label='Bharatiya Krishak Samaj Pujo'>" +
      "<span class='seal'><img src='" + base + "/assets/bks-seal-96.png' width='52' height='52' alt=''></span>" +
      "<span class='wordmark'>" + escapeHtml(s.event) + "</span></a>" +
      "<span class='brand-divider' aria-hidden='true'></span>" +
      "<div class='brand-lockup brand-lockup--karmyog'>" +
      "<img class='karmyog-mark' src='" + base + "/assets/karmyog/karmyog-21st-century-256.png' width='44' height='44' alt=''>" +
      "<span class='brand-sub'>" + escapeHtml(s.karmyogLabel) + " " + escapeHtml(s.karmyog) + "</span></div>" +
      "<div class='header-tools'>" +
      "<label class='lang-select-wrap'><span class='sr-only'>" + escapeHtml(s.language) + "</span>" +
      "<select class='lang-select' id='eco-lang'>" + options + "</select></label>" +
      "<button type='button' class='nav-toggle' id='eco-nav-toggle' aria-expanded='false' aria-controls='eco-drawer'>" +
      "<span class='nav-toggle-bars' aria-hidden='true'><span></span><span></span><span></span></span>" +
      "<span class='sr-only'>" + escapeHtml(s.menu) + "</span></button>" +
      "</div></div>" +
      "<nav class='nav nav-desktop' id='eco-desktop-nav' aria-label='Primary'>" + primary + "</nav>" +
      "</div></header>" +
      "<p class='audience-strip'>" + audience + "</p>" +
      "<p class='eco-back'><a href='https://bks-durga-puja-2026.vercel.app/'>" + escapeHtml(s.backToMain || "Back to Bharatiya Krishak Samaj Pujo") + "</a></p>" +
      (pageNav
        ? "<nav class='eco-page-nav' id='eco-nav' aria-label='On this page'>" + pageNav + "</nav>"
        : "") +
      "<div class='nav-backdrop' id='eco-backdrop' hidden></div>" +
      "<div class='nav-drawer' id='eco-drawer' role='dialog' aria-modal='true' aria-labelledby='eco-drawer-title' hidden>" +
      "<div class='nav-drawer-head'><p class='nav-drawer-title' id='eco-drawer-title'>" + escapeHtml(s.menu) + "</p>" +
      "<button type='button' class='nav-close' id='eco-nav-close'><span aria-hidden='true'>×</span>" +
      "<span class='sr-only'>" + escapeHtml(s.menuClose) + "</span></button></div>" +
      "<nav class='nav-drawer-list' aria-label='Primary'>" +
      "<p class='nav-group-label'>Site</p><div class='nav-group'>" + drawerPrimary + "</div>" +
      "<p class='nav-group-label'>Participate</p><div class='nav-group'>" + drawerAudience + "</div>" +
      (pageNav ? "<p class='nav-group-label'>On this page</p><div class='nav-group'>" + pageNav + "</div>" : "") +
      "</nav></div>"
    );
  }

  function renderHero(exp, shared) {
    const cls = "eco-hero eco-hero--" + exp.id;
    return (
      "<section class='" + cls + "' id='intro'>" +
      "<div class='eco-hero-copy'>" +
      "<p class='eco-kicker'>" + escapeHtml(exp.kicker) + "</p>" +
      "<h1>" + escapeHtml(exp.h1) + "</h1>" +
      "<p class='lede'>" + escapeHtml(exp.lede) + "</p>" +
      (exp.pendingNote ? "<p class='eco-pending'>" + escapeHtml(exp.pendingNote) + "</p>" : "") +
      "<p class='cta-row'>" +
      "<a class='btn btn-primary' href='" + escapeHtml(exp.primaryHref) + "'>" + escapeHtml(exp.primaryCta) + "</a>" +
      (exp.secondaryCta
        ? "<a class='btn btn-secondary' href='" + escapeHtml(exp.secondaryHref) + "'>" + escapeHtml(exp.secondaryCta) + "</a>"
        : "") +
      "</p>" +
      (exp.heroCredit ? "<p class='hero-credit'>" + escapeHtml(exp.heroCredit) + "</p>" : "") +
      "</div></section>"
    );
  }

  function renderSections(exp, onlyIds) {
    return (exp.sections || []).filter(function (sec) {
      if (!onlyIds) return true;
      return onlyIds.indexOf(sec.id) !== -1;
    }).map(function (sec) {
      return (
        "<section class='eco-section' id='" + escapeHtml(sec.id) + "'>" +
        "<p class='eco-kicker'>" + escapeHtml(sec.kicker) + "</p>" +
        "<h2>" + escapeHtml(sec.title) + "</h2>" +
        "<p>" + escapeHtml(sec.body) + "</p></section>"
      );
    }).join("");
  }

  function renderFaq(exp, shared) {
    const items = exp.faq || [];
    if (!items.length) return "";
    const rows = items.map(function (item) {
      return (
        "<details class='eco-faq-item'>" +
        "<summary>" + escapeHtml(item.q) + "</summary>" +
        "<p>" + escapeHtml(item.a) + "</p>" +
        "</details>"
      );
    }).join("");
    return (
      "<section class='eco-section' id='faq'>" +
      "<p class='eco-kicker'>" + escapeHtml(shared.faqLabel || "FAQ") + "</p>" +
      "<h2>Questions this page should answer</h2>" +
      "<div class='eco-faq'>" + rows + "</div></section>"
    );
  }

  function renderLoop(data) {
    const loop = data.loop;
    if (!loop) return "";
    const cards = (loop.items || []).map(function (item) {
      return (
        "<article class='eco-loop-card'>" +
        "<h3>" + escapeHtml(item.title) + "</h3>" +
        "<p>" + escapeHtml(item.body) + "</p></article>"
      );
    }).join("");
    return (
      "<section class='eco-section' id='loop'>" +
      "<p class='eco-kicker'>" + escapeHtml(loop.eyebrow) + "</p>" +
      "<h2>" + escapeHtml(loop.title) + "</h2>" +
      "<p>" + escapeHtml(loop.lede) + "</p>" +
      "<div class='eco-loop'>" + cards + "</div></section>"
    );
  }

  function renderFarmtech(data) {
    const ft = data.farmtech;
    if (!ft) return "";
    return (
      "<section class='eco-section' id='farmtech'>" +
      "<p class='eco-kicker'>" + escapeHtml(ft.eyebrow) + "</p>" +
      "<h2>" + escapeHtml(ft.title) + "</h2>" +
      "<p>" + escapeHtml(ft.body) + "</p></section>"
    );
  }

  function renderTransformation(data, emphasis) {
    const t = data.transformation;
    const stages = (t.stages || []).map(function (st) {
      return (
        "<article class='eco-stage eco-stage--empty'>" +
        "<p class='eco-kicker'>" + escapeHtml(st.kicker) + "</p>" +
        "<h3>" + escapeHtml(st.title) + "</h3>" +
        "<p>" + escapeHtml(st.body) + "</p></article>"
      );
    }).join("");
    return (
      "<section class='eco-section' id='transformation'>" +
      "<p class='eco-kicker'>" + escapeHtml(t.eyebrow) + " · " + escapeHtml(emphasis) + "</p>" +
      "<h2>" + escapeHtml(t.title) + "</h2>" +
      "<p>" + escapeHtml(t.lede) + "</p>" +
      "<p class='eco-pending'>" + escapeHtml(t.pending) + "</p>" +
      "<div class='eco-stages'>" + stages + "</div></section>"
    );
  }

  function renderPartner(shared) {
    return (
      "<section class='eco-section' id='partner'>" +
      "<div class='eco-partner-block'>" +
      "<div><p class='eco-kicker'>" + escapeHtml(shared.partnerLabel) + "</p>" +
      "<h2>" + escapeHtml(shared.partner) + "</h2>" +
      "<p>Bharatiya Krishak Samaj is the organising partner of this Pujo. It is not the commercial title sponsor. The West Bengal chapter sits at New Town, Kolkata. Registration of the state organisation is already cited on the main site as S/60440/2007.</p></div>" +
      "<div class='eco-open-slot' id='title-slot'>" +
      "<p class='eco-kicker'>Title sponsorship opportunity</p>" +
      "<h2>Pending confirmation</h2>" +
      "<p>The commercial title-sponsor position is described here as an opportunity. Whether it is open is pending confirmation. Bharatiya Krishak Samaj does not occupy that slot.</p>" +
      "</div></div></section>"
    );
  }

  function renderSponsorForm(shared) {
    return (
      "<section class='eco-section' id='enquire'>" +
      "<p class='eco-kicker'>Conversion</p>" +
      "<h2>Express Sponsor Interest</h2>" +
      "<p>The committee will use this file only if you send it. No payment is taken here. Existing indicative packages from the current campaign remain marked assumed, below the form — they are not new commercial claims.</p>" +
      "<form class='campaign-form' id='eco-sponsor-form' novalidate>" +
      "<div class='form-grid'>" +
      "<label>Organisation name <input name='organisation_name' required autocomplete='organization'></label>" +
      "<label>Contact person <input name='contact_person' required autocomplete='name'></label>" +
      "<label>Designation <input name='designation' autocomplete='organization-title'></label>" +
      "<label>Mobile number <input name='phone' required inputmode='numeric' autocomplete='tel'></label>" +
      "<label>Email <input name='email' type='email' autocomplete='email'></label>" +
      "<label>Sector of interest <select name='sector'>" +
      "<option value='undecided'>Not sure yet</option>" +
      "<option value='agri'>Agriculture / farm inputs</option>" +
      "<option value='other'>Other</option>" +
      "</select></label></div>" +
      "<label>Anything the committee should know <textarea name='message' rows='4'></textarea></label>" +
      "<label class='consent-row'><input type='checkbox' name='consent' required> This website does not submit your details to BKS. The information is downloaded as a file to your device. If you choose to send that file, subsequent handling is outside this website.</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>Express Sponsor Interest</button></div>" +
      "<p class='muted'>" + escapeHtml(shared.noPayment) + "</p>" +
      "<p class='muted' id='eco-sponsor-status'></p></form>" +
      "<div class='eco-packages'>" +
      "<p class='eco-kicker'>Existing indicative packages · assumed</p>" +
      "<p>These amounts already exist on the current campaign page. They are not confirmed. They are shown here so the sponsor review does not hide what the holding site already publishes.</p>" +
      "<div class='tier-grid'>" +
      "<article class='tier-card'><p class='kicker'>One only</p><h3>Title Sponsor</h3><p class='stat-value'>₹10 lakh <span class='badge badge-pending'>ASSUMED</span></p></article>" +
      "<article class='tier-card'><p class='kicker'>One per award</p><h3>Award Category Sponsor</h3><p class='stat-value'>₹2.5 lakh <span class='badge badge-pending'>ASSUMED</span></p></article>" +
      "</div></div></section>"
    );
  }

  function renderFarmerForm(shared) {
    return (
      "<section class='eco-section' id='participate'>" +
      "<p class='eco-kicker'>Participate</p>" +
      "<h2>Express farmer interest</h2>" +
      "<p>If you farm in West Bengal and want to be considered when a real intake exists, leave a name. This is not enrolment and not a promise of ₹1 lakh. The participation mechanism beyond this note is to be confirmed.</p>" +
      "<form class='campaign-form' id='eco-farmer-form' novalidate>" +
      "<div class='form-grid'>" +
      "<label>Name <input name='name' required autocomplete='name'></label>" +
      "<label>Locality / village / area <input name='locality' required></label>" +
      "<label>District (if you know it) <input name='district'></label>" +
      "</div>" +
      "<label>Anything you want us to know <textarea name='message' rows='4'></textarea></label>" +
      "<input type='hidden' name='role' value='farmer'>" +
      "<label class='consent-row'><input type='checkbox' name='consent' required> This website does not submit your details to BKS. The information is downloaded as a file to your device. If you choose to send that file, subsequent handling is outside this website.</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>Express farmer interest</button></div>" +
      "<p class='muted'>" + escapeHtml(shared.noPayment) + "</p>" +
      "<p class='muted' id='eco-farmer-status'></p></form></section>"
    );
  }

  function renderNrbForm(shared) {
    return (
      "<section class='eco-section' id='contribute'>" +
      "<p class='eco-kicker'>Participate</p>" +
      "<h2>Express supporter interest</h2>" +
      "<p>₹1 lakh is the proposed seed-support figure for one village farm, or ₹20,000 every two months. That is a mobilisation concept, not money collected on this page. This form does not take payment.</p>" +
      "<form class='campaign-form' id='eco-nrb-form' novalidate>" +
      "<div class='form-grid'>" +
      "<label>Your name <input name='name' required autocomplete='name'></label>" +
      "<label>Email <input name='email' type='email' required autocomplete='email'></label>" +
      "<label>Phone <input name='phone' required autocomplete='tel'></label>" +
      "<label>Native village / para <input name='native_village' required></label>" +
      "<label>Where you live now <input name='lives_now'></label>" +
      "</div>" +
      "<label class='consent-row'><input type='checkbox' name='consent' required> This website does not submit your details to BKS. The information is downloaded as a file to your device. If you choose to send that file, subsequent handling is outside this website.</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>Express supporter interest</button></div>" +
      "<p class='muted'>" + escapeHtml(shared.noPayment) + "</p>" +
      "<p class='muted' id='eco-nrb-status'></p></form></section>"
    );
  }

  function renderBriefingForm(shared) {
    return (
      "<section class='eco-section' id='connect'>" +
      "<p class='eco-kicker'>Connect</p>" +
      "<h2>Request a briefing</h2>" +
      "<p>For institutional readers. No ministry, scheme, or political party is named as a partner on this page. You may also write to <a href='mailto:" + escapeHtml(shared.contactEmail) + "'>" +
      escapeHtml(shared.contactEmail) + "</a> or call " + escapeHtml(shared.contactPhone) + ".</p>" +
      "<form class='campaign-form' id='eco-briefing-form' novalidate>" +
      "<div class='form-grid'>" +
      "<label>Name <input name='name' required autocomplete='name'></label>" +
      "<label>Organisation / office <input name='organisation' required></label>" +
      "<label>Role <input name='role'></label>" +
      "<label>Email <input name='email' type='email' autocomplete='email'></label>" +
      "<label>Phone <input name='phone' autocomplete='tel'></label>" +
      "</div>" +
      "<label>What you want briefed <textarea name='message' rows='4'></textarea></label>" +
      "<label class='consent-row'><input type='checkbox' name='consent' required> This website does not submit your details to BKS. The information is downloaded as a file to your device. If you choose to send that file, subsequent handling is outside this website.</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>Request a briefing</button></div>" +
      "<p class='muted'>" + escapeHtml(shared.noPayment) + "</p>" +
      "<p class='muted' id='eco-briefing-status'></p></form></section>"
    );
  }

  function renderPaths(exp) {
    const cards = (exp.paths || []).map(function (p) {
      return (
        "<a class='eco-path' href='" + escapeHtml(p.href) + "'>" +
        "<p class='eco-kicker'>" + escapeHtml(p.kicker) + "</p>" +
        "<h2>" + escapeHtml(p.title) + "</h2>" +
        "<p>" + escapeHtml(p.body) + "</p></a>"
      );
    }).join("");
    return "<section class='eco-section' id='paths'><div class='eco-paths'>" + cards + "</div></section>";
  }

  function renderFooter(shared, base, expId, lang) {
    const note = expId === "sponsors" ? shared.footerNoteSponsor : shared.footerNote;
    const langNote = lang && lang !== "en" ? shared.pendingLang : "";
    return (
      "<footer class='site-footer'><div class='wrap-wide footer-grid'>" +
      "<div><p>" + escapeHtml(note) + "</p>" +
      "<address class='footer-address'>" + escapeHtml(shared.address) + "</address></div>" +
      "<nav class='footer-nav' aria-label='Utility'>" +
      "<a href='https://bks-durga-puja-2026.vercel.app/'>" + escapeHtml(shared.backToMain || "Back to Bharatiya Krishak Samaj Pujo") + "</a>" +
      "<a href='https://bks-durga-puja-2026.vercel.app/#doors'>How would you like to participate?</a>" +
      "<a href='https://bks-durga-puja-2026.vercel.app/#programme'>Programme</a>" +
      "<a href='https://bks-durga-puja-2026.vercel.app/#contact'>Contact</a>" +
      "<a href='mailto:" + escapeHtml(shared.contactEmail) + "'>" + escapeHtml(shared.contactEmail) + "</a>" +
      "</nav>" +
      (langNote ? "<p class='muted'>" + escapeHtml(langNote) + "</p>" : "") +
      "</div></footer>"
    );
  }

  function extraFor(id, data) {
    const s = data.shared;
    const exp = data.experiences[id] || {};
    if (id === "sponsors") {
      return renderTransformation(data, "Why a sponsor should care: the place itself is the continuing story.") +
        renderPartner(s) +
        renderSponsorForm(s) +
        renderFaq(exp, s);
    }
    if (id === "farmers") {
      return renderTransformation(data, "Why a farmer should care: this is the model made visible.") +
        renderFarmerForm(s) +
        renderFaq(exp, s);
    }
    if (id === "stakeholders") {
      return renderFarmtech(data) +
        renderTransformation(data, "Why an institution should care: execution you can eventually inspect.") +
        renderBriefingForm(s) +
        renderFaq(exp, s);
    }
    if (id === "nrb") {
      return renderTransformation(data, "Why an NRB should care: a farm you can follow from afar.") +
        renderNrbForm(s) +
        renderFaq(exp, s);
    }
    if (id === "umbrella") return renderPaths(data.experiences.umbrella);
    if (id === "public") {
      return "<section class='eco-section' id='holding'><p class='eco-kicker'>The Puja</p>" +
        "<h2>Programme, theme, awards and visit notes live on the main Puja pages.</h2>" +
        "<p>Details that are not yet confirmed — venue, committee, ritual clocks — remain to be announced. This page does not invent them.</p>" +
        "<p><a href='../index.html#puja'>The Puja</a> · <a href='../index.html#visit'>Visit</a> · <a href='../index.html#awards'>Awards</a> · <a href='../index.html#programme'>Programme</a></p></section>" +
        renderFaq(exp, s);
    }
    return "";
  }

  function mount(data) {
    const root = document.getElementById("eco-root");
    const id = document.documentElement.getAttribute("data-experience");
    const base = document.documentElement.getAttribute("data-base") || "..";
    const exp = data.experiences[id];
    if (!root || !exp) return;
    const lang = qsLang();
    setLang(lang);
    document.title = exp.documentTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && exp.metaDescription) desc.setAttribute("content", exp.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", exp.documentTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && exp.metaDescription) ogDesc.setAttribute("content", exp.metaDescription);
    const body = id === "farmers"
      ? (
        renderSections(exp, ["why-ifs", "farmer", "model"]) +
        renderLoop(data) +
        renderFarmtech(data) +
        renderSections(exp, ["demo", "scale"]) +
        extraFor(id, data)
      )
      : (renderSections(exp) + extraFor(id, data));
    root.innerHTML =
      renderHeader(data, exp, base, lang) +
      "<main id='main'>" +
      renderHero(exp, data.shared) +
      "<div class='eco-main'>" +
      body +
      "</div></main>" +
      renderFooter(data.shared, base, id, lang);

    const sel = document.getElementById("eco-lang");
    if (sel) {
      sel.addEventListener("change", function () {
        setLang(sel.value);
        mount(data);
      });
    }
    const toggle = document.getElementById("eco-nav-toggle");
    const drawer = document.getElementById("eco-drawer");
    const backdrop = document.getElementById("eco-backdrop");
    const closeBtn = document.getElementById("eco-nav-close");
    function closeMenu() {
      if (!drawer || !toggle) return;
      drawer.setAttribute("hidden", "");
      if (backdrop) backdrop.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
    function openMenu() {
      if (!drawer || !toggle) return;
      drawer.removeAttribute("hidden");
      if (backdrop) backdrop.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    }
    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        if (drawer.hasAttribute("hidden")) openMenu();
        else closeMenu();
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);
    if (drawer) {
      drawer.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
    }
    bindDownload("eco-sponsor-form", "bks-pujo-sponsor-enquiry.json", "eco-sponsor-status", "sponsors");
    bindDownload("eco-farmer-form", "bks-pujo-farmer-interest.json", "eco-farmer-status", "farmers");
    bindDownload("eco-nrb-form", "bks-pujo-nrb-interest.json", "eco-nrb-status", "nrb");
    bindDownload("eco-briefing-form", "bks-pujo-briefing-request.json", "eco-briefing-status", "stakeholders");
  }

  function boot() {
    const base = document.documentElement.getAttribute("data-base") || "..";
    fetch(base + "/data/content/ecosystem.json?v=eco5")
      .then(function (res) {
        if (!res.ok) throw new Error("ecosystem json");
        return res.json();
      })
      .then(mount)
      .catch(function () {
        const root = document.getElementById("eco-root");
        if (root) {
          root.innerHTML = "<main class='wrap'><p>This experience could not load its copy file. Open via the local server, not as a raw file.</p></main>";
        }
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
