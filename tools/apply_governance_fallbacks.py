"""Apply English accuracy patches and BN/HI English fallbacks. No new translation."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "content"
DOWNLOADED = "The information has been downloaded as a file to your device."
PRIVACY = (
    "This website does not submit your details to BKS. "
    "The information is downloaded as a file to your device. "
    "If you choose to send that file to BKS, subsequent handling is outside this website."
)


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def patch_campaign():
    path = DATA / "campaign.json"
    data = load(path)
    en = data["translations"]["en"]
    en["nominateText"] = (
        "If you know a farmer doing something worth seeing — a fish farmer who solved saline water, "
        "a woman running a dairy on four cows, a boy growing vegetables on a Kolkata roof — you may "
        "download a nomination file with their name. If that farmer is you, use your own name. There is no entry fee."
    )
    en["nomConsent1"] = PRIVACY
    en["nomConsent2"] = PRIVACY
    en["submitNomination"] = "Download nomination file"
    en["nominationStatusText"] = DOWNLOADED + " This website does not submit the nomination to BKS."
    en["sponsorText"] = (
        "Durga Puja is the one week Bengal is entirely outdoors. Bharatiya Krishak Samaj Pujo puts an agricultural "
        "audience — farmers, farming families, FPO members and agri-students — inside a single pandal, in front of "
        "an award programme designed to be reported. Sponsorship covers pandal-scale visibility and award category naming together."
    )
    en["sponsorContactTitle"] = "Download an enquiry file on this device."
    en["sponsorContactText"] = (
        "Tell us roughly what you are interested in. This website does not send the file to the committee. "
        "If you choose to send the downloaded file, subsequent handling is outside this website."
    )
    en["sponsorConsent1"] = PRIVACY
    en["submitSponsor"] = "Download enquiry file"
    en["sponsorStatusText"] = DOWNLOADED + " No payment is taken on this website."
    en["recStat1"] = "visitors across the public darshan days (2025 impact report; internal, not independently audited)"
    en["recStat2"] = "organic digital reach, with zero paid marketing (2025 impact report; internal, not independently audited)"
    rt = en["rt"]
    rt["downloaded"] = DOWNLOADED
    rt["errOffline"] = DOWNLOADED
    rt["nomSuccess"] = DOWNLOADED
    rt["sponsorSuccess"] = DOWNLOADED
    rt["submitting"] = "Preparing file…"

    unsafe_keys = [
        "countNote",
        "nominateText",
        "nomConsent1",
        "nomConsent2",
        "submitNomination",
        "nominationStatusText",
        "sponsorText",
        "sponsorContactTitle",
        "sponsorContactText",
        "sponsorConsent1",
        "submitSponsor",
        "sponsorStatusText",
        "recStat1",
        "recStat2",
    ]
    for lang in ("hi", "bn"):
        dest = data["translations"][lang]
        for key in unsafe_keys:
            dest[key] = en[key]
        dest["rt"]["downloaded"] = DOWNLOADED
        dest["rt"]["errOffline"] = DOWNLOADED
        dest["rt"]["nomSuccess"] = DOWNLOADED
        dest["rt"]["sponsorSuccess"] = DOWNLOADED
        dest["rt"]["submitting"] = "Preparing file…"
    dump(path, data)
    print("campaign patched")


def patch_nrb_fallback():
    en = load(DATA / "en" / "nrb.json")
    for lang in ("bn", "hi"):
        dest = load(DATA / lang / "nrb.json")
        dest["model"]["lede"] = en["model"]["lede"]
        dest["model"]["points"] = en["model"]["points"]
        dest["village"]["lede"] = en["village"]["lede"]
        dest["village"]["submit"] = en["village"]["submit"]
        dest["village"]["status"] = en["village"]["status"]
        dest["faq"]["items"] = en["faq"]["items"]
        dest["demo"]["lede"] = en["demo"]["lede"]
        dest["demo"]["facts"] = en["demo"]["facts"]
        for key in (
            "title",
            "lede",
            "modelNote",
            "formTitle",
            "consent",
            "submit",
            "status",
        ):
            dest["fund"][key] = en["fund"][key]
        for key in ("lede", "formTitle", "submit", "status"):
            dest["bulk"][key] = en["bulk"][key]
        for key in ("title", "lede", "fieldKind", "submit", "status"):
            dest["operator"][key] = en["operator"][key]
        dump(DATA / lang / "nrb.json", dest)
        print("nrb", lang, "fallback")


def patch_mission_fallback():
    en = load(DATA / "en" / "mission.json")
    for lang in ("bn", "hi"):
        dest = load(DATA / lang / "mission.json")
        dest["lede"] = en["lede"]
        dest["notice"] = en["notice"]
        dest["stats"] = en["stats"]
        dest["how"]["body"] = en["how"]["body"]
        dest["how"]["cta"] = en["how"]["cta"]
        dump(DATA / lang / "mission.json", dest)
        print("mission", lang, "fallback")


def patch_ifs_fallback():
    en = load(DATA / "en" / "integrated-farming.json")
    for lang in ("bn", "hi"):
        dest = load(DATA / lang / "integrated-farming.json")
        dest["need"]["items"][0]["body"] = en["need"]["items"][0]["body"]
        dest["impact"]["items"][0]["title"] = en["impact"]["items"][0]["title"]
        dest["impact"]["items"][1]["title"] = en["impact"]["items"][1]["title"]
        dest["impact"]["items"][1]["body"] = en["impact"]["items"][1]["body"]
        dest["prototype"]["items"][1]["body"] = en["prototype"]["items"][1]["body"]
        dest["prototype"]["items"][2]["body"] = en["prototype"]["items"][2]["body"]
        dest["ctaFund"] = en["ctaFund"]
        dump(DATA / lang / "integrated-farming.json", dest)
        print("ifs", lang, "fallback")


def patch_misc():
    for lang in ("bn", "hi"):
        ui = load(DATA / lang / "ui.json")
        ui["nav"]["nominate"] = "Nominate"
        dump(DATA / lang / "ui.json", ui)
        home = load(DATA / lang / "home.json")
        en_home = load(DATA / "en" / "home.json")
        en_fund_body = en_home["storyArc"]["steps"][5]["body"]
        if "storyArc" in home and "steps" in home["storyArc"]:
            for step in home["storyArc"]["steps"]:
                if step.get("id") == "fund":
                    step["title"] = "Learn how support works"
                    step["body"] = en_fund_body
                if step.get("id") == "ambition":
                    step["body"] = "About 5,000 village farms is a mobilisation target, not a completed count."
        dump(DATA / lang / "home.json", home)
        part = load(DATA / lang / "participate.json")
        part["privacy"] = PRIVACY
        part["lede"] = load(DATA / "en" / "participate.json")["lede"]
        part["form"]["consent"] = PRIVACY
        part["form"]["success"] = load(DATA / "en" / "participate.json")["form"]["success"]
        part["paths"][2]["body"] = load(DATA / "en" / "participate.json")["paths"][2]["body"]
        dump(DATA / lang / "participate.json", part)
        print("misc", lang)


def patch_bn_hi_home_cards():
    en_body = (
        "₹1 lakh is the proposed seed-support figure for one village farm — or ₹20,000 every two months. "
        "That is a goal, not money already collected."
    )
    for lang in ("bn", "hi"):
        home = load(DATA / lang / "home.json")
        # some locales use a top-level list of teaser cards
        for key, val in list(home.items()):
            if isinstance(val, list):
                for item in val:
                    if isinstance(item, dict) and item.get("id") == "fund":
                        item["title"] = "Learn how support works"
                        item["body"] = en_body
        dump(DATA / lang / "home.json", home)


if __name__ == "__main__":
    patch_campaign()
    patch_nrb_fallback()
    patch_mission_fallback()
    patch_ifs_fallback()
    patch_misc()
    patch_bn_hi_home_cards()
    print("done")
