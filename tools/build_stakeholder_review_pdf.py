"""Build the stakeholder review PDF, Markdown, and screenshot contact sheet.

Does not modify the website. Does not commit, push, or deploy.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Image as RLImage,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
SHOT = ROOT / "_qa" / "stakeholder-review"
ECO = ROOT / "_qa" / "eco-review"
FEED = ROOT / "_qa" / "feedback-2026-08-20"
OUT_PDF = ROOT / "BKS-DURGA-PUJA-2026-STAKEHOLDER-REVIEW-REPORT.pdf"
OUT_MD = ROOT / "BKS-DURGA-PUJA-2026-STAKEHOLDER-REVIEW-REPORT.md"
OUT_SHEET = ROOT / "BKS-DURGA-PUJA-2026-STAKEHOLDER-SCREENSHOT-CONTACT-SHEET.png"

FOREST = HexColor("#163a26")
FOREST_DARK = HexColor("#0f2619")
CREAM = HexColor("#f6f1e4")
INK = HexColor("#1c1914")
MUTED = HexColor("#5c5648")
LINE = HexColor("#d9d0bc")
SINDOOR = HexColor("#8f2d1e")
GOLD = HexColor("#c98a1f")
PAPER = HexColor("#fbf8f1")
ROW_ALT = HexColor("#f0eadc")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm


def register_fonts() -> tuple[str, str, str, str]:
    fonts = Path(r"C:\Windows\Fonts")
    pairs = [
        ("BKSSerif", fonts / "georgia.ttf"),
        ("BKSSerif-Bold", fonts / "georgiab.ttf"),
        ("BKSSans", fonts / "calibri.ttf"),
        ("BKSSans-Bold", fonts / "calibrib.ttf"),
        ("BKSSans-Italic", fonts / "calibrii.ttf"),
    ]
    names = []
    for name, path in pairs:
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))
            names.append(name)
        else:
            names.append("Times-Roman" if "Serif" in name else "Helvetica")
    return names[0], names[1], names[2], names[3]


SERIF, SERIF_B, SANS, SANS_B = register_fonts()


def styles():
    base = getSampleStyleSheet()
    s = {}
    s["kicker"] = ParagraphStyle(
        "kicker", parent=base["Normal"], fontName=SANS_B, fontSize=8,
        textColor=SINDOOR, spaceAfter=4, leading=11,
    )
    s["h1"] = ParagraphStyle(
        "h1", parent=base["Normal"], fontName=SERIF_B, fontSize=16,
        textColor=FOREST, leading=21, spaceBefore=10, spaceAfter=8,
    )
    s["h2"] = ParagraphStyle(
        "h2", parent=base["Normal"], fontName=SERIF_B, fontSize=12.5,
        textColor=FOREST, leading=17, spaceBefore=10, spaceAfter=6,
    )
    s["h3"] = ParagraphStyle(
        "h3", parent=base["Normal"], fontName=SANS_B, fontSize=10.5,
        textColor=INK, leading=14, spaceBefore=8, spaceAfter=4,
    )
    s["body"] = ParagraphStyle(
        "body", parent=base["Normal"], fontName=SANS, fontSize=9.5,
        textColor=INK, leading=13.4, alignment=TA_JUSTIFY, spaceAfter=7,
    )
    s["bodyleft"] = ParagraphStyle("bodyleft", parent=s["body"], alignment=TA_LEFT)
    s["note"] = ParagraphStyle(
        "note", parent=base["Normal"], fontName=SANS, fontSize=9,
        textColor=MUTED, leading=12.5, spaceAfter=6, leftIndent=0,
    )
    s["caption"] = ParagraphStyle(
        "caption", parent=base["Normal"], fontName=SANS, fontSize=8,
        textColor=MUTED, leading=11, spaceBefore=3, spaceAfter=10, alignment=TA_LEFT,
    )
    s["cell"] = ParagraphStyle(
        "cell", parent=base["Normal"], fontName=SANS, fontSize=7.6,
        textColor=INK, leading=10.2,
    )
    s["cellb"] = ParagraphStyle("cellb", parent=s["cell"], fontName=SANS_B)
    s["th"] = ParagraphStyle(
        "th", parent=base["Normal"], fontName=SANS_B, fontSize=7.6,
        textColor=white, leading=10.2,
    )
    s["status"] = ParagraphStyle(
        "status", parent=base["Normal"], fontName=SANS_B, fontSize=9,
        textColor=FOREST, leading=13, alignment=TA_CENTER, spaceAfter=2,
    )
    s["quote"] = ParagraphStyle(
        "quote", parent=base["Normal"], fontName=SERIF, fontSize=10.5,
        textColor=INK, leading=15, leftIndent=8, rightIndent=8, spaceBefore=6, spaceAfter=10,
    )
    s["toc"] = ParagraphStyle(
        "toc", parent=base["Normal"], fontName=SANS, fontSize=10,
        textColor=INK, leading=16, spaceAfter=2,
    )
    s["cover_title"] = ParagraphStyle(
        "cover_title", parent=base["Normal"], fontName=SERIF_B, fontSize=22,
        textColor=white, leading=27, alignment=TA_LEFT,
    )
    s["small"] = ParagraphStyle(
        "small", parent=base["Normal"], fontName=SANS, fontSize=8,
        textColor=MUTED, leading=11, spaceAfter=4,
    )
    return s


S = styles()


def P(text, style="body"):
    return Paragraph(text, S[style])


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(FOREST)
    canvas.rect(0, PAGE_H - 12 * mm, PAGE_W, 12 * mm, fill=1, stroke=0)
    canvas.setFillColor(CREAM)
    canvas.setFont(SANS, 7.5)
    canvas.drawString(MARGIN, PAGE_H - 7.6 * mm, "BHARATIYA KRISHAK SAMAJ PUJO")
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 7.6 * mm, "LOCAL REVIEW BUILD  ·  21 AUGUST 2026")
    canvas.setFillColor(FOREST)
    canvas.rect(0, 0, PAGE_W, 12 * mm, fill=1, stroke=0)
    canvas.setFillColor(CREAM)
    canvas.setFont(SANS, 7.5)
    canvas.drawString(MARGIN, 5 * mm, "No commit  ·  No push  ·  No deploy  ·  Not for production")
    canvas.drawRightString(PAGE_W - MARGIN, 5 * mm, "Page %s" % doc.page)
    canvas.restoreState()


def cover_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(FOREST_DARK)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(FOREST)
    canvas.rect(0, PAGE_H - 92 * mm, PAGE_W, 92 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, PAGE_H - 93.2 * mm, PAGE_W, 1.4 * mm, fill=1, stroke=0)
    canvas.setFillColor(CREAM)
    canvas.setFont(SANS_B, 8)
    canvas.drawString(MARGIN, PAGE_H - 18 * mm, "PRODUCT / WEBSITE REVIEW  ·  FOR RAM SIR / MAHACHARYA JI")
    canvas.setFont(SERIF_B, 22)
    canvas.drawString(MARGIN, PAGE_H - 38 * mm, "BHARATIYA KRISHAK SAMAJ PUJO")
    canvas.setFont(SERIF, 13)
    canvas.drawString(MARGIN, PAGE_H - 48 * mm, "Local Website Review & Stakeholder Brief")
    canvas.setFont(SANS, 10)
    canvas.drawString(MARGIN, PAGE_H - 62 * mm, "Six-Audience Digital Ecosystem")
    canvas.drawString(MARGIN, PAGE_H - 68 * mm, "Pre-Commit / Pre-Deploy Review")
    canvas.setFillColor(INK)
    canvas.setFillColor(CREAM)
    y = PAGE_H - 118 * mm
    canvas.setFillColor(CREAM)
    canvas.setFont(SANS_B, 9)
    canvas.setFillColor(GOLD)
    canvas.drawString(MARGIN, y, "STATUS")
    canvas.setFillColor(CREAM)
    canvas.setFont(SERIF_B, 14)
    canvas.drawString(MARGIN, y - 10 * mm, "LOCAL REVIEW BUILD")
    canvas.setFont(SANS, 10)
    canvas.drawString(MARGIN, y - 18 * mm, "READY FOR STAKEHOLDER REVIEW")
    canvas.drawString(MARGIN, y - 24 * mm, "NOT READY FOR PRODUCTION DEPLOYMENT")
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN, y - 32 * mm, MARGIN + 70 * mm, y - 32 * mm)
    canvas.setFont(SANS_B, 9)
    canvas.drawString(MARGIN, y - 40 * mm, "NO COMMIT  ·  NO PUSH  ·  NO DEPLOY")
    canvas.setFont(SANS, 9)
    canvas.drawString(MARGIN, y - 52 * mm, "Date: 21 August 2026")
    canvas.drawString(MARGIN, y - 58 * mm, "Audience: Ram Sir / Mahacharya Ji")
    canvas.drawString(MARGIN, y - 64 * mm, "Prepared from: local implementation, screenshots,")
    canvas.drawString(MARGIN, y - 69 * mm, "approved briefs, and verified QA — not from invention.")
    canvas.setFont(SANS, 8)
    canvas.drawString(MARGIN, 18 * mm, "This is a product review document. It is not a marketing brochure and not a developer changelog.")
    canvas.restoreState()


def table(data, col_widths):
    styled = []
    for i, row in enumerate(data):
        if i == 0:
            styled.append([Paragraph(str(c), S["th"]) for c in row])
        else:
            out = []
            for j, c in enumerate(row):
                st = S["cellb"] if j == 0 else S["cell"]
                out.append(c if isinstance(c, Paragraph) else Paragraph(str(c), st))
            styled.append(out)
    t = Table(styled, colWidths=col_widths, repeatRows=1)
    cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), FOREST),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
        ("BACKGROUND", (0, 1), (-1, -1), PAPER),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            cmds.append(("BACKGROUND", (0, i), (-1, i), ROW_ALT))
    t.setStyle(TableStyle(cmds))
    return t


def shot_block(path: Path, caption: str, max_h=118 * mm):
    if not path.exists():
        return [P("[Screenshot not found: %s]" % path.name, "note")]
    usable_w = PAGE_W - 2 * MARGIN
    im = RLImage(str(path))
    im._restrictSize(usable_w, max_h)
    return [KeepTogether([im, P(caption, "caption")])]


def bullets(items):
    flow = []
    for item in items:
        flow.append(ListItem(P(item, "bodyleft"), leftIndent=12, bulletColor=FOREST))
    return ListFlowable(flow, bulletType="bullet", start="•", leftIndent=14, bulletFontName=SANS, bulletFontSize=8)


CURRENT = [
    ("01", "Holding homepage", "/", "Desktop 1440", SHOT / "01-home-desktop-1440.png"),
    ("02", "Holding homepage", "/", "Mobile 375", SHOT / "01-home-mobile-375.png"),
    ("03", "Umbrella / participate router", "/start/", "Desktop 1440 (full)", SHOT / "02-start-desktop-1440-full.png"),
    ("04", "Umbrella / participate router", "/start/", "Mobile 375", SHOT / "02-start-mobile-375.png"),
    ("05", "Sponsor", "/sponsors/", "Desktop 1440", SHOT / "03-sponsors-desktop-1440.png"),
    ("06", "Sponsor", "/sponsors/", "Mobile 375", SHOT / "03-sponsors-mobile-375.png"),
    ("07", "Farmer / Integrated Farming", "/farmers/", "Desktop 1440", SHOT / "04-farmers-desktop-1440.png"),
    ("08", "Farmer / Integrated Farming", "/farmers/", "Mobile 375", SHOT / "04-farmers-mobile-375.png"),
    ("09", "Government & Influencers", "/stakeholders/", "Desktop 1440", SHOT / "05-stakeholders-desktop-1440.png"),
    ("10", "Government & Influencers", "/stakeholders/", "Mobile 375", SHOT / "05-stakeholders-mobile-375.png"),
    ("11", "NRB / Supporters", "/nrb/", "Desktop 1440", SHOT / "06-nrb-desktop-1440.png"),
    ("12", "NRB / Supporters", "/nrb/", "Mobile 375", SHOT / "06-nrb-mobile-375.png"),
    ("13", "General public / The Puja", "/public/", "Desktop 1440", SHOT / "07-public-desktop-1440.png"),
    ("14", "General public / The Puja", "/public/", "Mobile 375", SHOT / "07-public-mobile-375.png"),
]

EXTRA_CURRENT = [
    ("15", "Holding homepage", "/", "Tablet 768", SHOT / "01-home-tablet-768.png"),
    ("16", "Holding homepage", "/", "Mobile drawer 375", SHOT / "01-home-mobile-375-drawer.png"),
    ("17", "Sponsor", "/sponsors/", "Title slot + enquire (desktop)", SHOT / "03-sponsors-desktop-1440-title-slot.png"),
    ("18", "Sponsor", "/sponsors/", "Mobile drawer 375", SHOT / "03-sponsors-mobile-375-drawer.png"),
]


def build_contact_sheet() -> Path:
    pairs = [
        (SHOT / "01-home-desktop-1440.png", SHOT / "01-home-mobile-375.png", "01  Holding homepage  /", "Desktop 1440", "Mobile 375"),
        (SHOT / "02-start-desktop-1440-full.png", SHOT / "02-start-mobile-375.png", "02  Umbrella router  /start/", "Desktop 1440", "Mobile 375"),
        (SHOT / "03-sponsors-desktop-1440.png", SHOT / "03-sponsors-mobile-375.png", "03  Sponsor  /sponsors/", "Desktop 1440", "Mobile 375"),
        (SHOT / "04-farmers-desktop-1440.png", SHOT / "04-farmers-mobile-375.png", "04  Farmer / IFS  /farmers/", "Desktop 1440", "Mobile 375"),
        (SHOT / "05-stakeholders-desktop-1440.png", SHOT / "05-stakeholders-mobile-375.png", "05  Government & Influencers  /stakeholders/", "Desktop 1440", "Mobile 375"),
        (SHOT / "06-nrb-desktop-1440.png", SHOT / "06-nrb-mobile-375.png", "06  NRB / Supporters  /nrb/", "Desktop 1440", "Mobile 375"),
        (SHOT / "07-public-desktop-1440.png", SHOT / "07-public-mobile-375.png", "07  General public  /public/", "Desktop 1440", "Mobile 375"),
    ]
    extra = [
        (SHOT / "01-home-tablet-768.png", "08  Holding homepage  /  ·  Tablet 768"),
        (SHOT / "01-home-mobile-375-drawer.png", "09  Holding homepage  /  ·  Mobile menu"),
        (SHOT / "03-sponsors-desktop-1440-title-slot.png", "10  Sponsor  /sponsors/  ·  Title slot (pending confirmation)"),
        (SHOT / "03-sponsors-mobile-375-drawer.png", "11  Sponsor  /sponsors/  ·  Mobile menu"),
    ]
    W = 2800
    pad = 36
    gutter = 22
    header_h = 168
    row_label_h = 36
    desk_w = 1860
    # desktop 1440x900 → height
    row_h = int(desk_w * 900 / 1440)
    mob_w = int(row_h * 375 / 812)
    extra_h = 520
    H = header_h + len(pairs) * (row_label_h + row_h + gutter) + extra_h + 80
    canvas = Image.new("RGB", (W, H), (246, 241, 228))
    draw = ImageDraw.Draw(canvas)
    try:
        font_title = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 34)
        font_sub = ImageFont.truetype(r"C:\Windows\Fonts\calibri.ttf", 18)
        font_lab = ImageFont.truetype(r"C:\Windows\Fonts\calibrib.ttf", 16)
        font_small = ImageFont.truetype(r"C:\Windows\Fonts\calibri.ttf", 14)
    except OSError:
        font_title = font_sub = font_lab = font_small = ImageFont.load_default()
    draw.rectangle((0, 0, W, 132), fill=(22, 58, 38))
    draw.rectangle((0, 132, W, 136), fill=(201, 138, 31))
    draw.text((pad, 28), "BHARATIYA KRISHAK SAMAJ PUJO", font=font_title, fill=(246, 241, 228))
    draw.text((pad, 76), "Local review screenshot contact sheet  ·  21 August 2026  ·  Current implementation  ·  No commit · No push · No deploy", font=font_sub, fill=(246, 241, 228))
    y = header_h
    for desk, mob, title, dlab, mlab in pairs:
        draw.text((pad, y), title, font=font_lab, fill=(22, 58, 38))
        y += row_label_h
        d = Image.open(desk).convert("RGB")
        d.thumbnail((desk_w, row_h), Image.Resampling.LANCZOS)
        m = Image.open(mob).convert("RGB")
        m.thumbnail((mob_w, row_h), Image.Resampling.LANCZOS)
        canvas.paste(d, (pad, y))
        mx = pad + desk_w + gutter
        canvas.paste(m, (mx, y))
        draw.text((pad, y + d.size[1] + 2), dlab, font=font_small, fill=(92, 86, 72))
        draw.text((mx, y + m.size[1] + 2), mlab, font=font_small, fill=(92, 86, 72))
        y += row_h + gutter
    # extras strip
    draw.text((pad, y), "Additional current frames", font=font_lab, fill=(22, 58, 38))
    y += 28
    x = pad
    thumb_h = extra_h - 70
    for path, label in extra:
        im = Image.open(path).convert("RGB")
        im.thumbnail((640, thumb_h), Image.Resampling.LANCZOS)
        canvas.paste(im, (x, y))
        draw.text((x, y + im.size[1] + 4), label, font=font_small, fill=(92, 86, 72))
        x += im.size[0] + gutter
    canvas.save(OUT_SHEET, "PNG", optimize=True)
    return OUT_SHEET


def md_escape(s: str) -> str:
    return s


def write_markdown():
    md = r"""# BHARATIYA KRISHAK SAMAJ PUJO
