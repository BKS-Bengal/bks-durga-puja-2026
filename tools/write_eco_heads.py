from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "site"
PAGES = {
    "sponsors": {
        "title": "Sponsors | Bharatiya Krishak Samaj Pujo",
        "desc": "Sponsorship around Bharatiya Krishak Samaj Pujo. Organised by KarmYog for the 21st Century. No payment is taken here.",
        "canonical": "/sponsors/",
        "exp": "sponsors",
    },
    "farmers": {
        "title": "Farmers | Bharatiya Krishak Samaj Pujo",
        "desc": "Integrated Farming at Bharatiya Krishak Samaj Pujo. Express interest. No enrolment and no payment on this page.",
        "canonical": "/farmers/",
        "exp": "farmers",
    },
    "stakeholders": {
        "title": "Government & Institutions | Bharatiya Krishak Samaj Pujo",
        "desc": "Institutional briefing for Bharatiya Krishak Samaj Pujo. No government endorsement is claimed.",
        "canonical": "/stakeholders/",
        "exp": "stakeholders",
    },
    "nrb": {
        "title": "Supporters / NRB | Bharatiya Krishak Samaj Pujo",
        "desc": "Express interest in a village integrated farm. About 5,000 farms is a target. No payment is taken on this page.",
        "canonical": "/nrb/",
        "exp": "nrb",
    },
    "public": {
        "title": "The Puja | Bharatiya Krishak Samaj Pujo",
        "desc": "A Durga Puja that puts the farmer in the gathering. Venue, committee and ritual clocks remain to be announced.",
        "canonical": "/public/",
        "exp": "public",
    },
    "start": {
        "title": "How would you like to participate? | Bharatiya Krishak Samaj Pujo",
        "desc": "Choose how to take part in Bharatiya Krishak Samaj Pujo: farmer, supporter, sponsor, volunteer, institution, or visitor.",
        "canonical": "/start/",
        "exp": "umbrella",
    },
}

TMPL = """<!DOCTYPE html>
<html lang="en" data-experience="{exp}" data-base="..">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <meta name="google" content="notranslate">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <link rel="canonical" href="{canonical}">
  <link rel="icon" href="../assets/bks-seal-96.png" type="image/png">
  <link rel="stylesheet" href="../styles/fonts.css">
  <link rel="stylesheet" href="../styles/tokens.css?v=eco4">
  <link rel="stylesheet" href="../styles/app.css?v=eco4">
  <link rel="stylesheet" href="../styles/art.css?v=eco4">
  <link rel="stylesheet" href="../styles/ecosystem.css?v=eco4">
</head>
<body class="eco-body">
  <a class="skip" href="#main">Skip to content</a>
  <div id="eco-root"></div>
  <script src="../scripts/campaign.js?v=eco4"></script>
  <script src="../scripts/ecosystem.js?v=eco4"></script>
</body>
</html>
"""

if __name__ == "__main__":
    for folder, meta in PAGES.items():
        path = ROOT / folder / "index.html"
        path.write_text(TMPL.format(**meta), encoding="utf-8", newline="\n")
        print("wrote", path)
