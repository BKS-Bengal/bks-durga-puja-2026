(function () {
  "use strict";

  var YT_ID = "LMWeL35RiTo";
  var MAPS =
    "https://www.google.com/maps/search/?api=1&query=Munshir%20Bheri%20Management%20Fishermen%27s%20Committee%2C%20Near%20Sukantanagar%2C%20Salt%20Lake%20Sector%20V%2C%20East%20Kolkata%20Wetlands%2C%20Kolkata%20700091%2C%20West%20Bengal";
  var MAIN = "https://bks-durga-puja-2026.vercel.app/site/";
  var videoLoaded = false;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function pack(lang) {
    var root = window.BKS_I18N || {};
    return root[lang] || root.en || {};
  }

  function tidy(str) {
    return String(str == null ? "" : str)
      .replace(/\s*---\s*$/g, "")
      .trim();
  }

  function esc(str) {
    return tidy(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function shouldPlayVideo() {
    if (!window.matchMedia) return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    try {
      var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        if (conn.saveData) return false;
        if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g") return false;
      }
    } catch (err) {}
    return true;
  }

  function loadHeroVideo() {
    if (videoLoaded) return;
    var slot = $("#hero-video-slot");
    if (!slot) return;
    if (!shouldPlayVideo()) return;
    videoLoaded = true;
    var origin = "";
    try {
      if (window.location && window.location.origin && window.location.origin.indexOf("http") === 0) {
        origin = "&origin=" + encodeURIComponent(window.location.origin);
      }
    } catch (err2) {}
    var src =
      "https://www.youtube-nocookie.com/embed/" +
      YT_ID +
      "?autoplay=1&mute=1&loop=1&playlist=" +
      YT_ID +
      "&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&showinfo=0" +
      origin;
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "Historical reference footage from Durga Puja Mahotsav 2025.";
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    iframe.setAttribute("tabindex", "-1");
    iframe.setAttribute("aria-hidden", "true");
    iframe.addEventListener("load", function () {
      slot.classList.add("is-on");
    });
    slot.appendChild(iframe);
    slot.hidden = false;
    document.body.classList.add("has-hero-video");
  }

  function linesHtml(items, kind) {
    if (!items || !items.length) return "";
    if (kind === "cycle") {
      return (
        "<ol class='ifs-cycle'>" +
        items
          .map(function (item, i) {
            var n = i + 1;
            var num = n < 10 ? "0" + n : String(n);
            return (
              "<li><span class='ifs-cycle-n' aria-hidden='true'>" +
              num +
              "</span><span>" +
              esc(item) +
              "</span></li>"
            );
          })
          .join("") +
        "</ol>"
      );
    }
    if (kind === "steps") {
      return (
        "<ol class='path-steps'>" +
        items
          .map(function (item) {
            return "<li>" + esc(item) + "</li>";
          })
          .join("") +
        "</ol>"
      );
    }
    return (
      "<ul class='copy-lines'>" +
      items
        .map(function (item) {
          return "<li>" + esc(item) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function blocksHtml(blocks, linesKind) {
    if (!blocks || !blocks.length) return "";
    return blocks
      .map(function (b) {
        if (!b) return "";
        if (b.type === "p" && b.text && tidy(b.text) !== "") {
          return "<p>" + esc(b.text) + "</p>";
        }
        if (b.type === "lines" && b.items && b.items.length) {
          return linesHtml(b.items, linesKind);
        }
        return "";
      })
      .join("");
  }

  function sectionShell(id, layout, inner, extraClass) {
    return (
      "<section class='section section--" +
      esc(layout) +
      (extraClass ? " " + extraClass : "") +
      "' id='" +
      esc(id) +
      "' data-reveal>" +
      inner +
      "</section>"
    );
  }

  function copyBlock(sec, extraClass, linesKind) {
    if (!sec) return "";
    var label = sec.label ? "<p class='section-label'>" + esc(sec.label) + "</p>" : "";
    var h = sec.headline ? "<h2>" + esc(sec.headline) + "</h2>" : "";
    var sub = sec.sub ? "<p class='section-sub'>" + esc(sec.sub) + "</p>" : "";
    return (
      "<div class='copy " +
      (extraClass || "") +
      "'>" +
      label +
      h +
      sub +
      blocksHtml(sec.blocks, linesKind) +
      "</div>"
    );
  }

  function renderHero(p, cfg) {
    var h = p.hero || {};
    var ui = p.ui || {};
    var secondaryHref = cfg.id === "nrb" ? "#lakh" : "#enables";
    $("#hero-copy").innerHTML =
      (h.eyebrow ? "<p class='kicker'>" + esc(h.eyebrow) + "</p>" : "") +
      "<h1 id='hero-title'>" +
      esc(h.headline || "") +
      "</h1>" +
      (h.sub ? "<p class='lede'>" + esc(h.sub) + "</p>" : "") +
      "<div class='cta-row'>" +
      "<a class='btn btn-primary' href='#invite'>" +
      esc(h.ctaPrimary || "") +
      "</a>" +
      "<a class='btn btn-ghost' href='" +
      secondaryHref +
      "'>" +
      esc(h.ctaSecondary || "") +
      "</a></div>" +
      "<p class='hero-credit'>" +
      esc(ui.videoCaption || "Historical reference footage from Durga Puja Mahotsav 2025.") +
      "</p>";
    var letter = $("#hero-letter");
    if (letter) {
      letter.innerHTML =
        "<div class='wrap'>" +
        blocksHtml(h.blocks) +
        (h.ctaNote ? "<p class='cta-note'>" + esc(h.ctaNote) + "</p>" : "") +
        "</div>";
    }
  }

  function figureHtml(img, alt) {
    return (
      "<figure class='split-photo'>" +
      "<img src='" +
      esc(img) +
      "' width='1200' height='800' alt='" +
      esc(alt) +
      "' loading='lazy'></figure>"
    );
  }

  function mapsLabel(p, sec) {
    if (p.ui && p.ui.maps) return p.ui.maps;
    var raw = (sec && sec.mapsCta) || "View on Google Maps";
    return String(raw).split("\n")[0];
  }

  function lineKind(row) {
    if (row.key === "ifs") return "cycle";
    if (row.key === "path") return "steps";
    return "cards";
  }

  function renderStory(p, cfg) {
    var html = "";
    var splitCount = 0;
    cfg.story.forEach(function (row) {
      var sec = p[row.key];
      if (!sec) return;
      if (row.layout === "split") {
        splitCount += 1;
        html += sectionShell(
          row.id,
          "split",
          "<div class='wrap wrap-wide split-grid'>" +
            copyBlock(sec) +
            figureHtml(row.img, row.alt || "") +
            "</div>",
          splitCount % 2 === 0 ? "is-flip" : ""
        );
        return;
      }
      if (row.layout === "loop") {
        html += sectionShell(
          row.id,
          "loop",
          "<div class='wrap wrap-wide'>" + copyBlock(sec, "", lineKind(row)) + "</div>"
        );
        return;
      }
      if (row.layout === "stat") {
        html += sectionShell(
          row.id,
          "stat",
          "<div class='wrap wrap-wide stat-grid'>" +
            "<p class='stat-num' aria-hidden='true'>" +
            esc(row.stat || "") +
            "</p>" +
            copyBlock(sec) +
            "</div>"
        );
        return;
      }
      if (row.layout === "bio") {
        html += sectionShell(
          row.id,
          "bio",
          "<div class='bio-media' aria-hidden='true'><img src='" +
            esc(row.img) +
            "' alt='' loading='lazy'></div>" +
            "<div class='wrap wrap-wide bio-copy'>" +
            copyBlock(sec) +
            "</div>"
        );
        return;
      }
      if (row.layout === "venue") {
        html += sectionShell(
          row.id,
          "venue",
          "<div class='wrap wrap-wide venue-grid'>" +
            copyBlock(sec) +
            "<p class='maps-wrap'><a class='btn btn-primary' href='" +
            MAPS +
            "' target='_blank' rel='noopener noreferrer'>" +
            esc(mapsLabel(p, sec)) +
            "</a></p></div>"
        );
        return;
      }
      html += sectionShell(
        row.id,
        row.layout || "prose",
        "<div class='wrap'>" + copyBlock(sec) + "</div>"
      );
    });
    return html;
  }

  function renderFaq(p) {
    var faq = p.faq || {};
    var items = faq.items || [];
    var title = (p.ui && p.ui.faqTitle) || "Questions";
    var list = items
      .map(function (item, i) {
        return (
          "<details class='faq-item'" +
          (i === 0 ? " open" : "") +
          ">" +
          "<summary>" +
          esc(item.q) +
          "</summary>" +
          "<p>" +
          esc(item.a) +
          "</p></details>"
        );
      })
      .join("");
    return (
      "<section class='section section--faq' id='faq' data-reveal>" +
      "<div class='wrap'><h2>" +
      esc(title) +
      "</h2>" +
      list +
      "</div></section>"
    );
  }

  function renderForm(p, cfg) {
    var ui = p.ui || {};
    var invite = p.invite || {};
    var close = p.close || {};
    var fields;
    if (cfg.id === "nrb") {
      fields =
        field(ui.formName, "name", "text", true) +
        field(ui.formEmail, "email", "email", true) +
        field(ui.formPhone, "phone", "tel", true) +
        field(ui.formVillage, "village", "text", false) +
        consent(ui.formConsent);
    } else {
      fields =
        field(ui.formName, "name", "text", true) +
        field(ui.formRole, "role", "text", true) +
        field(ui.formEmail, "email", "email", true) +
        "<div class='field'><label for='note'>" +
        esc(ui.formNote) +
        "</label><textarea id='note' name='note' rows='4'></textarea></div>" +
        consent(ui.formConsent);
    }
    return (
      "<section class='section section--invite' id='invite' data-reveal>" +
      "<div class='wrap wrap-wide invite-grid'>" +
      copyBlock(invite) +
      "<form class='interest-form' id='interest-form' novalidate>" +
      fields +
      "<button class='btn btn-primary' type='submit'>" +
      esc(ui.formSubmit || invite.ctaPrimary || "") +
      "</button>" +
      "<p class='form-status' id='form-status' role='status'></p></form></div></section>" +
      "<section class='section section--close' id='close' data-reveal>" +
      "<div class='wrap'>" +
      (close.headline ? "<h2>" + esc(close.headline) + "</h2>" : "") +
      (close.invitation ? "<p>" + esc(close.invitation) + "</p>" : "") +
      "<p><a class='btn btn-primary' href='#invite'>" +
      esc(close.ctaPrimary || ui.formSubmit || "") +
      "</a></p>" +
      (close.ctaNote ? "<p class='cta-note'>" + esc(close.ctaNote) + "</p>" : "") +
      "</div></section>"
    );
  }

  function field(label, name, type, required) {
    return (
      "<div class='field'><label for='" +
      name +
      "'>" +
      esc(label) +
      "</label><input id='" +
      name +
      "' name='" +
      name +
      "' type='" +
      type +
      "'" +
      (required ? " required" : "") +
      "></div>"
    );
  }

  function consent(label) {
    return (
      "<div class='field field-check'><label><input type='checkbox' name='consent' required> " +
      esc(label) +
      "</label></div>"
    );
  }

  function renderFooter(p) {
    var lines = ((p.footer && p.footer.lines) || []).filter(function (line) {
      return tidy(line) !== "";
    });
    var mail = lines.filter(function (line) {
      return line.indexOf("@") !== -1;
    })[0];
    var back = lines[lines.length - 1];
    var rest = lines.filter(function (line) {
      return line !== mail && line !== back;
    });
    return (
      rest
        .map(function (line) {
          return "<p>" + esc(line) + "</p>";
        })
        .join("") +
      (mail ? "<p><a href='mailto:" + esc(mail) + "'>" + esc(mail) + "</a></p>" : "") +
      "<p><a href='" +
      MAIN +
      "'>" +
      esc(back || (p.ui && p.ui.back) || "Back") +
      "</a></p>"
    );
  }

  function navLinks(p, cfg, ids) {
    var items = (p.nav && p.nav.items) || [];
    var all = cfg.navIds || [];
    var links = [];
    var i;
    for (i = 0; i < ids.length; i += 1) {
      var idx = all.indexOf(ids[i]);
      var label = idx >= 0 ? items[idx + 1] : ids[i];
      links.push({ href: "#" + ids[i], label: label || ids[i] });
    }
    return links;
  }

  function linkHtml(links) {
    return links
      .map(function (link) {
        return "<a href='" + esc(link.href) + "'>" + esc(link.label) + "</a>";
      })
      .join("");
  }

  function renderNav(p, cfg) {
    var items = (p.nav && p.nav.items) || [];
    var ids = cfg.navIds || [];
    var desktopIds = cfg.navDesktopIds || ids;
    var links = navLinks(p, cfg, ids);
    var deskLinks = navLinks(p, cfg, desktopIds);
    var desktop = $(".nav-desktop");
    if (desktop) desktop.innerHTML = linkHtml(deskLinks);
    var drawer = $(".nav-drawer-list");
    if (drawer) {
      var back = (p.ui && p.ui.back) || items[items.length - 1] || "Back";
      drawer.innerHTML =
        links
          .map(function (link) {
            return "<a href='" + esc(link.href) + "'>" + esc(link.label) + "</a>";
          })
          .join("") +
        "<a href='" +
        MAIN +
        "'>" +
        esc(back) +
        "</a>";
    }
  }

  function bindForm(p, cfg) {
    var form = $("#interest-form");
    var status = $("#form-status");
    if (!form || !status) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.textContent = "";
      status.className = "form-status";
      if (!form.reportValidity()) {
        status.textContent = (p.ui && p.ui.formErr) || "";
        status.classList.add("is-error");
        return;
      }
      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = String(value);
      });
      data.experience = cfg.id;
      data.stored = false;
      data.posted = false;
      var blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = cfg.formFile;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      form.reset();
      status.textContent = (p.ui && p.ui.formOk) || "";
    });
  }

  function reveal() {
    var nodes = document.querySelectorAll("#story [data-reveal], #hero-letter");
    var reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        node.classList.add("is-in");
      });
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  window.BKS_RENDER = function (lang) {
    var cfg = window.BKS_PAGE;
    if (!cfg) return;
    var p = pack(lang);
    renderHero(p, cfg);
    renderNav(p, cfg);
    var story = $("#story");
    if (story) {
      story.innerHTML = renderStory(p, cfg) + "<section id='ifs' class='bks-ifs' data-ifs-audience='" + (document.body.getAttribute("data-audience") || "nrb") + "'></section><section id='memories' class='bks-memories'></section>" + renderForm(p, cfg) + renderFaq(p);
    }
    var foot = $("#site-footer-inner");
    if (foot) foot.innerHTML = renderFooter(p);
    bindForm(p, cfg);
    reveal();
  };

  document.addEventListener("DOMContentLoaded", function () {
    var lang =
      window.BKS_CHROME && window.BKS_CHROME.readLang
        ? window.BKS_CHROME.readLang()
        : "en";
    window.BKS_RENDER(lang);
    var start = function () {
      loadHeroVideo();
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(start, { timeout: 1400 });
    } else {
      setTimeout(start, 500);
    }
  });
})();