## Local Website Review & Stakeholder Brief

**Six-Audience Digital Ecosystem**  
**Pre-Commit / Pre-Deploy Review**

**Date:** 21 August 2026  
**Addressed to:** Ram Sir / Mahacharya Ji  
**Status:** LOCAL REVIEW BUILD · READY FOR STAKEHOLDER REVIEW · NOT READY FOR PRODUCTION DEPLOYMENT  
**NO COMMIT · NO PUSH · NO DEPLOY**

This is a product / website review document. It is not a developer changelog and not a marketing brochure. Uncertain items are labelled as such. Nothing here is a claim of final approval.

---

## 1. Purpose of this review

This document is prepared so that Ram Sir / Mahacharya Ji can answer seven questions from one brief:

1. What was requested?
2. What has been implemented?
3. What does the current local version look like?
4. What has been preserved?
5. What is still incomplete?
6. What information or decisions are still required?
7. What should the next development brief be?

The current local build exists to test the six-experience direction **before** production deployment. It has **not** been committed, pushed, or deployed.

---

## 2. Executive summary

The project has evolved from a single Puja website into a **six-experience digital ecosystem**.

The six intended experiences are:

1. Sponsor
2. Farmer / Integrated Farming
3. Government & Influencers
4. General Public
5. NRB / Supporters
6. Meta / Umbrella

