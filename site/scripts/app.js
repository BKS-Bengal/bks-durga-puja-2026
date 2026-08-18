/* Offline static site — no framework. Progressive enhancement. */
(function () {
  const LANGS = ["en", "bn", "hi"];
  const DATA_BASE = "data/";
  const BUNDLE = window.BKS_DATA || null;
  const root = document.documentElement;
  const views = document.querySelectorAll("[data-view]");
  const toggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("nav-drawer");
  const backdrop = document.getElementById("nav-backdrop");
  const closeBtn = document.getElementById("nav-close");
  const NRB_DISTRICTS = [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
    "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman",
    "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
  ];
  const HOME_SECTIONS = ["nrb", "sambhavana", "about", "demo", "model", "fund", "sponsor", "village", "faq", "theme", "awards", "record", "nominate", "visit", "press", "ifs-tease"];
  const state = {
    lang: "en",
    heroId: "H1",
    ui: {},
    heroes: {},
    home: {},
    krishak: {},
    ifs: {},
    mission: {},
    participate: {},
    locator: {},
    sources: {},
    nrb: {},
    events: null,
    stories: null,
    navSpec: null,
    campaign: null,
    lastFocus: null
  };

  function pageFromHash() {
    const hash = (location.hash || "#home").replace("#", "");
    return hash.split("/")[0] || "home";
  }

  function t(obj, lang) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  }

  function applyLangStrings(lang) {
    document.querySelectorAll("[data-en], [data-bn], [data-hi]").forEach((el) => {
      if (el.closest("[data-hero-dynamic]")) return;
      if (el.closest("[data-json-root]")) return;
      const text = el.getAttribute("data-" + lang) || el.getAttribute("data-en");
      if (text !== null) el.textContent = text;
    });
  }

  function setUrlLang(lang) {
    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) { /* ignore */ }
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "en";
    state.lang = lang;
    root.lang = lang;
    root.dataset.lang = lang;
    applyLangStrings(lang);
    applyHero();
    renderHome();
    renderKrishak();
    renderIfs();
    renderMission();
    renderParticipate();
    renderLocator();
    renderSources();
    renderEvents();
    renderStories();
    applyUi();
    renderNav();
    renderCampaign();
    renderNrb();
    updateMeta();
    setUrlLang(lang);
    const ui = state.ui[lang];
    if (live && ui && ui.languageLive) live.textContent = ui.languageLive[lang] || ui.languageLive.en;
    try { localStorage.setItem("bks-puja-lang", lang); } catch (e) { /* ignore */ }
  }

  function navLinks() {
    return document.querySelectorAll("#nav-desktop a, #nav-drawer-list a, .footer-nav a");
  }

  function getByPath(obj, path) {
    return (path || []).reduce((acc, key) => (acc && acc[key] != null ? acc[key] : ""), obj);
  }

  function closeMenu() {
    if (!drawer || !toggle) return;
    const wasOpen = !drawer.hasAttribute("hidden");
    drawer.setAttribute("hidden", "");
    if (backdrop) backdrop.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    if (document.getElementById("main")) document.getElementById("main").inert = false;
    const footer = document.querySelector(".site-footer");
    if (footer) footer.inert = false;
    if (wasOpen && state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
  }

  function openMenu() {
    if (!drawer || !toggle) return;
    state.lastFocus = document.activeElement;
    drawer.removeAttribute("hidden");
    if (backdrop) backdrop.removeAttribute("hidden");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    const main = document.getElementById("main");
    if (main) main.inert = true;
    const footer = document.querySelector(".site-footer");
    if (footer) footer.inert = true;
    const first = drawer.querySelector("button, a, [tabindex]:not([tabindex='-1'])");
    if (first) first.focus();
  }

  function trapFocus(e) {
    if (!drawer || drawer.hasAttribute("hidden") || e.key !== "Tab") return;
    const nodes = Array.from(drawer.querySelectorAll("a, button, [href], input, select, textarea")).filter((el) => !el.disabled && el.offsetParent !== null);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const LANG_NATIVE = { en: "English", bn: "বাংলা", hi: "हिन्दी" };

  function renderLangBars() {
    const ui = state.ui[state.lang];
    const spec = state.navSpec;
    if (!ui || !spec) return;
    const groupLabel = ui.languageGroup || "Language";
    const bar = document.getElementById("lang-header");
    if (!bar) return;
    const options = spec.languages.map((item) => {
      const name = LANG_NATIVE[item.id] || getByPath(ui, item.namePath) || item.id;
      const selected = item.id === state.lang ? " selected" : "";
      return "<option value='" + item.id + "'" + selected + ">" + name + "</option>";
    }).join("");
    bar.innerHTML =
      "<label class='lang-select-wrap'>" +
      "<span class='sr-only'>" + groupLabel + "</span>" +
      "<select class='lang-select' id='lang-select'>" + options + "</select>" +
      "</label>";
    const sel = bar.querySelector("select");
    if (sel) sel.addEventListener("change", () => setLang(sel.value));
  }

  function renderNav() {
    const ui = state.ui[state.lang];
    const spec = state.navSpec;
    if (!ui || !spec) return;
    const desktop = document.getElementById("nav-desktop");
    const drawerList = document.getElementById("nav-drawer-list");
    function links(filterDesktop) {
      return spec.items
        .filter((item) => (filterDesktop ? item.desktop : true))
        .map((item) => {
          const label = getByPath(ui, item.labelPath) || item.id;
          return "<a href='" + item.href + "'>" + label + "</a>";
        }).join("");
    }
    if (desktop) desktop.innerHTML = links(true);
    if (drawerList) {
      drawerList.innerHTML = links(false);
      drawerList.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    }
    renderLangBars();
    markCurrent(pageFromHash());
  }

  function renderCampaign() {
    if (window.BksCampaign && state.campaign) {
      window.BksCampaign.render(state.campaign, state.lang);
    }
  }

  function nrbPack() {
    return (state.nrb && (state.nrb[state.lang] || state.nrb.en)) || null;
  }

  function nrbFormPayload(form, kind) {
    const data = {};
    new FormData(form).forEach((value, key) => { data[key] = value; });
    data.kind = kind;
    data.stored = false;
    data.production = false;
    data.gateway = "not_connected";
    data.amount_raised = 0;
    data.farms_pledged = 0;
    data.createdAt = new Date().toISOString();
    data.note = "Downloaded locally from BKS Durga Puja 2026. Not submitted to a server. No payment taken.";
    return data;
  }

  function downloadNrbJson(filename, payload) {
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

  function bindNrbForms() {
    const nrb = nrbPack() || {};
    const fund = nrb.fund || {};
    const bulk = nrb.bulk || {};
    const operator = nrb.operator || {};

    const pledge = document.getElementById("nrb-pledge-form");
    if (pledge) {
      pledge.addEventListener("submit", (e) => {
        e.preventDefault();
        downloadNrbJson("bks-nrb-farm-pledge.json", nrbFormPayload(pledge, "nrb_pledge"));
        const status = document.getElementById("nrb-pledge-status");
        if (status) status.textContent = fund.status || "No payment is taken here.";
      });
    }

    const bulkForm = document.getElementById("nrb-bulk-form");
    if (bulkForm) {
      bulkForm.addEventListener("submit", (e) => {
        e.preventDefault();
        downloadNrbJson("bks-nrb-bulk-interest.json", nrbFormPayload(bulkForm, "nrb_bulk"));
        const status = document.getElementById("nrb-bulk-status");
        if (status) status.textContent = bulk.status || "Allocation will be done by BKS, not by this website.";
      });
      document.querySelectorAll("[data-nrb-tier]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const count = btn.getAttribute("data-nrb-tier");
          const field = bulkForm.querySelector('[name="farm_count"]');
          if (field) field.value = count;
        });
      });
    }

    const village = document.getElementById("nrb-village-form");
    if (village) {
      village.addEventListener("submit", (e) => {
        e.preventDefault();
        downloadNrbJson("bks-nrb-village-interest.json", nrbFormPayload(village, "nrb_village"));
        const status = document.getElementById("nrb-village-status");
        const copy = (nrb.village || {}).status;
        if (status) status.textContent = copy || "Not matched to a live farm list.";
      });
    }

    const opForm = document.getElementById("nrb-operator-form");
    if (opForm) {
      opForm.addEventListener("submit", (e) => {
        e.preventDefault();
        downloadNrbJson("bks-nrb-operator-demo.json", nrbFormPayload(opForm, "nrb_operator_demo"));
        const status = document.getElementById("nrb-operator-status");
        if (status) status.textContent = operator.status || "Not posted to a public feed.";
      });
    }
  }

  function renderNrb() {
    const root = document.getElementById("nrb-root");
    const nrb = nrbPack();
    if (!root || !nrb) return;
    const who = nrb.who || {};
    const opportunity = nrb.opportunity || {};
    const about = nrb.about || {};
    const model = nrb.model || {};
    const village = nrb.village || {};
    const faq = nrb.faq || {};
    const photos = nrb.photos || {};
    const demo = nrb.demo || {};
    const fund = nrb.fund || {};
    const bulk = nrb.bulk || {};
    const operator = nrb.operator || {};

    const facts = (demo.facts || []).map((row) =>
      "<div><dt>" + escapeHtml(row.label) + "</dt><dd>" + escapeHtml(row.value) + "</dd></div>"
    ).join("");

    const steps = (fund.steps || []).map((label, i) =>
      "<li><span class='nrb-step-num'>" + String(i + 1) + "</span><span>" + escapeHtml(label) + "</span></li>"
    ).join("");

    const tiers = (bulk.tiers || []).map((tier) =>
      "<button type='button' class='nrb-tier' data-nrb-tier='" + escapeHtml(tier.count || "5") + "'>" +
      "<p class='kicker'>" + escapeHtml(tier.note) + "</p><h3>" + escapeHtml(tier.name) + "</h3>" +
      "<p class='stat-value'>" + escapeHtml(tier.amount) + "</p></button>"
    ).join("");

    const pujaOpts = (bulk.pujaOptions || []).map((opt) =>
      '<option value="' + escapeHtml(opt.id) + '">' + escapeHtml(opt.label) + "</option>"
    ).join("");

    const updateOpts = (operator.types || []).map((opt) =>
      '<option value="' + escapeHtml(opt.id) + '">' + escapeHtml(opt.label) + "</option>"
    ).join("");

    const modelPoints = (model.points || []).map((item) =>
      "<article class='ifs-need-card'><h3>" + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.body) + "</p></article>"
    ).join("");

    const faqItems = (faq.items || []).map((item) =>
      "<details class='nrb-faq'><summary>" + escapeHtml(item.q) + "</summary><p>" + escapeHtml(item.a) + "</p></details>"
    ).join("");

    const districtOpts = ['<option value="">' + escapeHtml(village.fieldDistrict || "District") + "</option>"]
      .concat(NRB_DISTRICTS.map((name) => '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + "</option>"))
      .join("");

    function photoFigure(src, alt, cap, extraClass) {
      if (!src) return "";
      return "<figure class='nrb-photo " + (extraClass || "") + "'><img src='" + escapeHtml(src) +
        "' alt='" + escapeHtml(alt) + "' width='1600' height='1067'>" +
        (cap ? "<figcaption>" + escapeHtml(cap) + "</figcaption>" : "") + "</figure>";
    }

    const ifs = state.ifs[state.lang] || {};
    const tease = ((state.home[state.lang] || {}).ifsTease) || {};
    const ifsBody = (ifs.what && ifs.what.body) || ifs.lede || "";

    const htmlFund =
      "<section class='campaign-section nrb-fund-stage' id='fund'>" +
      "<div class='nrb-split nrb-split--fest'>" +
      "<div><p class='kicker'>" + escapeHtml(fund.eyebrow) + "</p><h2>" + escapeHtml(fund.title) + "</h2>" +
      "<p>" + escapeHtml(fund.lede) + "</p>" +
      "<div class='nrb-who'><h3>" + escapeHtml(fund.whoLabel) + "</h3><p>" + escapeHtml(fund.whoBody) + "</p></div>" +
      "<div class='nrb-instalments'><p class='kicker'>" + escapeHtml(fund.modelEyebrow) + "</p>" +
      "<h3>" + escapeHtml(fund.modelTitle) + "</h3><ol class='nrb-steps'>" + steps + "</ol>" +
      "<p class='muted'>" + escapeHtml(fund.modelNote) + "</p></div></div>" +
      photoFigure(photos.fundSrc, photos.fundAlt, photos.fundCap, "nrb-photo--tall") +
      "</div>" +
      "<form class='campaign-form campaign-form--fest' id='nrb-pledge-form' novalidate><h3>" + escapeHtml(fund.formTitle) + "</h3>" +
      "<div class='form-grid'><label>" + escapeHtml(fund.fieldName) +
      "<input name='name' required></label><label>" + escapeHtml(fund.fieldEmail) +
      "<input name='email' type='email' required></label><label>" + escapeHtml(fund.fieldPhone) +
      "<input name='phone' required></label><label>" + escapeHtml(fund.fieldVillage) +
      "<input name='native_village' required></label><label>" + escapeHtml(fund.fieldLocation) +
      "<input name='lives_now'></label><label>" + escapeHtml(fund.fieldType) +
      "<select name='donor_type'><option value='individual'>" + escapeHtml(fund.typeIndividual) +
      "</option><option value='bulk'>" + escapeHtml(fund.typeBulk) +
      "</option></select></label></div>" +
      "<label class='consent-row'><input type='checkbox' name='consent' required> " +
      escapeHtml(fund.consent) + "</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>" + escapeHtml(fund.submit) +
      "</button></div><p class='muted'>" +
      escapeHtml(fund.status) + "</p>" +
      "<p class='muted' id='nrb-pledge-status'></p></form></section>";

    root.innerHTML =
      "<section class='campaign-section' id='about'>" +
      "<div class='nrb-split'><div><p class='kicker'>" + escapeHtml(about.eyebrow) + "</p><h2>" +
      escapeHtml(about.title) + "</h2><p>" + escapeHtml(about.lede) + "</p>" +
      "<div class='nrb-who'><p>" + escapeHtml(about.mandate) + "</p></div></div>" +
      (photos.aboutSrc ? "<figure class='nrb-photo nrb-photo--portrait'><img src='" +
        escapeHtml(photos.aboutSrc) + "' alt='" + escapeHtml(photos.aboutAlt) +
        "' width='640' height='800'></figure>" : "") +
      "</div></section>" +

      "<section class='campaign-section nrb-sambhavana' id='sambhavana'>" +
      "<p class='kicker'>" + escapeHtml(opportunity.eyebrow) + "</p><h2>" + escapeHtml(opportunity.title) + "</h2>" +
      "<p>" + escapeHtml(opportunity.lede) + "</p></section>" +

      "<section class='campaign-section nrb-story' id='nrb'>" +
      "<div class='nrb-split nrb-split--reverse'>" +
      photoFigure(photos.whoSrc, photos.whoAlt, photos.whoCap, "nrb-photo--portrait") +
      "<div><p class='kicker'>" + escapeHtml(who.eyebrow) + "</p><h2>" + escapeHtml(who.title) + "</h2>" +
      "<p>" + escapeHtml(who.lede) + "</p></div></div></section>" +

      "<section class='campaign-section nrb-ifs-tease' id='ifs-tease'>" +
      "<div class='nrb-split'><div><p class='kicker'>" + escapeHtml(tease.eyebrow || ifs.kicker) +
      "</p><h2>" + escapeHtml(ifs.h1 || "") + "</h2><p>" + escapeHtml(ifsBody) + "</p>" +
      "<p class='cta-row'><a class='btn btn-primary' href='#ifs'>" +
      escapeHtml(tease.cta || "") + "</a></p></div>" +
      photoFigure(photos.fundSrc, photos.fundAlt, ifs.photoCap || photos.fundCap, "") +
      "</div></section>" +

      "<section class='campaign-section nrb-demo' id='demo'>" +
      "<div class='nrb-demo-head'><div><p class='kicker'>" + escapeHtml(demo.eyebrow) + "</p>" +
      "<h2>" + escapeHtml(demo.title) + "</h2><p>" + escapeHtml(demo.lede) + "</p></div>" +
      "<p class='nrb-status'><span class='badge badge-pending'>" + escapeHtml(demo.statusBadge) +
      "</span><span>" + escapeHtml(demo.statusNote) + "</span></p></div>" +
      photoFigure(photos.demoSrc, photos.demoAlt, photos.demoCap, "nrb-photo--wide") +
      "<dl class='facts nrb-facts'>" + facts + "</dl>" +
      "<div class='nrb-feed' aria-live='polite'><p class='kicker'>" + escapeHtml(demo.feedEyebrow) + "</p>" +
      "<h3>" + escapeHtml(demo.feedTitle) + "</h3>" +
      "<div class='nrb-feed-frame'>" +
      "<svg class='nrb-feed-schematic' viewBox='0 0 320 120' aria-hidden='true' focusable='false'>" +
      "<rect x='8' y='18' width='304' height='84' rx='6' fill='#eef4ea' stroke='#163a26' stroke-width='1.4'/>" +
      "<ellipse cx='108' cy='62' rx='58' ry='28' fill='#143d4a'/>" +
      "<ellipse cx='108' cy='62' rx='40' ry='16' fill='#1f6a6a' opacity='0.55'/>" +
      "<path d='M54 42 C70 28 146 28 162 42' fill='none' stroke='#4a3424' stroke-width='3'/>" +
      "<path d='M168 38 l8 -16 m0 16 l8 -14 m0 14 l6 -12' stroke='#163a26' stroke-width='2' fill='none'/>" +
      "<path d='M196 70 h96' stroke='#c45c32' stroke-width='2'/>" +
      "<path d='M208 70 v-18 m24 18 v-22 m24 22 v-14 m24 14 v-20' stroke='#163a26' stroke-width='2'/>" +
      "<circle cx='52' cy='86' r='4' fill='#8f2d1e'/>" +
      "<circle cx='268' cy='38' r='4' fill='#c98a1f'/>" +
      "</svg>" +
      "<p class='nrb-feed-empty'>" + escapeHtml(demo.feedEmpty) + "</p></div></div>" +
      "<div class='nrb-operator'><p class='kicker'>" + escapeHtml(operator.eyebrow) + "</p>" +
      "<h3>" + escapeHtml(operator.title) + "</h3><p>" + escapeHtml(operator.lede) + "</p>" +
      "<form class='campaign-form' id='nrb-operator-form' novalidate>" +
      "<div class='form-grid'><label>" + escapeHtml(operator.fieldKind) +
      "<select name='kind'><option value='register'>" + escapeHtml(operator.kindRegister) +
      "</option><option value='update'>" + escapeHtml(operator.kindUpdate) +
      "</option></select></label><label>" + escapeHtml(operator.fieldOperator) +
      "<input name='operator_name' required></label><label>" + escapeHtml(operator.fieldContact) +
      "<input name='contact' required></label><label>" + escapeHtml(operator.fieldUpdateType) +
      "<select name='update_type'>" + updateOpts + "</select></label></div>" +
      "<label>" + escapeHtml(operator.fieldNote) + "<textarea name='note' rows='3'></textarea></label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>" + escapeHtml(operator.submit) +
      "</button></div><p class='muted' id='nrb-operator-status'>" + escapeHtml(operator.status) +
      "</p></form></div></section>" +

      "<section class='campaign-section' id='model'>" +
      "<p class='kicker'>" + escapeHtml(model.eyebrow) + "</p><h2>" + escapeHtml(model.title) + "</h2>" +
      "<p>" + escapeHtml(model.lede) + "</p>" +
      "<div class='ifs-need-grid'>" + modelPoints + "</div>" +
      "<p class='cta-row'><a class='btn btn-secondary' href='#ifs'>" + escapeHtml((state.ui[state.lang] && state.ui[state.lang].nav && state.ui[state.lang].nav.integratedFarming) || "Integrated Farming") + "</a></p></section>" +

      htmlFund +

      "<section class='campaign-section' id='sponsor'>" +
      "<p class='kicker'>" + escapeHtml(bulk.eyebrow) + "</p><h2>" + escapeHtml(bulk.title) + "</h2>" +
      "<p>" + escapeHtml(bulk.lede) + "</p>" +
      "<div class='nrb-tier-grid'>" + tiers + "</div>" +
      "<form class='campaign-form' id='nrb-bulk-form' novalidate><h3>" + escapeHtml(bulk.formTitle) + "</h3>" +
      "<div class='form-grid'><label>" + escapeHtml(fund.fieldName) +
      "<input name='name' required></label><label>" + escapeHtml(fund.fieldEmail) +
      "<input name='email' type='email' required></label><label>" + escapeHtml(fund.fieldPhone) +
      "<input name='phone' required></label><label>" + escapeHtml(bulk.fieldCount) +
      "<input name='farm_count' type='number' min='1' step='1' placeholder='5'></label>" +
      "<label>" + escapeHtml(bulk.pujaLabel) + "<select name='puja_tag'>" + pujaOpts +
      "</select></label></div>" +
      "<label class='consent-row'><input type='checkbox' name='consent' required> " +
      escapeHtml(fund.consent) + "</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>" + escapeHtml(bulk.submit) +
      "</button></div><p class='muted'>" +
      escapeHtml(bulk.status) + "</p>" +
      "<p class='muted' id='nrb-bulk-status'></p></form>" +
      "<p class='muted'><a href='#sponsor-puja'>" + escapeHtml(bulk.pujaLink || "") + "</a></p>" +
      "</section>" +

      "<section class='campaign-section' id='village'>" +
      "<p class='kicker'>" + escapeHtml(village.eyebrow) + "</p><h2>" + escapeHtml(village.title) + "</h2>" +
      "<p>" + escapeHtml(village.lede) + "</p>" +
      "<form class='campaign-form' id='nrb-village-form' novalidate>" +
      "<div class='form-grid'><label>" + escapeHtml(village.fieldDistrict) +
      "<select name='district' required>" + districtOpts + "</select></label>" +
      "<label>" + escapeHtml(village.fieldBlock) +
      "<input name='block_village' required></label></div>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>" + escapeHtml(village.submit) +
      "</button></div><p class='muted'>" +
      escapeHtml(village.status) + "</p>" +
      "<p class='muted' id='nrb-village-status'></p></form></section>" +

      "<section class='campaign-section' id='faq'>" +
      "<p class='kicker'>" + escapeHtml(faq.eyebrow) + "</p><h2>" + escapeHtml(faq.title) + "</h2>" +
      faqItems + "</section>";

    bindNrbForms();
  }

  function markCurrent(page) {
    navLinks().forEach((link) => {
      const href = link.getAttribute("href") || "";
      const on = href === "#" + page || (page === "home" && href === "#home");
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function show(page) {
    const homeSection = HOME_SECTIONS.indexOf(page) !== -1;
    const viewPage = homeSection ? "home" : page;
    views.forEach((view) => {
      const on = view.dataset.view === viewPage;
      view.classList.toggle("is-active", on);
      view.hidden = !on;
    });
    markCurrent(page);
    closeMenu();
    if (homeSection) {
      const target = document.getElementById(page);
      if (target) {
        window.setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
        return;
      }
    }
    window.scrollTo(0, 0);
  }

  function currentHero() {
    const pack = state.heroes[state.lang];
    if (!pack || !pack.variants) return null;
    return pack.variants.find((h) => h.id === state.heroId) || pack.variants[0];
  }

  function applyUi() {
    const ui = state.ui[state.lang];
    if (!ui) return;
    const map = {
      skip: ui.skip,
      banner: ui.banner,
      menu: ui.menu,
      menuClose: ui.menuClose,
      languageGroup: ui.languageGroup,
      wordmark: ui.brand && ui.brand.parent,
      site: ui.brand && ui.brand.site,
      brandSub: ui.brand && ui.brand.brandSub,
      chip: ui.brand && ui.brand.seasonal,
      "nav-home": ui.nav && ui.nav.home,
      "nav-puja": ui.nav && ui.nav.thePuja,
      "nav-krishak": ui.nav && ui.nav.krishakSamaj,
      "nav-ifs": ui.nav && ui.nav.integratedFarming,
      "nav-mission": ui.nav && ui.nav.mission,
      "nav-participate": ui.nav && ui.nav.participate,
      "util-programme": ui.utility && ui.utility.programme,
      "util-stories": ui.utility && ui.utility.stories,
      "util-contact": ui.utility && ui.utility.contact,
      "util-access": ui.utility && ui.utility.accessibility,
      "util-care": ui.utility && ui.utility.sustainability,
      "footer-hierarchy": ui.footer && ui.footer.hierarchy,
      "draft-note": ui.draftNote
    };
    Object.keys(map).forEach((key) => {
      if (!map[key]) return;
      document.querySelectorAll("[data-ui='" + key + "']").forEach((el) => {
        el.textContent = map[key];
      });
    });
  }

  function applyHero() {
    const hero = currentHero();
    if (!hero) return;
    const map = {
      kicker: hero.kicker,
      title: hero.title,
      lede: hero.lede,
      who: hero.who,
      what: hero.what,
      when: hero.when,
      where: hero.where,
      why: hero.why,
      next: hero.next,
      ctaPrimary: hero.ctaPrimary,
      ctaSecondary: hero.ctaSecondary
    };
    Object.keys(map).forEach((key) => {
      document.querySelectorAll("[data-hero='" + key + "']").forEach((el) => {
        el.textContent = map[key];
      });
    });
    const primary = document.querySelector("[data-hero-cta='primary']");
    const secondary = document.querySelector("[data-hero-cta='secondary']");
    if (primary && hero.ctaPrimaryHref) primary.setAttribute("href", hero.ctaPrimaryHref);
    if (secondary && hero.ctaSecondaryHref) secondary.setAttribute("href", hero.ctaSecondaryHref);
    const home = state.home[state.lang];
    if (home) {
      document.querySelectorAll("[data-home='slot']").forEach((el) => { el.textContent = home.slotLabel; });
      document.querySelectorAll("[data-home='slotCaption']").forEach((el) => { el.textContent = home.slotCaption; });
      document.querySelectorAll("[data-home='heroStatus']").forEach((el) => { el.textContent = home.heroStatus; });
    }
  }

  function renderHome() {
    const home = state.home[state.lang];
    const arc = document.getElementById("story-arc");
    if (!home || !arc || !home.storyArc) return;
    const heading = home.storyArc.h2;
    const lede = home.storyArc.lede;
    const steps = home.storyArc.steps.map((step, i) =>
      "<li class='story-path-item'>" +
      "<a href='" + step.href + "'>" +
      "<span class='story-path-num' aria-hidden='true'>" + String(i + 1) + "</span>" +
      "<span class='story-path-copy'><p class='kicker'>" + step.kicker + "</p>" +
      "<h3>" + step.title + "</h3><p>" + step.body + "</p></span></a></li>"
    ).join("");
    arc.innerHTML =
      "<div class='wrap-wide story-path-inner'>" +
      "<h2>" + heading + "</h2>" +
      "<p class='muted'>" + lede + "</p>" +
      "<ol class='story-path'>" + steps + "</ol></div>";
    const exploreHead = document.getElementById("explore-copy");
    if (exploreHead && home.explore) {
      exploreHead.innerHTML = "<h2 id='explore-heading'>" + home.explore.h2 + "</h2><p class='muted'>" + home.explore.lede + "</p>";
    }
  }

  function renderKrishak() {
    const page = state.krishak[state.lang];
    const rootEl = document.getElementById("krishak-body");
    if (!page || !rootEl) return;
    const themes = (page.themes || []).map((card) =>
      "<article class='theme-card'><span class='badge badge-research'>" + card.badge + "</span><h3>" + card.title + "</h3><p>" + card.body + "</p></article>"
    ).join("");
    rootEl.innerHTML =
      "<header class='page-head'><p class='kicker'>" + page.kicker + "</p><h1>" + page.h1 + "</h1><p class='lede'>" + page.lede + "</p></header>" +
      "<hr class='rule'>" +
      "<p class='legend'>" + page.legend + "</p>" +
      "<p class='native-draft' data-ui='draft-note'></p>" +
      "<section class='layer layer--position'><h2>" + page.why.h2 + "</h2><p><span class='badge badge-proposed'>" + page.why.badge + "</span> " + page.why.body + "</p></section>" +
      "<section class='layer layer--position'><h2>" + page.farmer.h2 + "</h2><p><span class='badge badge-proposed'>" + page.farmer.badge + "</span> " + page.farmer.body + "</p></section>" +
      "<section class='layer layer--fact'><h2>" + page.ecosystem.h2 + "</h2><p><span class='badge badge-research'>" + page.ecosystem.badge + "</span> " + page.ecosystem.body + "</p><p class='card-foot'><a class='btn btn-primary' href='" + page.ecosystem.href + "'>" + page.ecosystem.cta + "</a></p></section>" +
      "<div class='theme-grid'>" + themes + "</div>";
  }

  function renderIfs() {
    const page = state.ifs[state.lang];
    const rootEl = document.getElementById("ifs-body");
    if (!page || !rootEl) return;
    const contrast = (page.what.contrast || []).map((card) =>
      "<article class='ifs-contrast-card ifs-contrast-card--" + escapeHtml(card.id) + "'><h3>" +
      escapeHtml(card.title) + "</h3><p>" + escapeHtml(card.body) + "</p></article>"
    ).join("");
    const need = (page.need.items || []).map((item) =>
      "<article class='ifs-need-card'><h3>" + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.body) + "</p></article>"
    ).join("");
    const pillars = (page.pillars.items || []).map((item) =>
      "<article class='ifs-pillar' data-pillar='" + escapeHtml(item.id) + "'>" +
      "<span class='ifs-pillar-letter'>" + escapeHtml(item.letter) + "</span>" +
      "<h3>" + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.body) + "</p></article>"
    ).join("");
    const loops = (page.loops.items || []).map((item) =>
      "<li class='ifs-loop'><span>" + escapeHtml(item.from) + "</span>" +
      "<span class='ifs-loop-arrow' aria-hidden='true'>→</span>" +
      "<span>" + escapeHtml(item.to) + "</span>" +
      "<p>" + escapeHtml(item.body) + "</p></li>"
    ).join("");
    const cycleNodes = (page.loops.items || []).map((item, i) =>
      "<li class='ifs-cycle-node' style='--i:" + i + "'>" +
      "<span>" + escapeHtml(item.from) + "</span>" +
      "<span class='ifs-loop-arrow' aria-hidden='true'>→</span>" +
      "<span>" + escapeHtml(item.to) + "</span></li>"
    ).join("");
    const impact = (page.impact.items || []).map((item, i) =>
      "<article class='stat-card" + (i === 1 ? " stat-card--featured" : "") + "'>" +
      "<h3>" + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.body) + "</p></article>"
    ).join("");
    const nodes = ((page.viz && page.viz.nodes) || []).map((node) => {
      const feeds = (node.feeds || []).join(", ");
      return "<article class='ifs-node' tabindex='0' data-node='" + escapeHtml(node.id) +
        "' data-feeds='" + escapeHtml((node.feeds || []).join(" ")) + "'>" +
        "<h3>" + escapeHtml(node.title) + "</h3>" +
        "<p>" + escapeHtml(node.body) + "</p>" +
        "<p class='muted'>→ " + escapeHtml(feeds) + "</p></article>";
    }).join("");
    const proto = (page.prototype.items || []).map((item) =>
      "<div><dt>" + escapeHtml(item.title) + "</dt><dd>" + escapeHtml(item.body) + "</dd></div>"
    ).join("");
    rootEl.innerHTML =
      "<header class='page-head'><p class='kicker'>" + escapeHtml(page.kicker) + "</p><h1>" +
      escapeHtml(page.h1) + "</h1><p class='lede'>" + escapeHtml(page.lede) + "</p></header>" +
      "<p class='native-draft' data-ui='draft-note'></p>" +

      "<figure class='ifs-hero-photo'>" +
      "<img src='assets/puja-2025/aarti-procession-2025.jpg' width='1600' height='1067' alt='Evening aarti in the bamboo pavilion, Durga Puja Mahotsav 2025, IIT Kharagpur Research Park'>" +
      "<figcaption>" + escapeHtml(page.photoCap || page.pillars.intro) + "</figcaption></figure>" +

      "<section class='campaign-section'><h2>" + escapeHtml(page.what.h2) + "</h2>" +
      "<p>" + escapeHtml(page.what.body) + "</p>" +
      "<div class='ifs-contrast'>" + contrast + "</div></section>" +

      "<section class='campaign-section'><h2>" + escapeHtml(page.need.h2) + "</h2>" +
      "<p>" + escapeHtml(page.need.intro) + "</p>" +
      "<div class='ifs-need-grid'>" + need + "</div>" +
      (page.need.outro ? "<p>" + escapeHtml(page.need.outro) + "</p>" : "") +
      "</section>" +

      "<section class='campaign-section'><h2>" + escapeHtml(page.pillars.h2) + "</h2>" +
      "<p>" + escapeHtml(page.pillars.intro) + "</p>" +
      "<div class='ifs-pillar-grid'>" + pillars + "</div></section>" +

      "<section class='campaign-section'><h2>" + escapeHtml(page.loops.h2) + "</h2>" +
      "<p>" + escapeHtml(page.loops.intro) + "</p>" +
      "<div class='ifs-cycle' role='img' aria-label='" + escapeHtml(page.loops.h2) + "'>" +
      "<p class='ifs-cycle-center'>" + escapeHtml((page.viz && page.viz.center) || "") + "</p>" +
      "<ol class='ifs-cycle-ring'>" + cycleNodes + "</ol></div>" +
      "<ol class='ifs-loop-list'>" + loops + "</ol>" +
      "<p class='muted'>" + escapeHtml(page.loops.footnote) + "</p></section>" +

      "<section class='campaign-section'><h2>" + escapeHtml(page.impact.h2) + "</h2>" +
      (page.impact.caveat ? "<p class='ifs-caveat'>" + escapeHtml(page.impact.caveat) + "</p>" : "") +
      "<div class='stat-grid ifs-impact-grid'>" + impact + "</div></section>" +

      "<section class='ifs-viz' aria-labelledby='ifs-viz-heading'><h2 id='ifs-viz-heading'>" +
      escapeHtml((page.viz && page.viz.h2) || "") + "</h2><p class='muted'>" + escapeHtml((page.viz && page.viz.intro) || "") + "</p>" +
      "<p class='ifs-center'>" + escapeHtml((page.viz && page.viz.center) || "") +
      "</p><div class='ifs-map'>" + nodes + "</div>" +
      "<p class='ifs-summary'>" + escapeHtml((page.viz && page.viz.summary) || "") + "</p></section>" +

      "<section class='campaign-section'><h2>" + escapeHtml(page.prototype.h2) + "</h2>" +
      "<p>" + escapeHtml(page.prototype.status) + "</p>" +
      "<dl class='facts nrb-facts'>" + proto + "</dl>" +
      "<p class='cta-row'><a class='btn btn-primary' href='#fund'>" + escapeHtml(page.ctaFund) +
      "</a><a class='btn btn-secondary' href='#demo'>" + escapeHtml(page.ctaDemo) +
      "</a></p></section>";

    rootEl.querySelectorAll(".ifs-node").forEach((node) => {
      node.addEventListener("click", () => {
        const feeds = (node.getAttribute("data-feeds") || "").split(/\s+/);
        rootEl.querySelectorAll(".ifs-node").forEach((n) => {
          const on = n === node || feeds.indexOf(n.getAttribute("data-node")) !== -1;
          n.classList.toggle("is-on", on);
        });
      });
    });
  }

  function renderMission() {
    const page = state.mission[state.lang];
    const rootEl = document.getElementById("mission-body");
    if (!page || !rootEl) return;
    const stats = (page.stats || []).map((stat) =>
      "<article class='stat-card'><span class='badge badge-pending'>" + stat.badge + "</span><p class='stat-value'>" + stat.value + "</p><h3>" + stat.label + "</h3><p>" + stat.body + "</p></article>"
    ).join("");
    rootEl.innerHTML =
      "<header class='page-head'><p class='kicker'>" + page.kicker + "</p><h1>" + page.h1 + "</h1><p class='lede'>" + page.lede + "</p></header>" +
      "<hr class='rule'>" +
      "<p class='legend'>" + page.notice + "</p>" +
      "<div class='stat-grid'>" + stats + "</div>" +
      "<section class='layer layer--position'><h2>" + page.how.h2 + "</h2><p>" + page.how.body + "</p><p class='card-foot'><a class='btn btn-primary' href='" + page.how.href + "'>" + page.how.cta + "</a></p></section>";
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderParticipate() {
    const page = state.participate[state.lang];
    const rootEl = document.getElementById("participate-body");
    if (!page || !rootEl) return;
    const paths = (page.paths || []).map((path, i) =>
      "<div class='card'><p class='kicker'>0" + (i + 1) + "</p><h2>" + path.title + "</h2><p>" + path.body + "</p></div>"
    ).join("");
    const roles = (page.form.roles || []).map((role) =>
      "<label class='role-chip'><input type='radio' name='interest-role' value='" + role.id + "'> " + role.label + "</label>"
    ).join("");
    const fields = (page.form.fields || []).map((field) => {
      const req = field.required ? " required" : "";
      const auto = field.autocomplete ? " autocomplete='" + field.autocomplete + "'" : "";
      if (field.type === "textarea") {
        return "<div class='field'><label for='field-" + field.id + "'>" + field.label + "</label><textarea id='field-" + field.id + "' name='" + field.id + "' rows='4'" + req + "></textarea><p class='field-error' id='err-" + field.id + "' hidden></p></div>";
      }
      return "<div class='field'><label for='field-" + field.id + "'>" + field.label + "</label><input id='field-" + field.id + "' name='" + field.id + "' type='text'" + auto + req + "><p class='field-error' id='err-" + field.id + "' hidden></p></div>";
    }).join("");
    rootEl.innerHTML =
      "<header class='page-head'><p class='kicker'>" + page.kicker + "</p><h1>" + page.h1 + "</h1><p class='lede'>" + page.lede + "</p></header>" +
      "<hr class='rule'>" +
      "<p class='legend'>" + page.privacy + "</p>" +
      "<div class='grid cols-2'>" + paths + "</div>" +
      "<form id='interest-form' class='interest-form' novalidate>" +
      "<h2>" + page.form.h2 + "</h2>" +
      "<p class='muted'>" + page.form.intro + "</p>" +
      "<fieldset><legend>" + page.form.roleLabel + "</legend><div class='role-row'>" + roles + "</div><p class='field-error' id='err-role' hidden></p></fieldset>" +
      fields +
      "<div class='field'><label class='consent-row'><input type='checkbox' id='field-consent' name='consent' required> " + page.form.consent + "</label><p class='field-error' id='err-consent' hidden></p></div>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>" + page.form.submit + "</button><button type='reset' class='btn btn-secondary'>" + page.form.reset + "</button></div>" +
      "<p class='form-success' id='form-success' hidden>" + page.form.success + "</p>" +
      "</form>" +
      "<p class='card-foot'><a class='btn btn-secondary' href='" + page.locatorHref + "'>" + page.locatorCta + "</a></p>";
    const form = document.getElementById("interest-form");
    if (form) {
      form.addEventListener("submit", onInterestSubmit);
      form.addEventListener("reset", () => {
        form.querySelectorAll(".field-error").forEach((el) => { el.hidden = true; });
        const ok = document.getElementById("form-success");
        if (ok) ok.hidden = true;
      });
    }
  }

  function onInterestSubmit(e) {
    e.preventDefault();
    const page = state.participate[state.lang];
    if (!page) return;
    const form = e.currentTarget;
    const role = form.querySelector("input[name='interest-role']:checked");
    const name = form.querySelector("#field-name");
    const locality = form.querySelector("#field-locality");
    const consent = form.querySelector("#field-consent");
    const district = form.querySelector("#field-district");
    const message = form.querySelector("#field-message");
    let valid = true;
    function showErr(id, msg) {
      const el = document.getElementById("err-" + id);
      if (!el) return;
      el.textContent = msg;
      el.hidden = !msg;
    }
    showErr("role", role ? "" : page.form.errors.role);
    showErr("name", name && name.value.trim() ? "" : page.form.errors.name);
    showErr("locality", locality && locality.value.trim() ? "" : page.form.errors.locality);
    showErr("consent", consent && consent.checked ? "" : page.form.errors.consent);
    if (!role) valid = false;
    if (!name || !name.value.trim()) valid = false;
    if (!locality || !locality.value.trim()) valid = false;
    if (!consent || !consent.checked) valid = false;
    if (!valid) {
      const first = form.querySelector(".field-error:not([hidden])");
      if (first) first.previousElementSibling && first.previousElementSibling.focus && first.previousElementSibling.focus();
      return;
    }
    const payload = {
      stored: false,
      production: false,
      role: role.value,
      name: name.value.trim(),
      locality: locality.value.trim(),
      district: district ? district.value.trim() : "",
      message: message ? message.value.trim() : "",
      createdAt: new Date().toISOString(),
      note: "Downloaded locally. Not submitted to Bharatiya Krishak Samaj."
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bks-durga-puja-interest.json";
    a.click();
    URL.revokeObjectURL(a.href);
    const ok = document.getElementById("form-success");
    if (ok) {
      ok.hidden = false;
      ok.focus && ok.setAttribute("tabindex", "-1");
      ok.focus();
    }
    if (live) live.textContent = page.form.success;
  }

  function renderLocator() {
    const page = state.locator[state.lang];
    const rootEl = document.getElementById("locator-body");
    if (!page || !rootEl) return;
    const levels = (page.levels || []).map((level, i) =>
      "<li><span class='locator-step'>" + (i + 1) + "</span> " + level.label + "</li>"
    ).join("");
    const opener = (page.conversation && page.conversation[0] && page.conversation[0].text) || "";
    rootEl.innerHTML =
      "<header class='page-head'><p class='kicker'>" + page.kicker + "</p><h1>" + page.h1 + "</h1><p class='lede'>" + page.lede + "</p></header>" +
      "<hr class='rule'>" +
      "<p class='muted'>" + page.hierarchyLabel + "</p>" +
      "<ol class='locator-levels'>" + levels + "</ol>" +
      "<div class='locator-chat' aria-live='polite'><p class='locator-bubble'>" + opener + "</p><div id='locator-reply'></div></div>" +
      "<form id='locator-form' class='locator-form'>" +
      "<label for='locator-input'>" + page.promptLabel + "</label>" +
      "<div class='locator-row'><input id='locator-input' name='locality' type='text' autocomplete='address-level3' placeholder='" + escapeHtml(page.placeholder) + "'>" +
      "<button type='submit' class='btn btn-primary'>" + page.ask + "</button></div></form>" +
      "<p class='muted'>" + page.apiNote + "</p>";
    const form = document.getElementById("locator-form");
    if (form) form.addEventListener("submit", onLocatorSubmit);
  }

  function onLocatorSubmit(e) {
    e.preventDefault();
    const page = state.locator[state.lang];
    const input = document.getElementById("locator-input");
    const reply = document.getElementById("locator-reply");
    if (!page || !reply) return;
    const value = input && input.value.trim();
    if (!value) {
      reply.innerHTML = "<p class='locator-bubble locator-bubble--system'>" + page.empty + "</p>";
      return;
    }
    /* Documented POST /api/locality-lookup is not called. Unmapped stub only. */
    reply.innerHTML =
      "<p class='locator-bubble locator-bubble--user'>" + escapeHtml(value) + "</p>" +
      "<p class='locator-bubble locator-bubble--system'><span class='badge badge-empty'>UNMAPPED</span> " + page.heard + "</p>" +
      "<p class='locator-bubble locator-bubble--system'>" + page.empty + "</p>";
  }

  function renderSources() {
    const page = state.sources[state.lang];
    const rootEl = document.getElementById("sources-body");
    if (!page || !rootEl) return;
    const items = (page.items || []).map((item) => {
      const link = item.url
        ? "<p><a href='" + item.url + "' rel='noopener noreferrer'>" + item.title + "</a></p>"
        : "<p>" + item.title + "</p>";
      return "<li><h3>" + item.id + "</h3>" + link + "<p class='muted'>" + item.usedFor + "</p></li>";
    }).join("");
    rootEl.innerHTML =
      "<header class='page-head'><p class='kicker'>" + page.kicker + "</p><h1>" + page.h1 + "</h1><p class='lede'>" + page.lede + "</p></header>" +
      "<hr class='rule'><ul class='source-list'>" + items + "</ul>";
  }

  function formatCivicDate(iso, lang) {
    const parts = (iso || "").split("-");
    if (parts.length !== 3) return { day: "—", mon: "TBA" };
    const month = Number(parts[1]);
    const day = String(Number(parts[2]));
    const en = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const bn = ["জানু", "ফেব", "মার্চ", "এপ্রি", "মে", "জুন", "জুল", "আগ", "সেপ", "অক্টো", "নভে", "ডিসে"];
    const hi = ["जन", "फ़र", "मार्च", "अप्रै", "मई", "जून", "जुल", "अग", "सित", "अक्टू", "नव", "दिस"];
    const labels = lang === "bn" ? bn : lang === "hi" ? hi : en;
    return { day: day, mon: labels[month - 1] || "TBA", iso: iso };
  }

  function renderEvents() {
    const list = document.getElementById("event-list");
    if (!list) return;
    if (!state.events || !state.events.events) return;
    const lang = state.lang;
    list.innerHTML = "";
    state.events.events.forEach((ev) => {
      const li = document.createElement("li");
      li.className = "event-card";
      li.id = ev.event_id;
      const title = ev.title[lang] || ev.title.en;
      const desc = ev.description[lang] || ev.description.en;
      const timeLabel = lang === "bn" ? "সময়: TBA" : lang === "hi" ? "समय: TBA" : "Time: TBA";
      const placeLabel = lang === "bn" ? "স্থান: TBA" : lang === "hi" ? "स्थान: TBA" : "Place: TBA";
      const shareLabel = lang === "bn" ? "শেয়ারের খসড়া" : lang === "hi" ? "साझा मसौदा" : "Share draft text";
      const civic = lang === "bn" ? "নাগরিক ছুটি — বি কে এস অনুষ্ঠান নয়" : lang === "hi" ? "नागरिक छुट्टी — बीकेएस कार्यक्रम नहीं" : "Civic holiday — not a BKS event";
      const d = formatCivicDate(ev.date, lang);
      li.innerHTML =
        "<div class='event-date'><span class='day'>" + d.day + "</span><span class='mon'>" + d.mon + "</span></div>" +
        "<div>" +
        "<span class='badge badge-research'>CIVIC</span>" +
        "<span class='badge badge-pending'>pending_panjika</span>" +
        "<span class='badge badge-tba'>TBA</span>" +
        "<h3>" + title + "</h3>" +
        "<p class='muted'>" + civic + "</p>" +
        "<p class='event-meta'><time datetime='" + ev.date + "'>" + ev.date + "</time> · " + timeLabel + " · " + placeLabel + "</p>" +
        "<p>" + desc + "</p>" +
        "<p class='event-actions'><button type='button' class='btn btn-secondary' data-share='" + ev.event_id + "'>" + shareLabel + "</button></p>" +
        "</div>";
      list.appendChild(li);
    });
    list.querySelectorAll("[data-share]").forEach((btn) => {
      btn.addEventListener("click", () => shareEvent(btn.dataset.share));
    });
  }

  function shareEvent(id) {
    const ev = state.events.events.find((e) => e.event_id === id);
    if (!ev) return;
    const lang = state.lang;
    const title = ev.title[lang] || ev.title.en;
    const text =
      title +
      " · " +
      ev.date +
      " · civic date, pending panjika · Bharatiya Krishak Samaj · Durga Puja 2026 seasonal gathering · not a confirmed BKS programme";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (live) live.textContent = lang === "bn" ? "শেয়ারের খসড়া কপি হয়েছে" : lang === "hi" ? "साझा पाठ कॉपी हुआ" : "Share text copied";
      });
    }
  }

  function renderStories() {
    const list = document.getElementById("story-wells");
    if (!list || !state.stories || !state.stories.wells) return;
    const lang = state.lang;
    list.innerHTML = "";
    state.stories.wells.forEach((well) => {
      const li = document.createElement("li");
      li.className = "empty-well";
      const material = well.material || "clay";
      const coming = lang === "bn" ? "গল্প আসবে" : lang === "hi" ? "कहानी शीघ्र" : "Story coming soon";
      const title = well[lang] || well.en;
      const ph = (well.placeholder && (well.placeholder[lang] || well.placeholder.en)) || "";
      li.innerHTML =
        "<div class='slot slot--card slot--" + material + "' role='img' aria-label='" + coming + "'>" +
        "<span class='slot__label'>" + coming + "</span></div>" +
        "<span class='badge badge-empty'>EMPTY</span>" +
        "<h3>" + title + "</h3>" +
        "<p>" + ph + "</p>";
      list.appendChild(li);
    });
  }

  function updateMeta() {
    const ui = state.ui[state.lang];
    const title = ui && ui.metaTags ? ui.metaTags.title : document.title;
    const descText = ui && ui.metaTags ? ui.metaTags.description : "";
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", descText);
    const ogt = document.querySelector('meta[property="og:title"]');
    const ogd = document.querySelector('meta[property="og:description"]');
    const ogl = document.querySelector('meta[property="og:locale"]');
    if (ogt) ogt.setAttribute("content", title);
    if (ogd) ogd.setAttribute("content", descText);
    if (ogl) ogl.setAttribute("content", state.lang === "bn" ? "bn_IN" : state.lang === "hi" ? "hi_IN" : "en_IN");
  }

  function applyPack(lang, pack) {
    state.ui[lang] = pack.ui;
    state.heroes[lang] = pack.heroes;
    state.home[lang] = pack.home;
    state.krishak[lang] = pack.krishak;
    state.ifs[lang] = pack.ifs;
    state.mission[lang] = pack.mission;
    state.participate[lang] = pack.participate;
    state.locator[lang] = pack.locator;
    state.sources[lang] = pack.sources;
    state.nrb[lang] = pack.nrb;
  }

  function loadJson(path) {
    if (BUNDLE && BUNDLE.files && BUNDLE.files[path] != null) {
      return Promise.resolve(BUNDLE.files[path]);
    }
    return fetch(DATA_BASE + path).then((r) => r.json());
  }

  function loadLangPack(lang) {
    if (BUNDLE && BUNDLE.packs && BUNDLE.packs[lang]) {
      applyPack(lang, BUNDLE.packs[lang]);
      return Promise.resolve();
    }
    const base = "content/" + lang + "/";
    return Promise.all([
      loadJson(base + "ui.json"),
      loadJson(base + "heroes.json"),
      loadJson(base + "home.json"),
      loadJson(base + "krishak-samaj.json"),
      loadJson(base + "integrated-farming.json"),
      loadJson(base + "mission.json"),
      loadJson(base + "participate.json"),
      loadJson(base + "locator.json"),
      loadJson(base + "sources.json"),
      loadJson(base + "nrb.json")
    ]).then(([ui, heroes, home, krishak, ifs, mission, participate, locator, sources, nrb]) => {
      applyPack(lang, { ui, heroes, home, krishak, ifs, mission, participate, locator, sources, nrb });
    });
  }

  window.addEventListener("hashchange", () => {
    const page = pageFromHash();
    show(page);
    if (HOME_SECTIONS.indexOf(page) !== -1) {
      const heading = document.querySelector("#" + page + " h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
      return;
    }
    const active = document.querySelector(".view.is-active");
    const heading = active && active.querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  });
  if (toggle) {
    toggle.addEventListener("click", () => {
      if (drawer && drawer.hasAttribute("hidden")) openMenu();
      else closeMenu();
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && !drawer.hasAttribute("hidden")) {
      e.preventDefault();
      closeMenu();
    }
    trapFocus(e);
  });

  let lang = "en";
  try { lang = localStorage.getItem("bks-puja-lang") || "en"; } catch (e) { /* ignore */ }
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) !== -1) lang = q;
  } catch (e) { /* ignore */ }
  if (LANGS.indexOf(lang) === -1) lang = "en";
  show(pageFromHash());

  Promise.all([
    loadLangPack("en"),
    loadLangPack("bn"),
    loadLangPack("hi"),
    loadJson("events/events.json"),
    loadJson("stories/stories.json"),
    loadJson("content/nav.json"),
    loadJson("content/campaign.json")
  ])
    .then(([, , , events, stories, navSpec, campaign]) => {
      state.events = events;
      state.stories = stories;
      state.navSpec = navSpec;
      state.campaign = campaign;
      setLang(lang);
      show(pageFromHash());
      if (new URLSearchParams(location.search).get("menu") === "open") openMenu();
    })
    .catch(() => {
      const note = document.getElementById("events-fallback");
      if (note) note.hidden = false;
      setLang(lang);
    });
})();
