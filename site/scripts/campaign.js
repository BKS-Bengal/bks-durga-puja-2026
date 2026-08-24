/* Local campaign renderer — copy from live /puja, no production database. */
(function (global) {
  const DISTRICTS = [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
    "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman",
    "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
  ];

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function inr(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function dict(campaign, lang) {
    if (!campaign || !campaign.translations) return {};
    return campaign.translations[lang] || campaign.translations.en || {};
  }

  function applyStrings(campaign, lang) {
    const d = dict(campaign, lang);
    document.querySelectorAll("[data-campaign]").forEach((el) => {
      const key = el.getAttribute("data-campaign");
      const value = d[key];
      if (value == null || value === "") return;
      if (String(value).indexOf("<") !== -1) el.innerHTML = value;
      else el.textContent = value;
    });
    const puja = campaign.puja || {};
    const when = puja.dates && puja.dates.display ? (puja.dates.display[lang] || puja.dates.display.en) : "";
    const where = puja.venue && puja.venue.short ? (puja.venue.short[lang] || puja.venue.short.en) : "";
    const whenEl = document.getElementById("meta-when");
    const whereEl = document.getElementById("meta-where");
    const datesEl = document.getElementById("hero-dates");
    if (whenEl) whenEl.textContent = when;
    if (whereEl) whereEl.textContent = where;
    if (datesEl) datesEl.textContent = when + " · " + where;
  }

  function downloadJson(filename, payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function render(campaign, lang) {
    const root = document.getElementById("campaign-root");
    const strip = document.getElementById("diff-strip");
    if (!campaign || !root) return;
    const d = dict(campaign, lang);
    const puja = campaign.puja || {};
    const cats = puja.categories || [];

    if (strip) {
      strip.innerHTML =
        "<article><h3>" + escapeHtml(d.diff1) + "</h3><p>" + escapeHtml(d.diff1Sub) + "</p></article>" +
        "<article><h3>" + escapeHtml(d.diff2) + "</h3><p>" + escapeHtml(d.diff2Sub) + "</p></article>" +
        "<article><h3>" + escapeHtml(d.diff3) + "</h3><p>" + escapeHtml(d.diff3Sub) + "</p></article>";
    }

    const awardCards = cats.map((id, i) => {
      const cat = (d.categories && d.categories[id]) || { name: id, desc: "" };
      const num = String(i + 1).padStart(2, "0");
      return "<article class='award-card'><span class='award-index'>" + num + "</span><h3>" +
        escapeHtml(cat.name) + "</h3><p>" + escapeHtml(cat.desc) + "</p></article>";
    }).join("");

    const catOptions = ['<option value="">' + escapeHtml(d.optSelect || "Select") + "</option>"]
      .concat(cats.map((id) => {
        const cat = (d.categories && d.categories[id]) || { name: id };
        return '<option value="' + id + '">' + escapeHtml(cat.name) + "</option>";
      })).join("");

    const districtOptions = ['<option value="">' + escapeHtml(d.optSelect || "Select") + "</option>"]
      .concat(DISTRICTS.map((name) => '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + "</option>"))
      .join("");

    const tierCards = (puja.tiers || []).map((tier) => {
      const copy = (d.tiers && d.tiers[tier.id]) || { name: tier.id, note: "", benefits: [] };
      const benefits = (copy.benefits || []).map((b) => "<li>" + escapeHtml(b) + "</li>").join("");
      return "<article class='tier-card'><p class='kicker'>" + escapeHtml(copy.note) + "</p><h3>" +
        escapeHtml(copy.name) + "</h3><p class='stat-value'>" + inr(tier.amount) +
        ' <span class="badge badge-pending">ASSUMED</span></p><ul>' + benefits + "</ul></article>";
    }).join("");

    const tierOptions = ['<option value="">' + escapeHtml((d.rt && d.rt.tierUndecided) || "Not sure yet") + "</option>"]
      .concat((puja.tiers || []).map((tier) => {
        const copy = (d.tiers && d.tiers[tier.id]) || { name: tier.id };
        return '<option value="' + tier.id + '">' + escapeHtml(copy.name) + "</option>";
      })).join("");

    root.innerHTML =
      "<section class='campaign-section' id='theme'>" +
      "<div class='campaign-split'><div><p class='kicker'>" + escapeHtml(d.themeEyebrow) + "</p>" +
      "<h2>" + escapeHtml(d.themeTitle) + "</h2></div><div><p>" + escapeHtml(d.themeP1) +
      "</p><p>" + escapeHtml(d.themeP2) + "</p><p>" + escapeHtml(d.themeP3) + "</p></div></div></section>" +

      "<section class='campaign-section' id='banner-bks'>" +
      "<p class='kicker'>" + escapeHtml(d.bannerEyebrow) + "</p><h2>" + escapeHtml(d.bannerTitle) + "</h2>" +
      "<p>" + escapeHtml(d.bannerText) + "</p>" +
      "<p class='card-foot'><a class='btn btn-secondary' href='https://www.bkswbengal.org' rel='noopener noreferrer'>" +
      escapeHtml(d.bannerLink) + "</a></p>" +
      "<div class='leader-strip'>" +
      "<article><img src='assets/dr-krishan-bir-chaudhary.jpg' width='110' height='110' alt='" +
      escapeHtml(d.leader1Title) + "'><div><p class='kicker'>" + escapeHtml(d.leader1Eyebrow) +
      "</p><h3>" + escapeHtml(d.leader1Title) + "</h3><p>" + escapeHtml(d.leader1Text) +
      "</p></div></article>" +
      "<article><img src='assets/mahacharya-sourabh-j-sarkar.jpg' width='110' height='110' alt='" +
      escapeHtml(d.leader2Title) + "'><div><p class='kicker'>" +
      escapeHtml(d.leader2Eyebrow) + "</p><h3>" + escapeHtml(d.leader2Title) + "</h3><p>" +
      escapeHtml(d.leader2Text) + "</p></div></article></div></section>" +

      "<section class='campaign-section' id='awards'>" +
      "<p class='kicker'>" + escapeHtml(d.awardsEyebrow) + "</p><h2>" + escapeHtml(d.awardsTitle) + "</h2>" +
      "<p>" + escapeHtml(d.awardsText) + "</p>" +
      "<div class='award-grid'>" + awardCards + "</div>" +
      "<p class='muted'>" + escapeHtml(d.awardsFootnote) + "</p></section>" +

      "<section class='campaign-section' id='nominate'>" +
      "<p class='kicker'>" + escapeHtml(d.nominateEyebrow) + "</p><h2>" + escapeHtml(d.nominateTitle) + "</h2>" +
      "<p>" + escapeHtml(d.nominateText) + "</p>" +
      "<div class='nominate-layout'><aside class='guide-panel'><p class='kicker'>" +
      escapeHtml(d.guideEyebrow) + "</p><h3>" + escapeHtml(d.guideTitle) + "</h3><p>" +
      escapeHtml(d.guideText) + "</p><ul><li>" + escapeHtml(d.guideCheck1) + "</li><li>" +
      escapeHtml(d.guideCheck2) + "</li><li>" + escapeHtml(d.guideCheck3) + "</li><li>" +
      escapeHtml(d.guideCheck4) + "</li></ul></aside>" +
      "<form class='campaign-form' id='nomination-form' novalidate>" +
      "<fieldset><legend>" + escapeHtml(d.fieldWhoFiling) + "</legend>" +
      "<label><input type='radio' name='nominator_type' value='self'> " + escapeHtml(d.typeSelf) +
      " — " + escapeHtml(d.typeSelfNote) + "</label>" +
      "<label><input type='radio' name='nominator_type' value='other'> " + escapeHtml(d.typeOther) +
      " — " + escapeHtml(d.typeOtherNote) + "</label></fieldset>" +
      "<div class='form-grid'>" +
      "<label>" + escapeHtml(d.fieldCategory) + "<select name='category' required>" + catOptions + "</select></label>" +
      "<label>" + escapeHtml(d.fieldFarmerName) + "<input name='farmer_name' required maxlength='120'></label>" +
      "<label>" + escapeHtml(d.fieldFarmerPhone) + "<input name='farmer_phone' required inputmode='numeric'></label>" +
      "<label>" + escapeHtml(d.fieldFarmerDistrict) + "<select name='farmer_district'>" + districtOptions + "</select></label>" +
      "<label>" + escapeHtml(d.fieldFarmerBlock) + "<input name='farmer_block'></label>" +
      "<label>" + escapeHtml(d.fieldFarmerVillage) + "<input name='farmer_village'></label>" +
      "</div>" +
      "<label>" + escapeHtml(d.fieldWhatGrow) + "<input name='what_they_grow'></label>" +
      "<label>" + escapeHtml(d.fieldInnovation) + "<textarea name='innovation_summary' rows='4' required></textarea></label>" +
      "<label class='consent-row'><input type='checkbox' name='consent_contact' required> " +
      escapeHtml(d.nomConsent1) + "</label>" +
      "<label class='consent-row'><input type='checkbox' name='consent_data' required> " +
      escapeHtml(d.nomConsent2) + "</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>" + escapeHtml(d.submitNomination) +
      "</button><button type='button' class='btn btn-secondary' id='download-nomination'>" +
      escapeHtml(d.downloadNomination) + "</button></div>" +
      "<p class='legend'><span class='badge badge-empty'>LOCAL</span> Nominations are not sent to a server. The file downloads on this device only.</p>" +
      "<p class='muted' id='nomination-status'>" + escapeHtml(d.nominationStatusText) + "</p>" +
      "</form></div></section>" +

      "<section class='campaign-section' id='record'>" +
      "<p class='kicker'>" + escapeHtml(d.recEyebrow) + "</p><h2>" + escapeHtml(d.recTitle) + "</h2>" +
      "<p>" + escapeHtml(d.recLead) + "</p>" +
      "<figure class='record-figure'><img src='assets/puja-2025/aarti-procession-2025.jpg' width='1600' height='1067' alt='Evening aarti procession through the bamboo pavilion at the 2025 Durga Puja Mahotsav, IIT Kharagpur Research Park'>" +
      "<figcaption class='slot-caption'>" + escapeHtml(d.recFig1) + "</figcaption></figure>" +
      "<div class='record-stats'>" +
      "<div><strong>1,00,000+</strong><span>" + escapeHtml(d.recStat1) + "</span></div>" +
      "<div><strong>3M+</strong><span>" + escapeHtml(d.recStat2) + "</span></div>" +
      "<div><strong>150</strong><span>" + escapeHtml(d.recStat3) + "</span></div>" +
      "<div><strong>8</strong><span>" + escapeHtml(d.recStat4) + "</span></div></div>" +
      "<p class='muted'>" + escapeHtml(d.recSource) + "</p>" +
      "<div class='record-split'><ul class='record-facts'><li>" + (d.recFact1 || "") + "</li><li>" +
      (d.recFact2 || "") + "</li><li>" + (d.recFact3 || "") + "</li><li>" + (d.recFact4 || "") +
      "</li></ul><figure class='record-portrait'><img src='assets/puja-2025/conch-aarti-2025.jpg' width='1400' height='2100' alt='Priest sounding the conch during evening aarti at the 2025 Durga Puja Mahotsav'></figure></div>" +
      "<h3>" + escapeHtml(d.recExpoTitle) + "</h3><p>" + escapeHtml(d.recExpoLead) + "</p>" +
      "<div class='record-startups'><article><h3>Revoltaero Systems</h3><p>" + escapeHtml(d.recSu1) +
      "</p></article><article><h3>Innovodigm</h3><p>" + escapeHtml(d.recSu2) +
      "</p></article><article><h3>Bisuddha Enterprises</h3><p>" + escapeHtml(d.recSu3) +
      "</p></article><article><h3>TWINAMICS</h3><p>" + escapeHtml(d.recSu4) + "</p></article></div>" +
      "<h3>" + escapeHtml(d.recVoicesTitle) + "</h3><p>" + escapeHtml(d.recVoicesLead) + "</p>" +
      "<div class='reel-row'>" +
      "<a class='reel-card' href='https://www.instagram.com/reel/DPJyDhMEb3p/' rel='noopener noreferrer' target='_blank'><strong>@kosh_stories</strong><span>" + escapeHtml(d.recReel1) + "</span><span>" + escapeHtml(d.recReelCta) + "</span></a>" +
      "<a class='reel-card' href='https://www.instagram.com/reel/DPGEGE2kvkl/' rel='noopener noreferrer' target='_blank'><strong>@nigampvlogs</strong><span>" + escapeHtml(d.recReel2) + "</span><span>" + escapeHtml(d.recReelCta) + "</span></a>" +
      "<a class='reel-card' href='https://www.instagram.com/reel/DPKHprmk-gn/' rel='noopener noreferrer' target='_blank'><strong>@youfindgo</strong><span>" + escapeHtml(d.recReel3) + "</span><span>" + escapeHtml(d.recReelCta) + "</span></a>" +
      "</div>" +
      "<p class='cta-row'><a class='btn btn-secondary' href='https://www.telegraphindia.com/west-bengal/kolkata/innovation-mantra-for-iit-kharagpur-research-park-puja-in-new-town-prnt/cid/2125070' rel='noopener noreferrer'>" +
      escapeHtml(d.recPressCta) + "</a><a class='btn btn-secondary' href='https://www.bkswbengal.org' rel='noopener noreferrer'>" +
      escapeHtml(d.recOrgCta) + "</a></p></section>" +
      "<section class='campaign-section bks-memories' id='memories' data-bks-memories='gallery'></section>" +

      "<section class='campaign-section' id='sponsor-puja'>" +
      "<p class='kicker'>" + escapeHtml(d.sponsorEyebrow) + "</p><h2>" + escapeHtml(d.sponsorTitle) + "</h2>" +
      "<p>" + escapeHtml(d.sponsorText) + "</p>" +
      "<div class='sponsor-why'><article><h3>" + escapeHtml(d.why1) + "</h3><p>" + escapeHtml(d.why1Text) +
      "</p></article><article><h3>" + escapeHtml(d.why2) + "</h3><p>" + escapeHtml(d.why2Text) +
      "</p></article><article><h3>" + escapeHtml(d.why3) + "</h3><p>" + escapeHtml(d.why3Text) +
      "</p></article><article><h3>" + escapeHtml(d.why4) + "</h3><p>" + escapeHtml(d.why4Text) +
      "</p></article></div>" +
      "<div class='tier-grid'>" + tierCards + "</div>" +
      "<p class='muted'>" + escapeHtml(d.tierFootnote) + "</p>" +
      "<div class='sponsor-layout'><aside class='guide-panel'><p class='kicker'>" +
      escapeHtml(d.sponsorContactEyebrow) + "</p><h3>" + escapeHtml(d.sponsorContactTitle) +
      "</h3><p>" + escapeHtml(d.sponsorContactText) + "</p><ul><li>" + escapeHtml(d.sponsorCheck1) +
      "</li><li>" + escapeHtml(d.sponsorCheck2) + "</li><li>" + escapeHtml(d.sponsorCheck3) +
      "</li></ul></aside>" +
      "<form class='campaign-form' id='sponsor-form' novalidate><h3>" + escapeHtml(d.sponsorFormTitle) + "</h3>" +
      "<div class='form-grid'>" +
      "<label>" + escapeHtml(d.fieldOrg) + "<input name='organisation_name' required></label>" +
      "<label>" + escapeHtml(d.fieldContactPerson) + "<input name='contact_person' required></label>" +
      "<label>" + escapeHtml(d.fieldSponsorPhone) + "<input name='phone' required inputmode='numeric'></label>" +
      "<label>" + escapeHtml(d.fieldSponsorEmail) + "<input name='email' type='email'></label>" +
      "<label>" + escapeHtml(d.fieldTier) + "<select name='tier_interest'>" + tierOptions + "</select></label>" +
      "<label>" + escapeHtml(d.fieldCategoryInterest) + "<select name='category_interest'>" +
      '<option value="">' + escapeHtml((d.rt && d.rt.categoryNone) || "No preference") + "</option>" +
      catOptions.replace(d.optSelect || "Select", (d.rt && d.rt.categoryNone) || "No preference") +
      "</select></label></div>" +
      "<label>" + escapeHtml(d.fieldMessage) + "<textarea name='message' rows='4'></textarea></label>" +
      "<label class='consent-row'><input type='checkbox' name='consent_contact' required> " +
      escapeHtml(d.sponsorConsent1) + "</label>" +
      "<div class='cta-row'><button type='submit' class='btn btn-primary'>" + escapeHtml(d.submitSponsor) +
      "</button><button type='button' class='btn btn-secondary' id='download-sponsor'>" +
      escapeHtml(d.downloadSponsor) + "</button></div>" +
      "<p class='legend'><span class='badge badge-empty'>LOCAL</span> No payment. Enquiry is not sent to a server. The file downloads on this device only.</p>" +
      "<p class='muted' id='sponsor-status'>" + escapeHtml(d.sponsorStatusText) + "</p></form></div></section>" +

      "<section class='campaign-section' id='visit'>" +
      "<p class='kicker'>" + escapeHtml(d.visitEyebrow) + "</p><h2>" + escapeHtml(d.visitTitle) + "</h2>" +
      "<p>" + escapeHtml(d.visitText) + "</p>" +
      "<p class='legend'><span class='badge'>LOCATION</span> " +
      escapeHtml(puja.venue && puja.venue.detail ? (puja.venue.detail[lang] || puja.venue.detail.en) : "") +
      " · " + escapeHtml(puja.ceremony ? (puja.ceremony[lang] || puja.ceremony.en) : "") + "</p>" +
      "<p><a class='maps-link' href='https://www.google.com/maps/search/?api=1&amp;query=Munshir%20Bheri%20Management%20Fishermen%27s%20Committee%2C%20Near%20Sukantanagar%2C%20Salt%20Lake%20Sector%20V%2C%20East%20Kolkata%20Wetlands%2C%20Kolkata%20700091%2C%20West%20Bengal' target='_blank' rel='noopener noreferrer'>View on Google Maps</a></p>" +
      "<div class='programme-list'><div><strong>" + escapeHtml(d.prog1) + "</strong><span> " +
      escapeHtml(d.prog1Text) + "</span></div><div><strong>" + escapeHtml(d.prog2) +
      "</strong><span> " + escapeHtml(d.prog2Text) + "</span></div><div><strong>" +
      escapeHtml(d.prog3) + "</strong><span> " + escapeHtml(d.prog3Text) + "</span></div></div></section>" +

      "<section class='campaign-section' id='press'>" +
      "<p class='kicker'>" + escapeHtml(d.pressEyebrow) + "</p><h2>" + escapeHtml(d.pressTitle) + "</h2>" +
      "<ul class='source-list'><li>" + (d.press1 || "") + "</li><li>" + (d.press2 || "") +
      "</li><li>" + (d.press3 || "") + "</li><li>" + (d.press4 || "") + "</li><li>" +
      (d.press5 || "") + "</li></ul></section>" +

      "<section class='quote-band'><h2>" + escapeHtml(d.pujaQuote) + "</h2></section>";

    bindForms(d);
    applyStrings(campaign, lang);
  }

  function formPayload(form) {
    const data = {};
    new FormData(form).forEach((value, key) => { data[key] = value; });
    data.stored = false;
    data.production = false;
    data.createdAt = new Date().toISOString();
    data.note = "Downloaded locally from BKS Durga Puja 2026. Not submitted to a server.";
    return data;
  }

  function bindForms(d) {
    const nom = document.getElementById("nomination-form");
    const sponsor = document.getElementById("sponsor-form");
    function onNom(e) {
      e.preventDefault();
      downloadJson("bks-durga-puja-nomination.json", formPayload(nom));
      const status = document.getElementById("nomination-status");
      if (status) status.textContent = (d.rt && d.rt.downloaded) || "The information has been downloaded as a file to your device.";
    }
    function onSponsor(e) {
      e.preventDefault();
      downloadJson("bks-durga-puja-sponsor-enquiry.json", formPayload(sponsor));
      const status = document.getElementById("sponsor-status");
      if (status) status.textContent = (d.rt && d.rt.downloaded) || "The information has been downloaded as a file to your device.";
    }
    if (nom) {
      nom.addEventListener("submit", onNom);
      const dl = document.getElementById("download-nomination");
      if (dl) dl.addEventListener("click", () => downloadJson("bks-durga-puja-nomination.json", formPayload(nom)));
    }
    if (sponsor) {
      sponsor.addEventListener("submit", onSponsor);
      const dl = document.getElementById("download-sponsor");
      if (dl) dl.addEventListener("click", () => downloadJson("bks-durga-puja-sponsor-enquiry.json", formPayload(sponsor)));
    }
  }

  global.BksCampaign = { render: render, applyStrings: applyStrings, downloadJson: downloadJson };
})(window);