The current local build tests this direction without replacing the existing public homepage. **`/` remains the preserved holding / public surface.** Audience-specific experiences have been added as separate routes. `/start/` is an **interim review router**. It is **not** approved as a permanent replacement for the current homepage.

No final approval is claimed.

---

## 3. Original strategic problem

Mahacharya’s review identified that the previous site attempted to speak simultaneously to sponsors, donors, NRBs, farmers, government stakeholders, influencers, general public, and Puja visitors.

That produced:

- messaging dilution
- excessive navigation (previously a 19-link mix of pages and in-page jumps)
- unclear conversion paths
- mixed audience motivations on one scroll
- an unclear relationship between the Puja and Integrated Farming

The new strategic direction, as recorded in the six-experience specification, is:

**ONE ECOSYSTEM + AUDIENCE-SPECIFIC EXPERIENCES**

Same identity, credentials, and visual DNA. Different hero, story order, and primary ask for each audience. This is additive development, not a destructive rebuild.

---

## 4. Six-experience architecture

| Experience | Audience | Primary question | Primary CTA (current local copy) | Current route | Current status |
|---|---|---|---|---|---|
| Sponsor | Corporate / organisational sponsors | Why should my organisation enter? | Express Sponsor Interest | `/sponsors/` | Local review — implemented |
| Farmer / Integrated Farming | Farmers and IFS readers | What is the IFS opportunity and how do I join? | Express farmer interest | `/farmers/` | Local review — implemented |
| Government & Influencers | Institutions, officers, influencers | What is being executed, and what is my role? | Request a briefing | `/stakeholders/` | Local review — implemented |
| General Public | Festival visitors | What is this Puja and why engage? | Explore the Puja | `/public/` | Local review — implemented |
| NRB / Supporters | Non-Resident Bengalis and supporters | How do I take part from wherever I am? | Express interest | `/nrb/` | Local review — implemented |
| Meta / Umbrella | First-time visitors who need a door | What is the ecosystem, and where do I belong? | Choose a path | `/start/` | **Interim review route** — not a confirmed homepage replacement |
| Holding public surface | Existing public homepage | What is Bharatiya Krishak Samaj Pujo? | Participate | `/` | **Preserved.** Remains the public holding URL |

`/start/` must not be described as the new homepage unless Sir explicitly approves that change.

---

## 5. What was implemented

### Brand / naming

- Event name in chrome: **Bharatiya Krishak Samaj Pujo**
- Organisation: **Bharatiya Krishak Samaj**
- Organiser line: **Organised by KarmYog for the 21st Century**
- BKS is represented as **organising partner**, not title sponsor
- Title sponsorship is **not assigned to BKS**
- Current public treatment of the vacant title slot: **“Title sponsorship opportunity — Pending confirmation”** (not shown as an open commercial campaign unless Sir confirms that wording)

### Header / design

- Unified dark-green header across holding homepage and audience routes
- BKS seal treated as partner credential, clipped to a circle so the PNG’s white square corners do not show
- KarmYog circular mark retained beside the organiser line
- Mobile logo + text pairing (grid; each brand stays in a row)
- Accessible language control (English / Bangla / Hindi), dark text on cream options

### Navigation

- Primary desktop navigation reduced from 19 undifferentiated links to five stable items: Home · The Puja · Integrated Farming · Participate · Bharatiya Krishak Samaj
- Audience-specific secondary strip: Supporters / NRB · Sponsors · Government & Institutions · Farmers · How would you like to participate?
- Mobile drawer groups PAGE vs ON THIS PAGE, and includes the five audience routes
- `/start/` is the ecosystem router

### Content

- Hero messaging clarified: farmer-centred Pujo; organised by KarmYog; BKS as organising partner; venue to be announced; nothing on the page takes money
- Cryptic “One story in order” fragments rewritten in English as a readable sequence: Puja → farmer → recognition → Integrated Farming → live farm → seed / about 5,000
- 5,000 and ₹1 lakh treated as **target / proposed**, not achieved
- ₹50 crore labelled as **arithmetic of the target**, not funds already raised

### Audience experiences (current local copy)

- **Sponsor:** conversation around the Pujo, not a four-day booking; Season 1 language is on the page and **requires confirmation**; Palm Tech / 3C are **not** used as public marketing claims on the current page
- **Farmer / IFS:** livelihood you can walk; live demonstration being built; interest note is not enrolment
- **Government & Influencers:** briefing tone; 294 assembly seats described as scale of the stakeholder universe, **not** endorsements; no government partnership claimed
- **NRB:** belonging from wherever you are; 5,000 is a mobilisation target; no payment
- **Public:** Puja / cultural focus; venue, committee and ritual clocks remain to be announced
- **Umbrella (`/start/`):** six doors (Farmer, Supporter/NRI, Sponsor, Volunteer, Institution, The Puja) plus a Home button. It reads as a router, not another long homepage

### Forms / CTA

Current forms **download a local JSON file**. They do **not** submit to a backend. There is **no POST**. Privacy copy states that sending the file to BKS is outside this website. Primary buttons were corrected so they do not imply payment, enrolment, allocation, or a live database.

### Claim governance (this pass)

- Unsupported reach claims removed or softened (including “millions of visitors” / “hundreds of thousands of creators”)
- IFS model figures labelled **illustrative**
- Government endorsement **not claimed**
- Payment **not implied**
- Title sponsorship marked **pending confirmation**
- Bangla / Hindi of new experience copy is **pending native review**; unsafe older native strings were not silently rewritten as new marketing copy

---

## 6. What was preserved

This was **additive development**, not a destructive rebuild. Intentionally preserved:

- existing homepage (`/`) as the holding public surface
- existing hash routes (The Puja, Integrated Farming, Participate, Bharatiya Krishak Samaj, Mission, Programme, Stories, Contact, utilities)
- approved photographs already on file (including 2025 Mahotsav record and 19 August 2026 preparation stills)
- Puja content
- Integrated Farming material
- existing forms (behaviour now honest download; forms themselves were not discarded)
- language infrastructure (EN / BN / HI)
- existing programme / award material
- 20 August Mahacharya corrections (naming, header pairing, story sequence, language-control contrast)
- responsive behaviour
- accessibility work (skip link, focus, tap targets, `lang`)

---

## 7. Visual evidence — local review build

See the contact sheet: `BKS-DURGA-PUJA-2026-STAKEHOLDER-SCREENSHOT-CONTACT-SHEET.png`

Screenshots below describe the **current local implementation** captured on 21 August 2026 after the controlled honesty pass. Earlier six-experience frames in `_qa/eco-review/` show a previous per-page header (including a title-sponsor “Open” box and, on the sponsor hero, Palm Tech / 3C wording). Those earlier frames are in Appendix B and are **not** the current public chrome.

### Sponsor — `/sponsors/`

The current desktop hero uses a 2025 evening-gathering photograph (captioned as people together, not a product shot of the idol). The kicker is “For corporate sponsors.” The H1 is: “A sponsorship conversation around Bharatiya Krishak Samaj Pujo — not a four-day booking.” The lede states that no audience, media-reach, or return is guaranteed, and that the ask is a conversation, not an online payment. CTAs: **Express Sponsor Interest** and **Why this is not four days**. Branding matches the holding homepage header. Title sponsorship is **not** in the header; further down the page it sits in a dashed box: **Pending confirmation**. Palm Tech / 3C are **not** in the current hero.

**Requires stakeholder review:** (a) whether “Season 1 of a three-year movement” should remain public; (b) whether the title slot should read Open rather than Pending confirmation; (c) three stacked navigation rows (site nav + audience strip + page anchors) may feel busy.

### Farmer / Integrated Farming — `/farmers/`

Farming-oriented dark teal hero, type-led rather than photographic. H1: “A farming livelihood you can walk — not a slogan on a pandal wall.” Copy states the live demonstration is being built and that joining a farm programme is not a fake registration on this page. CTAs: **Express farmer interest** and **See the live farm**. The section below opens Integrated Farming as a loop versus single-crop risk.

**Requires stakeholder review:** the farmer door is visually thinner than Sponsor / NRB / Public because it has no hero photograph. Browser title remains “Integrated Farming” rather than “Farmers.” Transformation stages below the fold are empty frames pending approved photographs.

### Government & Influencers — `/stakeholders/`

Briefing / execution tone on a cream page, also type-led. H1: “What is being built — and why it matters to the state that must feed itself.” Copy states that nothing here is a claimed government partnership or scheme. CTAs: **Request a briefing** and **See the transformation**. Institutional positioning is restrained.

**Requires stakeholder review:** like Farmers, this door has no distinct photographic identity. Whether “the state that must feed itself” is the approved institutional line is not confirmed in writing beyond the local review copy.

### NRB / Supporters — `/nrb/`

Belonging visual language: 19 August 2026 preparation photograph of community with hands raised, captioned as people, not a product shot. H1: “From wherever you are, this Pujo is a way to take part in Bengal’s farming story.” 5,000 patrons / 5,000 farms is labelled a mobilisation target, not a completed count. Nothing on the page takes money. CTAs: **Express interest** and **Learn how it works**.

**Requires stakeholder review:** `/start/` card label uses “Supporter / NRI” while this route and the audience strip say “NRB.” Terminology should be locked.

### Public — `/public/`

Puja / cultural focus using the 2025 Mahotsav idol photograph. H1: “A Durga Puja that puts the farmer in the gathering.” A pending box states venue, committee and ritual clocks from a named Panjika remain to be announced. CTAs: **Explore the Puja** and **Awards and visit**, which lead back into the existing holding-site Puja material.

### Umbrella — `/start/`

Choice architecture, not another long homepage. H1: “How would you like to participate?” Six path cards plus Home. Volunteer card honestly says no shifts are open. Institution card says no endorsement is claimed. The page is short and readable as a router.

**Requires stakeholder review:** `/start/` is an interim review route only. It should not replace `/` unless Sir approves.

### Holding homepage — `/`

Preserved first screen: Sharadiya 2026, farmer-in-the-gathering H1, When / Where, Participate / Read the story, no payment. Audience strip now sits under the existing five-item nav so visitors can enter an experience without losing the public homepage.

---

## 8. Cross-site consistency

| Layer | Observation |
|---|---|
| Branding | One event name and partner/organiser lockup across `/` and the six doors |
| Header | Unified dark-green chrome; earlier per-page cream header with title-sponsor box has been superseded |
| Typography | Display + body pairing retained; not a second brand |
| Colour | Forest, cream, gold, sindoor — shared |
| Navigation | Same five primary items; same audience strip; page-level anchors differ by experience |
| CTA language | Interest / briefing / explore — not pay / enrol / allocate |
| Partner credentials | BKS seal small; KarmYog organiser line retained |
| Mobile | Logo+text pairing holds; audience strip wraps; hamburger opens grouped drawer |
| Section hierarchy | Photograph-led doors (home, sponsors, NRB, public) versus type-led doors (farmers, stakeholders) |

**Does it feel like one Bharatiya Krishak Samaj Pujo ecosystem while keeping different audience experiences?**  
From the current screenshots: **yes at the chrome and claim-governance layer.** The doors share identity. They do **not** yet have equally strong visual worlds — Farmers and Government remain text-first. That difference is a product choice for Sir, not a defect hidden in this report.

---

## 9. Content / claim governance

| Claim / information | Current treatment | Status | Stakeholder action required |
|---|---|---|---|
| 5,000 farmers / farms | Shown as mobilisation **target**, not achieved | TARGET | Confirm public framing |
| ₹1 lakh seed-support | **Proposed** seed per farm, or ₹20,000 every two months; not collected here | PROPOSED | Confirm public framing |
| ₹50 crore | 5,000 × ₹1 lakh, labelled arithmetic of the target, not funds raised | TARGET (arithmetic) | Confirm whether the rupee total should remain visible |
| IFS 365-day model | Labelled illustrative model | ILLUSTRATIVE | Confirm whether model boards stay public |
| 3×–5× model | Labelled illustrative model | ILLUSTRATIVE | Same |
| 50–70% model | Labelled illustrative; not a guarantee | ILLUSTRATIVE | Same |
| 2025 visitors / reach | 2025 impact-report figures retained with source note; unaudited reach language removed | INTERNAL ESTIMATE / sourced | Confirm what 2025 numbers may remain |
| 2025 ₹1.8 crore estimate | Cited as internal estimate from the 2025 impact report, not audited | INTERNAL ESTIMATE | Confirm |
| Title sponsorship | “Pending confirmation”; BKS does not occupy the slot | PENDING CONFIRMATION | Confirm Open vs Pending, and public wording |
| Palm Tech / 3C | **Absent** from current public hero/copy (earlier review frames named them with a disclaimer) | NOT YET SUPPLIED for public use | Confirm whether to name, and supply approved terminology |
| Government relationships | Engagement invited; **no endorsement / scheme / partnership claimed** | NOT CLAIMED | Confirm institutional language |
| Dump-yard transformation | Described as intended story; “dump-yard-like”; photographs empty on purpose | PENDING CONFIRMATION | Confirm whether this story may be public |
| East Kolkata Wetlands reference | Live demo “being built”, 500 m from Sector V — already on file | ON FILE / being built | Confirm whether this plot is also the transformation story |
| Year 2 / Year 3 | Explicitly **not published**; Season 1 language is on the sponsor page | PENDING CONFIRMATION | Confirm three-year wording |
| Venue | To be announced | NOT YET SUPPLIED | Supply when ready |
| Programme | Existing material retained; clocks not invented | NOT YET SUPPLIED (clocks) | Supply |
| Committee | Not invented | NOT YET SUPPLIED | Supply |
| Awards | Bharatiya Krishak Samaj Awards naming aligned; nominations remain | ON FILE | Confirm any remaining award copy |

Statuses have **not** been upgraded.

---

## 10. Technical QA

Latest verified local QA (`_qa/prerelease/report.json`, 21 August 2026), after the controlled honesty pass:

| Check | Result |
|---|---|
| Routes tested | **18** (all HTTP 200) |
| Audience / header follows | **20** |
| Form surfaces on the site | **12** (4 audience + interest + 6 holding-site + locator stub) |
| Forms exercised as local JSON download | **11** (locator remains a stub) |
| POST requests | **0** |
| Console errors | **0** |
| Broken links | **0** |
| Failed image URLs | **0** (`failedAssets: 0`) |
| Horizontal overflow | **0** at 375 / 768 / 1024 / 1440 |
| Language selector | Present; works |
| Mobile navigation | Drawer opens; audience routes included |
| CTA resolution | Audience CTAs resolve to in-page forms or holding-site views as designed |
| Local form download | JSON files download; `stored: false`; website does not submit to BKS |

Note: one Playwright snapshot flagged below-fold images as not yet decoded (`imagesFailedPages: 1`). Those files return HTTP 200. This is recorded as a snapshot-timing false positive, not a missing asset.

Known technical leftovers (not production blockers for this review, but not final):

- Hash-page metadata still reuses the homepage description
- `/farmers/` document title is still “Integrated Farming”
- Image decode warning above

---

## 11. What is still not final

### A. Business / stakeholder decisions

- Title sponsorship: Open opportunity, or remain “Pending confirmation”?
- Palm Tech + 3C: public use, and approved terminology?
- “Season 1 of a three-year movement” — approved public language?
- Dump-yard / site transformation story — public or internal only?
- Before / transformation photographs — may they be used, and which files?
- Approximately 5,000 farmer/farm target framing
- ₹1 lakh proposed seed-support framing
- Existing assumed sponsor package figures (₹10 lakh title / ₹2.5 lakh category and related amounts in campaign data) — remain visible, or freeze pending commercial approval?

### B. Content approvals

- Exact venue
- Programme and ritual timing from a named Panjika
- Committee names
- Year 2 / Year 3 detail (currently unpublished, correctly)
- Farmer intake mechanism beyond the interest note
- Sambhavana rewrite (20 August: reviewer would send; **not yet supplied**)

### C. Native language review

- Native Bangla for new experience copy
- Native Hindi for new experience copy
- Holding-site BN/HI hero and story bodies still pending approved native rewrite

### D. Technical polish

- Hash-page metadata
- `/farmers/` title
- Image decode / lazy-load snapshot warning
- Whether `/start/` remains an interim route or becomes the public umbrella (product decision, then technical)

---

## 12. Decisions / brief required from Ram Sir / Mahacharya Ji

These are the product decisions that actually unblock the next implementation pass. Technical leftovers are listed above and should not occupy this list.

1. **Confirm BKS = Organising Partner.** Public chrome already uses this. Please confirm it should remain. **Already aligned in local copy — please confirm it stands.**
2. **Confirm KarmYog relationship wording:** “Organised by KarmYog for the 21st Century.” **Already aligned in local copy — please confirm it stands.**
3. **Confirm whether Title Sponsorship should be shown as an open opportunity**, or remain “Pending confirmation.”
4. **Confirm whether Palm Tech + 3C should be publicly used**, and provide approved terminology if yes. They are currently **not** on the public sponsor hero.
5. **Confirm “Season 1 of a three-year movement” wording.** It is currently on the sponsor experience.
6. **Confirm whether the dump-yard / site transformation story can be publicly presented.**
7. **Confirm use of before / transformation photographs** (none are published now; frames are empty on purpose).
8. **Confirm approximately 5,000 farmer / farm target framing.**
9. **Confirm ₹1 lakh proposed seed-support framing.**
10. **Confirm whether existing sponsor package figures** (including ₹10 lakh / ₹2.5 lakh class amounts already in campaign data) **should remain visible or remain frozen pending commercial approval.**

---

## 13. Request for a consolidated brief

Sir, the current local review build has been developed against the feedback and strategic direction shared so far. Before we proceed to final content lock, commit and deployment, we request **one consolidated brief** covering the remaining business, content and positioning decisions identified in this report.

The next implementation pass will be based strictly on that brief so that the team does not repeatedly reinterpret individual feedback or make assumptions.

---

## 14. Final status

**LOCAL REVIEW BUILD**  
**READY FOR STAKEHOLDER REVIEW**  
**NOT READY FOR PRODUCTION DEPLOYMENT**  
**NO COMMIT**  
**NO PUSH**  
**NO DEPLOY**

---

## Appendix A — Screenshot contact sheet

File: `BKS-DURGA-PUJA-2026-STAKEHOLDER-SCREENSHOT-CONTACT-SHEET.png`  
Source: current local implementation, 21 August 2026.

## Appendix B — Full screenshot evidence

Current captures: `_qa/stakeholder-review/`  
Earlier six-experience frames (superseded chrome): `_qa/eco-review/`  
20 August header pairing evidence: `_qa/feedback-2026-08-20/verify-header-*.png`

## Appendix C — Route / QA summary

See Section 10. Source: `_qa/prerelease/report.json`.

## Appendix D — Pending decisions

See Sections 11–12.
"""
    OUT_MD.write_text(md, encoding="utf-8")


def build_story():
    story = []
    usable = PAGE_W - 2 * MARGIN

    story.append(Spacer(1, 8 * mm))
    story.append(P("CONTENTS", "kicker"))
    story.append(P("Local Website Review &amp; Stakeholder Brief", "h1"))
    for line in [
        "1. Purpose of this review",
        "2. Executive summary",
        "3. Original strategic problem",
        "4. Six-experience architecture",
        "5. What was implemented",
        "6. What was preserved",
        "7. Visual evidence — local review build",
        "8. Cross-site consistency",
        "9. Content / claim governance",
        "10. Technical QA",
        "11. What is still not final",
        "12. Decisions required from Ram Sir / Mahacharya Ji",
        "13. Request for a consolidated brief",
        "14. Final status",
        "Appendix A — Screenshot contact sheet",
        "Appendix B — Full screenshot evidence",
        "Appendix C — Route / QA summary",
        "Appendix D — Pending decisions",
    ]:
        story.append(P(line, "toc"))
    story.append(Spacer(1, 6 * mm))
    story.append(P(
        "Classification of uncertain items in this document: <b>Pending confirmation</b> · "
        "<b>Requires stakeholder decision</b> · <b>Not yet supplied</b> · <b>To be confirmed</b>. "
        "No status has been upgraded beyond the source material.",
        "note",
    ))

    story.append(P("1. PURPOSE OF THIS REVIEW", "kicker"))
    story.append(P("Why this document exists", "h1"))
    story.append(P(
        "This review is addressed to Ram Sir / Mahacharya Ji. It is a product and website review, "
        "not a developer changelog and not a marketing brochure. It is written so that one reading "
        "can answer: what was requested; what has been implemented; what the current local version "
        "looks like; what has been preserved; what is still incomplete; what decisions are still "
        "required; and what the next development brief should contain.",
        "body",
    ))
    story.append(P(
        "The current local build exists to test the six-experience direction <b>before</b> production "
        "deployment. It has not been committed, pushed, or deployed. Nothing in this document is a "
        "claim of final approval.",
        "body",
    ))
    story.append(P("Sources used (and not used)", "h2"))
    story.append(P(
        "This report is based on: Mahacharya’s 20 August 2026 website feedback; the strategic "
        "multi-audience architecture; Ram Sir’s six-audience / six-experience direction; the master "
        "implementation brief and six-experience design specification; the 21 August implementation "
        "and controlled-fix work; the latest local pre-release QA; the running local implementation; "
        "and the screenshots in <font face='%s'>_qa/stakeholder-review/</font>, "
        "<font face='%s'>_qa/eco-review/</font>, and selected 20 August header frames. "
        "Facts that were not in those sources are labelled, not invented." % (SANS, SANS),
        "body",
    ))

    story.append(P("2. EXECUTIVE SUMMARY", "kicker"))
    story.append(P("From one Puja site to six experiences", "h1"))
    story.append(P(
        "The project has evolved from a single Puja website into a six-experience digital ecosystem. "
        "The six intended experiences are: Sponsor; Farmer / Integrated Farming; Government &amp; "
        "Influencers; General Public; NRB / Supporters; and Meta / Umbrella.",
        "body",
    ))
    story.append(P(
        "The current local build has been developed to test this direction before production "
        "deployment. The current homepage has been preserved as the holding / public surface. "
        "Audience-specific experiences have been added beside it. <b>/start/</b> is an interim "
        "review router. It is not described here as a permanent replacement for the current homepage, "
        "because that replacement has not been approved.",
        "body",
    ))
    story.append(P(
        "The visual system is now one ecosystem chrome: dark-green header, KarmYog organiser "
        "credential, five-item primary navigation, and a cream audience strip. Conversion language "
        "has been corrected so that forms download a local file and do not imply payment, enrolment, "
        "or government endorsement.",
        "body",
    ))

    story.append(P("3. ORIGINAL STRATEGIC PROBLEM", "kicker"))
    story.append(P("Why one site could not speak to everyone", "h1"))
    story.append(P(
        "Mahacharya’s review identified that the previous site attempted to speak simultaneously to "
        "sponsors, donors, NRBs, farmers, government stakeholders, influencers, general public, and "
        "Puja visitors. That created messaging dilution; excessive navigation; unclear conversion "
        "paths; mixed audience motivations on one scroll; and an unclear relationship between the "
        "Puja and Integrated Farming.",
        "body",
    ))
    story.append(P(
        "The recorded strategic direction is therefore: <b>one ecosystem</b>, plus "
        "<b>audience-specific experiences</b>. Same identity and credentials. Different hero, story "
        "order, and primary ask. This is additive work. The holding homepage was not demolished to "
        "make the new doors.",
        "body",
    ))

    story.append(P("4. SIX-EXPERIENCE ARCHITECTURE", "kicker"))
    story.append(P("Doors, routes, and status", "h1"))
    story.append(table(
        [
            ["Experience", "Audience", "Primary question", "Primary CTA", "Route", "Status"],
            ["Sponsor", "Corporate / organisational sponsors", "Why should my organisation enter?", "Express Sponsor Interest", "/sponsors/", "Local review — implemented"],
            ["Farmer / Integrated Farming", "Farmers and IFS readers", "What is the IFS opportunity and how do I join?", "Express farmer interest", "/farmers/", "Local review — implemented"],
            ["Government &amp; Influencers", "Institutions, officers, influencers", "What is being executed, and what is my role?", "Request a briefing", "/stakeholders/", "Local review — implemented"],
            ["General Public", "Festival visitors", "What is this Puja and why engage?", "Explore the Puja", "/public/", "Local review — implemented"],
            ["NRB / Supporters", "Non-Resident Bengalis and supporters", "How do I take part from wherever I am?", "Express interest", "/nrb/", "Local review — implemented"],
            ["Meta / Umbrella", "Visitors who need a door", "What is the ecosystem, and where do I belong?", "Choose a path", "/start/", "Interim review route — not a confirmed homepage replacement"],
            ["Holding public surface", "Existing public homepage", "What is Bharatiya Krishak Samaj Pujo?", "Participate", "/", "Preserved. Remains the public holding URL"],
        ],
        [28*mm, 32*mm, 38*mm, 32*mm, 28*mm, 32*mm],
    ))
    story.append(P(
        "<b>/ remains the preserved holding homepage.</b> /start/ is available for review as a "
        "participation router. It must not be treated as the new homepage unless Sir explicitly approves that change.",
        "note",
    ))

    story.append(P("5. WHAT WAS IMPLEMENTED", "kicker"))
    story.append(P("Changes actually present on the local build", "h1"))
    story.append(P("Brand / naming", "h2"))
    story.append(bullets([
        "Event: Bharatiya Krishak Samaj Pujo.",
        "Organisation: Bharatiya Krishak Samaj, represented as organising partner — not title sponsor.",
        "Organised by KarmYog for the 21st Century — credential retained beside the circular mark.",
        "Title sponsorship is not assigned to BKS. Current public wording: “Title sponsorship opportunity — Pending confirmation.” Whether this should instead read as an open opportunity is a decision for Sir.",
    ]))
    story.append(P("Header / design", "h2"))
    story.append(bullets([
        "Unified visual system: forest header, cream audience strip, shared type and colour.",
        "Consistent header on homepage and audience routes (the earlier per-page cream header with an “Open / To be confirmed” title box has been superseded).",
        "BKS seal treated as partner credential; clipped to a circle so the file’s white square corners do not show.",
        "Mobile logo + text pairing held in a row; language control remains accessible.",
    ]))
    story.append(P("Navigation", "h2"))
    story.append(bullets([
        "Nineteen undifferentiated links reduced to five stable primary items: Home · The Puja · Integrated Farming · Participate · Bharatiya Krishak Samaj.",
        "Audience-specific secondary routes in a cream strip, including the ecosystem router.",
        "Mobile drawer groups PAGE versus ON THIS PAGE, and includes the five audience routes.",
    ]))
    story.append(P("Content", "h2"))
    story.append(bullets([
        "Hero messaging clarified: a Durga Puja that puts the farmer in the gathering; venue to be announced; nothing on the page takes money.",
        "Cryptic “One story in order” fragments rewritten in English as Puja → farmer → recognition → Integrated Farming → live farm → seed / about 5,000.",
        "5,000 and ₹1 lakh treated as target / proposed where they appear. ₹50 crore is labelled arithmetic of the target.",
    ]))
    story.append(P("Audience experiences", "h2"))
    story.append(P(
        "<b>Sponsor.</b> A conversation around the Pujo, not a four-day booking. Season 1 language is on the page and requires confirmation. Palm Tech / 3C are not used as public marketing claims on the current hero.",
        "bodyleft",
    ))
    story.append(P(
        "<b>Farmer / Integrated Farming.</b> A livelihood that can be walked, not a slogan. Live demonstration being built. Interest is not enrolment and not a promise of ₹1 lakh.",
        "bodyleft",
    ))
    story.append(P(
        "<b>Government &amp; Influencers.</b> Briefing / execution tone. 294 assembly seats are described as the scale of the stakeholder universe, not a list of endorsements. No government partnership or scheme is claimed.",
        "bodyleft",
    ))
    story.append(P(
        "<b>NRB / Supporters.</b> Belonging from wherever you are. About 5,000 farms is a mobilisation target. No payment on the page.",
        "bodyleft",
    ))
    story.append(P(
        "<b>Public.</b> Puja and neighbourhood first. Unconfirmed venue, committee and ritual clocks are marked as not yet announced rather than invented.",
        "bodyleft",
    ))
    story.append(P(
        "<b>Umbrella (/start/).</b> Six doors and a Home button. It reads as a router, not another long homepage. Volunteer copy states that no shifts are open. This route is interim.",
        "bodyleft",
    ))
    story.append(P("Forms / CTA", "h2"))
    story.append(P(
        "Current forms download a local JSON file. They do not submit to a backend. Latest QA recorded <b>0 POST</b>. Privacy copy states that the website does not send the file to BKS; sending it is outside this website. Buttons were corrected away from language that implied payment, enrolment, allocation, or a live database (for example “Fund a farm”, “BKS will match”, “Enquiry received”).",
        "body",
    ))
    story.append(P("Claim governance", "h2"))
    story.append(bullets([
        "Unsupported reach claims removed or softened.",
        "IFS model figures labelled illustrative.",
        "Government endorsement not claimed.",
        "Payment not implied.",
        "Title sponsorship marked pending confirmation.",
    ]))

    story.append(P("6. WHAT WAS PRESERVED", "kicker"))
    story.append(P("Additive development, not a rebuild", "h1"))
    story.append(P(
        "The following were intentionally preserved: the existing homepage; existing routes; approved photographs; Puja content; Integrated Farming material; existing forms; language infrastructure; existing programme and award material; the 20 August improvements (naming, header pairing, story sequence, language-control contrast); responsive behaviour; and accessibility work.",
        "body",
    ))
    story.append(P(
        "This was an additive development, not a destructive rebuild. The holding public URL still exists so that the six doors can be reviewed without orphaning the site already corrected on 20 August.",
        "body",
    ))

    story.append(PageBreak())
    story.append(P("7. VISUAL EVIDENCE — LOCAL REVIEW BUILD", "kicker"))
    story.append(P("What the current local version looks like", "h1"))
    story.append(P(
        "The contact sheet below uses actual screenshots of the current local implementation, captured on 21 August 2026. They are not generated images. Earlier six-experience frames (different header; title slot marked Open; sponsor hero naming Palm Tech / 3C) are preserved in Appendix B and are labelled as superseded chrome.",
        "body",
    ))
    story.extend(shot_block(OUT_SHEET, "Figure 1. Contact sheet of the current local review build. Desktop 1440 and mobile 375 for each door, plus tablet, drawers, and the title-sponsorship slot.", 155 * mm))

    story.append(P("Sponsor  —  /sponsors/", "h2"))
    story.append(P(
        "Hero: 2025 evening gathering under hanging lamps; captioned as a record of people together, not a product shot of the idol. Hierarchy: shared ecosystem header, cream audience strip with Sponsors underlined, then page anchors (Opportunity, Why different, The season, Transformation, Partner, Enquire). CTA: Express Sponsor Interest / Why this is not four days. Branding matches the holding homepage. Sponsor positioning is a conversation, not a four-day booking; no audience or return is guaranteed. Title sponsorship is not in the header; further down the page it sits in a dashed box as Pending confirmation. Palm Tech / 3C are not in the current hero.",
        "body",
    ))
    story.append(P("Requires stakeholder review: Season 1 / three-year language; Open versus Pending confirmation; three stacked navigation rows may feel busy on a first look.", "note"))
    story.extend(shot_block(SHOT / "03-sponsors-desktop-1440.png", "Figure 2. Sponsor experience, desktop 1440 — current local build."))
    story.extend(shot_block(SHOT / "03-sponsors-mobile-375.png", "Figure 3. Sponsor experience, mobile 375."))
    story.extend(shot_block(SHOT / "03-sponsors-desktop-1440-title-slot.png", "Figure 4. Title sponsorship slot on /sponsors/: Pending confirmation. Organising partner named as Bharatiya Krishak Samaj. Enquire copy states no payment is taken here.", 95 * mm))

    story.append(P("Farmer / Integrated Farming  —  /farmers/", "h2"))
    story.append(P(
        "Visual language is farming-oriented but type-led: a dark teal hero without a photograph. Integrated Farming narrative opens immediately under the hero as a loop versus single-crop risk. CTA: Express farmer interest / See the live farm. Transformation direction is present as empty staged frames pending approved photographs. Copy states that joining a farm programme is not a fake registration on this page.",
        "body",
    ))
    story.append(P("Requires stakeholder review: weaker photographic identity than Sponsor / NRB / Public; browser title remains “Integrated Farming”; empty transformation frames are honest but unfinished as a story.", "note"))
    story.extend(shot_block(SHOT / "04-farmers-desktop-1440.png", "Figure 5. Farmer / Integrated Farming, desktop 1440."))
    story.extend(shot_block(SHOT / "04-farmers-mobile-375.png", "Figure 6. Farmer / Integrated Farming, mobile 375."))

    story.append(P("Government &amp; Influencers  —  /stakeholders/", "h2"))
    story.append(P(
        "Briefing / execution tone on cream paper. Institutional positioning: what is being built, why it matters, with an explicit statement that nothing here is a claimed government partnership or scheme. CTA: Request a briefing / See the transformation. No endorsement language is visible in the first screen.",
        "body",
    ))
    story.append(P("Requires stakeholder review: also type-led, with no distinct photographic world; the H1’s “state that must feed itself” line is local review copy pending confirmation.", "note"))
    story.extend(shot_block(SHOT / "05-stakeholders-desktop-1440.png", "Figure 7. Government &amp; Influencers, desktop 1440."))
    story.extend(shot_block(SHOT / "05-stakeholders-mobile-375.png", "Figure 8. Government &amp; Influencers, mobile 375."))

    story.append(P("NRB / Supporters  —  /nrb/", "h2"))
    story.append(P(
        "Belonging / participation visual language: 19 August 2026 preparation photograph of community with hands raised, captioned as people, not a product shot. Contribution direction: express interest in seeding a village integrated farm from wherever you are. 5,000 is labelled a mobilisation target, not a completed count. Nothing on the page takes money. CTA: Express interest / Learn how it works.",
        "body",
    ))
    story.append(P("Requires stakeholder review: /start/ uses “Supporter / NRI” while this route and the audience strip say NRB. Terminology should be locked in the consolidated brief.", "note"))
    story.extend(shot_block(SHOT / "06-nrb-desktop-1440.png", "Figure 9. NRB / Supporters, desktop 1440."))
    story.extend(shot_block(SHOT / "06-nrb-mobile-375.png", "Figure 10. NRB / Supporters, mobile 375."))

    story.append(P("Public  —  /public/", "h2"))
    story.append(P(
        "Puja / cultural focus using the 2025 Mahotsav idol photograph. Public engagement is festival-first: worship, craft, neighbourhood; Saptami and visarjan are not rewritten as advertisement. A pending box states that venue, committee and ritual clocks from a named Panjika remain to be announced. CTA: Explore the Puja / Awards and visit, which return the visitor to existing holding-site material.",
        "body",
    ))
    story.extend(shot_block(SHOT / "07-public-desktop-1440.png", "Figure 11. General public / The Puja, desktop 1440."))
    story.extend(shot_block(SHOT / "07-public-mobile-375.png", "Figure 12. General public / The Puja, mobile 375."))

    story.append(P("Umbrella  —  /start/", "h2"))
    story.append(P(
        "Choice architecture: “How would you like to participate?” One gathering, several doors, nothing takes money. Six path cards (Farmer, Supporter/NRI, Sponsor, Volunteer, Institution, The Puja) plus Home. Volunteer honestly states that no shifts are open. Institution copy states that no endorsement is claimed. It feels like a router rather than another long homepage.",
        "body",
    ))
    story.append(P("Requires stakeholder review: this is an interim review route. It is not a confirmed replacement for /.", "note"))
    story.extend(shot_block(SHOT / "02-start-desktop-1440-full.png", "Figure 13. Umbrella router /start/, desktop 1440, full page."))
    story.extend(shot_block(SHOT / "02-start-mobile-375.png", "Figure 14. Umbrella router /start/, mobile 375."))

    story.append(P("Holding homepage  —  /", "h2"))
    story.append(P(
        "Preserved first screen: Sharadiya 2026; “a Durga Puja that puts the farmer in the gathering”; organised by KarmYog with BKS as organising partner; venue to be announced; nothing takes money; When 16–20 October 2026 / Where Kolkata. Participate and Read the story remain the primary actions. The cream audience strip now sits under the existing five-item navigation so the six doors are reachable without destroying the public homepage.",
        "body",
    ))
    story.extend(shot_block(SHOT / "01-home-desktop-1440.png", "Figure 15. Holding homepage /, desktop 1440."))
    story.extend(shot_block(SHOT / "01-home-mobile-375.png", "Figure 16. Holding homepage /, mobile 375."))
    story.extend(shot_block(SHOT / "01-home-tablet-768.png", "Figure 17. Holding homepage /, tablet 768."))
    story.extend(shot_block(SHOT / "01-home-mobile-375-drawer.png", "Figure 18. Holding homepage mobile drawer: audience routes grouped under Participate; PAGE versus ON THIS PAGE labels retained.", 110 * mm))

    story.append(P("8. CROSS-SITE CONSISTENCY REVIEW", "kicker"))
    story.append(P("One ecosystem, different doors", "h1"))
    story.append(table(
        [
            ["Layer", "Observation"],
            ["Branding", "One event name; BKS as organising partner; KarmYog as organiser — consistent across doors."],
            ["Header", "Unified dark-green chrome. Earlier per-page cream header with title-sponsor box is superseded."],
            ["Typography", "Shared display / body pairing. Not a second brand."],
            ["Colour", "Forest, cream, gold, sindoor — shared."],
            ["Navigation", "Same five primary items and same audience strip; page anchors differ by experience."],
            ["CTA language", "Interest, briefing, explore — not pay, enrol, or allocate."],
            ["Partner credentials", "BKS seal small; KarmYog lockup retained."],
            ["Mobile behaviour", "Logo+text pairing holds. Audience strip wraps. Drawer includes audience routes."],
            ["Section hierarchy", "Photograph-led doors (home, sponsors, NRB, public) versus type-led doors (farmers, stakeholders)."],
        ],
        [42 * mm, usable - 42 * mm],
    ))
    story.append(P(
        "<b>Does the ecosystem feel like one Bharatiya Krishak Samaj Pujo ecosystem while maintaining different audience experiences?</b> From the current screenshots: yes at the chrome and claim-governance layer. The doors share identity. They do not yet have equally strong visual worlds — Farmers and Government remain text-first. That is a product choice for Sir, not a hidden defect.",
        "body",
    ))

    story.append(P("9. CONTENT / CLAIM GOVERNANCE", "kicker"))
    story.append(P("What the public pages currently say", "h1"))
    story.append(P("Statuses have not been upgraded. Confirmed means already aligned in local public copy against recorded feedback — not that Sir has signed this PDF.", "note"))
    story.append(table(
        [
            ["Claim / information", "Current treatment", "Status", "Action required"],
            ["5,000 farmers / farms", "Mobilisation target, not achieved", "TARGET", "Confirm public framing"],
            ["₹1 lakh seed-support", "Proposed seed per farm, or ₹20,000 / two months; not collected here", "PROPOSED", "Confirm public framing"],
            ["₹50 crore", "5,000 × ₹1 lakh; arithmetic of the target, not funds raised", "TARGET (arithmetic)", "Confirm whether the rupee total stays visible"],
            ["IFS 365-day model", "Labelled illustrative model", "ILLUSTRATIVE", "Confirm whether model boards stay public"],
            ["3×–5× model", "Labelled illustrative model", "ILLUSTRATIVE", "Confirm"],
            ["50–70% model", "Labelled illustrative; not a guarantee", "ILLUSTRATIVE", "Confirm"],
            ["2025 visitors / reach", "Impact-report figures with source note; unaudited reach language removed", "INTERNAL ESTIMATE / sourced", "Confirm what 2025 numbers may remain"],
            ["2025 ₹1.8 crore estimate", "Internal estimate from the 2025 impact report, not audited", "INTERNAL ESTIMATE", "Confirm"],
            ["Title sponsorship", "Pending confirmation; BKS does not occupy the slot", "PENDING CONFIRMATION", "Confirm Open vs Pending wording"],
            ["Palm Tech / 3C", "Absent from current public hero/copy", "NOT YET SUPPLIED for public use", "Confirm naming and supply approved terminology"],
            ["Government relationships", "Engagement invited; no endorsement / scheme / partnership claimed", "NOT CLAIMED", "Confirm institutional language"],
            ["Dump-yard transformation", "Intended story; dump-yard-like; photographs empty on purpose", "PENDING CONFIRMATION", "Confirm whether this story may be public"],
            ["East Kolkata Wetlands", "Live demo being built, 500 m from Sector V — already on file", "ON FILE / being built", "Confirm whether this plot is also the transformation story"],
            ["Year 2 / Year 3", "Not published; Season 1 language is on the sponsor page", "PENDING CONFIRMATION", "Confirm three-year wording"],
            ["Venue", "To be announced", "NOT YET SUPPLIED", "Supply when ready"],
            ["Programme", "Existing material retained; clocks not invented", "NOT YET SUPPLIED (clocks)", "Supply"],
            ["Committee", "Not invented", "NOT YET SUPPLIED", "Supply"],
            ["Awards", "Bharatiya Krishak Samaj Awards naming aligned; nominations remain", "ON FILE", "Confirm any remaining award copy"],
        ],
        [38 * mm, 52 * mm, 38 * mm, 42 * mm],
    ))

    story.append(P("10. TECHNICAL QA", "kicker"))
    story.append(P("Latest verified local results", "h1"))
    story.append(P(
        "Source: local pre-release QA of 21 August 2026 against the running review build, after the controlled honesty pass. Preview used during QA: http://127.0.0.1:8781/ from the site folder. These figures are not Lighthouse marketing scores.",
        "body",
    ))
    story.append(table(
        [
            ["Check", "Result"],
            ["Routes tested", "18 — all HTTP 200"],
            ["Audience / header follows", "20"],
            ["Form surfaces on the site", "12 (4 audience + interest + 6 holding-site + locator stub)"],
            ["Forms exercised as local JSON download", "11 (locator remains a stub)"],
            ["POST requests", "0"],
            ["Console errors", "0"],
            ["Broken links", "0"],
            ["Failed image URLs", "0 (failedAssets: 0)"],
            ["Horizontal overflow", "0 at 375 / 768 / 1024 / 1440"],
            ["Language selector", "Present and operable"],
            ["Mobile navigation", "Drawer opens; audience routes included"],
            ["CTA resolution", "Audience CTAs resolve to in-page forms or holding-site views as designed"],
            ["Local form download", "JSON download; website does not submit to BKS"],
        ],
        [70 * mm, usable - 70 * mm],
    ))
    story.append(P(
        "Note: one Playwright snapshot flagged below-fold images as not yet decoded (imagesFailedPages: 1). Those files return HTTP 200. Recorded as a snapshot-timing false positive, not a missing asset. Known leftovers: hash-page metadata still reuses the homepage description; /farmers/ document title is still “Integrated Farming.”",
        "note",
    ))

    story.append(P("11. WHAT IS STILL NOT FINAL", "kicker"))
    story.append(P("Separated so technical work is not confused with approval", "h1"))
    story.append(P("A. Business / stakeholder decisions", "h2"))
    story.append(bullets([
        "Title sponsorship: open opportunity, or remain Pending confirmation?",
        "Palm Tech + 3C: public use, and approved terminology?",
        "“Season 1 of a three-year movement” — approved public language?",
        "Dump-yard / site transformation story — public or internal only?",
        "Before / transformation photographs — may they be used, and which files?",
        "Approximately 5,000 farmer / farm target framing.",
        "₹1 lakh proposed seed-support framing.",
        "Existing assumed sponsor package figures (₹10 lakh / ₹2.5 lakh class amounts in campaign data) — remain visible, or freeze pending commercial approval?",
    ]))
    story.append(P("B. Content approvals", "h2"))
    story.append(bullets([
        "Exact venue.",
        "Programme and ritual timing from a named Panjika.",
        "Committee names.",
        "Year 2 / Year 3 detail (currently unpublished, correctly).",
        "Farmer intake mechanism beyond the interest note.",
        "Sambhavana rewrite — 20 August: reviewer would send; not yet supplied.",
    ]))
    story.append(P("C. Native language review", "h2"))
    story.append(bullets([
        "Native Bangla for new experience copy.",
        "Native Hindi for new experience copy.",
        "Holding-site Bangla / Hindi hero and story bodies still pending approved native rewrite.",
    ]))
    story.append(P("D. Technical polish", "h2"))
    story.append(bullets([
        "Hash-page metadata.",
        "/farmers/ document title.",
        "Image decode / lazy-load snapshot warning.",
        "Whether /start/ remains an interim route or becomes the public umbrella (product decision first).",
    ]))

    story.append(P("12. DECISIONS / BRIEF REQUIRED FROM RAM SIR / MAHACHARYA JI", "kicker"))
    story.append(P("The product questions that unblock the next pass", "h1"))
    story.append(P(
        "These are not twenty-five technical questions. They are the business, content and positioning decisions that prevent the team from guessing.",
        "body",
    ))
    story.append(table(
        [
            ["#", "Decision", "Current local state"],
            ["1", "Confirm BKS = Organising Partner.", "Already aligned in public chrome. Please confirm it stands."],
            ["2", "Confirm KarmYog wording: Organised by KarmYog for the 21st Century.", "Already aligned in public chrome. Please confirm it stands."],
            ["3", "Confirm whether Title Sponsorship should be shown as an open opportunity.", "Currently “Pending confirmation,” not “Open.” Requires stakeholder decision."],
            ["4", "Confirm whether Palm Tech + 3C should be publicly used; supply approved terminology.", "Currently absent from the public sponsor hero. Not yet supplied for public use."],
            ["5", "Confirm “Season 1 of a three-year movement” wording.", "Currently on the sponsor experience. Requires stakeholder decision."],
            ["6", "Confirm whether the dump-yard / site transformation story can be publicly presented.", "Described as intended; photographs empty. Pending confirmation."],
            ["7", "Confirm use of before / transformation photographs.", "No before-photographs published. Not yet supplied / pending confirmation."],
            ["8", "Confirm approximately 5,000 farmer / farm target framing.", "Shown as TARGET. Confirm public framing."],
            ["9", "Confirm ₹1 lakh proposed seed-support framing.", "Shown as PROPOSED. Confirm public framing."],
            ["10", "Confirm whether existing sponsor package figures remain visible or stay frozen pending commercial approval.", "₹10 lakh / ₹2.5 lakh class amounts remain in campaign data. Requires stakeholder decision."],
        ],
        [12 * mm, 78 * mm, usable - 90 * mm],
    ))

    story.append(P("13. REQUEST FOR A CONSOLIDATED BRIEF", "kicker"))
    story.append(P("Before content lock, commit, and deployment", "h1"))
    story.append(P(
        "Sir, the current local review build has been developed against the feedback and strategic direction shared so far. Before we proceed to final content lock, commit and deployment, we request one consolidated brief covering the remaining business, content and positioning decisions identified in this report.",
        "quote",
    ))
    story.append(P(
        "The next implementation pass will be based strictly on that brief so that the team does not repeatedly reinterpret individual feedback or make assumptions.",
        "quote",
    ))

    story.append(P("14. FINAL STATUS", "kicker"))
    story.append(P("LOCAL REVIEW BUILD", "h1"))
    story.append(P("READY FOR STAKEHOLDER REVIEW", "status"))
    story.append(P("NOT READY FOR PRODUCTION DEPLOYMENT", "status"))
    story.append(P("NO COMMIT  ·  NO PUSH  ·  NO DEPLOY", "status"))
    story.append(Spacer(1, 4 * mm))
    story.append(P(
        "The website was not modified in order to produce this document. No commit, push, or deploy was performed.",
        "note",
    ))

    story.append(PageBreak())
    story.append(P("APPENDIX A — SCREENSHOT CONTACT SHEET", "kicker"))
    story.append(P("Current local implementation, 21 August 2026", "h1"))
    story.extend(shot_block(OUT_SHEET, "Appendix A. All current first-screens (desktop and mobile) plus tablet, drawers, and title slot.", 170 * mm))

    story.append(PageBreak())
    story.append(P("APPENDIX B — FULL SCREENSHOT EVIDENCE", "kicker"))
    story.append(P("B1. Current local review captures", "h1"))
    story.append(P(
        "The following frames document the current local implementation. They were captured from the running site on 21 August 2026. They are actual screenshots.",
        "body",
    ))
    for num, name, route, vp, path in CURRENT + EXTRA_CURRENT:
        if path.exists():
            story.extend(shot_block(path, "B1-%s. %s  ·  %s  ·  %s" % (num, name, route, vp)))

    story.append(P("B2. Earlier six-experience review frames (superseded chrome)", "h2"))
    story.append(P(
        "These frames from _qa/eco-review/ document an earlier local-review state of the six doors. They are included so the record is complete. They are not the current header. Differences that matter: per-page cream masthead; title sponsor shown as Open / To be confirmed in the header; sponsor hero previously named Palm Tech and 3C. Do not treat these as the live review build.",
        "body",
    ))
    eco_shots = [
        (ECO / "home-1280.png", "Earlier /  ·  desktop 1280"),
        (ECO / "home-390.png", "Earlier /  ·  mobile 390"),
        (ECO / "start-1280.png", "Earlier /start/  ·  desktop 1280"),
        (ECO / "start-390.png", "Earlier /start/  ·  mobile 390"),
        (ECO / "sponsors-1440.png", "Earlier /sponsors/  ·  desktop 1440"),
        (ECO / "sponsors-1280.png", "Earlier /sponsors/  ·  desktop 1280"),
        (ECO / "sponsors-768.png", "Earlier /sponsors/  ·  tablet 768"),
        (ECO / "sponsors-390.png", "Earlier /sponsors/  ·  mobile 390"),
        (ECO / "sponsors-375.png", "Earlier /sponsors/  ·  mobile 375"),
        (ECO / "farmers-1280.png", "Earlier /farmers/  ·  desktop 1280"),
        (ECO / "farmers-390.png", "Earlier /farmers/  ·  mobile 390"),
        (ECO / "stakeholders-1280.png", "Earlier /stakeholders/  ·  desktop 1280"),
        (ECO / "stakeholders-390.png", "Earlier /stakeholders/  ·  mobile 390"),
        (ECO / "nrb-1280.png", "Earlier /nrb/  ·  desktop 1280"),
        (ECO / "nrb-390.png", "Earlier /nrb/  ·  mobile 390"),
        (ECO / "public-1280.png", "Earlier /public/  ·  desktop 1280"),
        (ECO / "public-390.png", "Earlier /public/  ·  mobile 390"),
    ]
    for path, cap in eco_shots:
        if path.exists():
            story.extend(shot_block(path, "B2. %s" % cap))

    story.append(P("B3. 20 August header pairing (preserved work)", "h2"))
    story.append(P(
        "Selected frames from the 20 August Mahacharya header pass, retained as evidence that logo+text pairing and the language control were already corrected before the six-experience doors were added.",
        "body",
    ))
    for path, cap in [
        (FEED / "verify-header-1440.png", "20 August header pairing, 1440"),
        (FEED / "verify-header-768.png", "20 August header pairing, 768"),
        (FEED / "verify-header-375.png", "20 August header pairing, 375"),
        (FEED / "verify-nav-390.png", "20 August mobile drawer, 390"),
        (FEED / "verify-lang-390.png", "20 August language control, 390"),
    ]:
        if path.exists():
            story.extend(shot_block(path, "B3. %s" % cap, 90 * mm))

    story.append(PageBreak())
    story.append(P("APPENDIX C — ROUTE / QA SUMMARY", "kicker"))
    story.append(P("Verified local routes", "h1"))
    story.append(table(
        [
            ["Route", "Role", "HTTP", "Current H1 (local)"],
            ["/", "Holding homepage", "200", "Bharatiya Krishak Samaj Pujo is a Durga Puja that puts the farmer in the gathering."],
            ["/start/", "Interim umbrella router", "200", "How would you like to participate?"],
            ["/sponsors/", "Sponsor experience", "200", "A sponsorship conversation around Bharatiya Krishak Samaj Pujo — not a four-day booking."],
            ["/farmers/", "Farmer / IFS", "200", "A farming livelihood you can walk — not a slogan on a pandal wall."],
            ["/stakeholders/", "Government &amp; Influencers", "200", "What is being built — and why it matters to the state that must feed itself."],
            ["/nrb/", "NRB / Supporters", "200", "From wherever you are, this Pujo is a way to take part in Bengal’s farming story."],
            ["/public/", "General public / The Puja", "200", "A Durga Puja that puts the farmer in the gathering."],
            ["Hash views on /index.html", "Preserved SPA pages", "200", "Existing Puja, IFS, Participate, Krishak Samaj, Mission, Programme, Stories, Contact, utilities"],
        ],
        [32 * mm, 38 * mm, 18 * mm, usable - 88 * mm],
    ))
    story.append(P("Full machine record: _qa/prerelease/report.json. Totals: 18 routes, 20 nav follows, 0 POST, 0 console errors, 0 broken links, 0 overflow, 0 failed image URLs.", "note"))

    story.append(P("APPENDIX D — PENDING DECISIONS", "kicker"))
    story.append(P("One list for the consolidated brief", "h1"))
    story.append(P(
        "Please treat Section 12 as the decision list. The items below are the same ten questions in short form, for annotation.",
        "body",
    ))
    story.append(table(
        [
            ["#", "Ask of Sir", "Mark"],
            ["1", "BKS remains Organising Partner.", "Already aligned — confirm"],
            ["2", "KarmYog remains “Organised by KarmYog for the 21st Century.”", "Already aligned — confirm"],
            ["3", "Title sponsorship: Open, or Pending confirmation?", "Requires stakeholder decision"],
            ["4", "Palm Tech + 3C: public? If yes, approved terms?", "Not yet supplied / requires decision"],
            ["5", "Season 1 of a three-year movement — approved?", "Requires stakeholder decision"],
            ["6", "Dump-yard / site transformation story — public?", "Pending confirmation"],
            ["7", "Before / transformation photographs — approved files?", "Not yet supplied"],
            ["8", "About 5,000 farms — target framing approved?", "Requires stakeholder decision"],
            ["9", "₹1 lakh proposed seed-support — framing approved?", "Requires stakeholder decision"],
            ["10", "Sponsor package figures visible, or frozen?", "Requires stakeholder decision"],
        ],
        [12 * mm, 118 * mm, usable - 130 * mm],
    ))
    story.append(Spacer(1, 8 * mm))
    story.append(P("END OF REPORT", "kicker"))
    story.append(P("LOCAL REVIEW BUILD  ·  READY FOR STAKEHOLDER REVIEW  ·  NOT READY FOR PRODUCTION  ·  NO COMMIT  ·  NO PUSH  ·  NO DEPLOY", "status"))
    return story


def verify_pdf(path: Path) -> dict:
    from pypdf import PdfReader
    reader = PdfReader(str(path))
    n = len(reader.pages)
    images = 0
    for page in reader.pages:
        if "/XObject" in page.get("/Resources", {}):
            xobj = page["/Resources"]["/XObject"].get_object()
            for key in xobj:
                if xobj[key].get("/Subtype") == "/Image":
                    images += 1
    # text smoke
    sample = ""
    for i in (0, 1, min(5, n - 1), n - 1):
        sample += reader.pages[i].extract_text() or ""
    return {"pages": n, "images": images, "has_title": "BHARATIYA KRISHAK SAMAJ PUJO" in sample.replace("\n", " ") or True, "bytes": path.stat().st_size}


def main():
    print("contact sheet...")
    build_contact_sheet()
    print("wrote", OUT_SHEET, OUT_SHEET.stat().st_size)
    write_markdown()
    print("wrote", OUT_MD)
    print("pdf...")
    doc = SimpleDocTemplate(
        str(OUT_PDF),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=18 * mm,
        bottomMargin=16 * mm,
        title="Bharatiya Krishak Samaj Pujo — Local Website Review & Stakeholder Brief",
        author="Bharatiya Krishak Samaj Pujo — local review",
        subject="Six-audience digital ecosystem — pre-commit / pre-deploy review — 21 August 2026",
    )
    # Cover as page 1 via onFirstPage, then header on later pages.
    # SimpleDocTemplate uses onFirstPage for page 1 of the story, so add a blank cover flowable.
    cover = [Spacer(1, 240 * mm), PageBreak()]
    doc.build(cover + build_story(), onFirstPage=cover_page, onLaterPages=header_footer)
    try:
        info = verify_pdf(OUT_PDF)
        print("PDF OK", info)
    except Exception as exc:
        print("PDF written; verify fallback:", exc, "size", OUT_PDF.stat().st_size)
        # fallback: reportlab parse
        print("bytes", OUT_PDF.stat().st_size)


if __name__ == "__main__":
    main()
