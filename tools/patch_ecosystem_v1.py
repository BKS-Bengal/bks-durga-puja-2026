# -*- coding: utf-8 -*-
"""Patch ecosystem.json for V1 execution. Additive fields only."""
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "data" / "content" / "ecosystem.json"
SITE = ROOT / "site" / "data" / "content" / "ecosystem.json"


def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    shared = data["shared"]
    shared["backToMain"] = "Back to Bharatiya Krishak Samaj Pujo"
    shared["doorsEyebrow"] = "Participate"
    shared["doorsTitle"] = "How would you like to participate?"
    shared["doorsLede"] = (
        "Bharatiya Krishak Samaj Pujo is one gathering with several doors. "
        "Choose the path that matches who you are. Nothing on these pages takes money."
    )
    shared["faqLabel"] = "Questions this page should answer"
    shared["loopLabel"] = "The loop"

    data["loop"] = {
        "eyebrow": "The loop",
        "title": "Leftover becomes the next input.",
        "lede": (
            "An integrated farm keeps several enterprises on one holding. "
            "This is a working sketch, not a guarantee of income or zero-waste."
        ),
        "items": [
            {"title": "Crop", "body": "Cereals, pulses, oilseeds and fodder. Residue becomes feed or compost."},
            {"title": "Horticulture", "body": "Vegetables, fruit and homestead trees on the same holding."},
            {"title": "Livestock", "body": "Dairy beside the water. Dung returns to soil and energy."},
            {"title": "Poultry", "body": "Birds and duckery near the pond. Leftover feed returns to compost."},
            {"title": "Fishery / aquaculture", "body": "The pond as water and fish. Silt returns to beds."},
            {"title": "Water harvesting", "body": "The pond stores rain and feeds irrigation."},
            {"title": "Compost", "body": "Residue, dung and silt as on-farm inputs."},
            {"title": "Soil", "body": "Organic return keeps the loop closed."},
            {"title": "Bee / mushroom", "body": "Allied livelihoods on the same holding."},
            {"title": "Household / market", "body": "Produce feeds the house and the market. Income returns to the farm."},
        ],
    }
    data["farmtech"] = {
        "eyebrow": "FarmTech + AgriTech",
        "title": "Careful tools where they earn their keep.",
        "body": (
            "On this project, FarmTech and AgriTech names the technology layer already "
            "written into the Integrated Farming model: monitoring, drip, pond energy and "
            "diagnostics where they help a small farm. That is a model-based sketch. "
            "A fuller public definition of FarmTech and AgriTech as a named programme is "
            "to be confirmed. This page does not list vendors, apps, or guaranteed yields."
        ),
    }

    ex = data["experiences"]

    ex["farmers"]["name"] = "Farmers / FarmTech + AgriTech"
    ex["farmers"]["documentTitle"] = "Farmers / FarmTech + AgriTech | Bharatiya Krishak Samaj Pujo"
    ex["farmers"]["metaDescription"] = (
        "Integrated Farming, FarmTech and AgriTech at Bharatiya Krishak Samaj Pujo. "
        "Express interest. No enrolment and no payment on this page."
    )
    ex["farmers"]["kicker"] = "For farmers, FarmTech and AgriTech"
    ex["farmers"]["nav"] = [
        {"id": "why-ifs", "label": "Why IFS", "href": "#why-ifs"},
        {"id": "farmer", "label": "The farmer", "href": "#farmer"},
        {"id": "loop", "label": "The loop", "href": "#loop"},
        {"id": "farmtech", "label": "FarmTech + AgriTech", "href": "#farmtech"},
        {"id": "demo", "label": "Live farm", "href": "#demo"},
        {"id": "participate", "label": "Express interest", "href": "#participate"},
        {"id": "faq", "label": "FAQ", "href": "#faq"},
    ]
    if not any(sec.get("id") == "farmtech-note" for sec in ex["farmers"]["sections"]):
        ex["farmers"]["sections"].append(
            {
                "id": "farmtech-note",
                "kicker": "FarmTech + AgriTech",
                "title": "Technology is a layer of the farm, not a separate slogan.",
                "body": (
                    "FarmTech and AgriTech, on this page, means the careful-tools layer already "
                    "in the Integrated Farming model. It is not Palm Tech. It is not a vendor list. "
                    "A fuller sector definition is to be confirmed."
                ),
            }
        )
    ex["farmers"]["faq"] = [
        {"q": "What is this?", "a": "A farmer-facing door of Bharatiya Krishak Samaj Pujo. It shows Integrated Farming as a livelihood, not as a slogan on a pandal wall."},
        {"q": "Who is it for?", "a": "Farmers in West Bengal, agricultural readers, and FarmTech / AgriTech participants who need to understand the model."},
        {"q": "What is integrated farming?", "a": "Several enterprises on one holding so leftover becomes the next input: crop, horticulture, livestock, poultry, fishery, water, compost, soil, allied livelihoods, household and market."},
        {"q": "What does FarmTech mean here?", "a": "The careful-tools layer already in the project model: monitoring, drip, pond energy and diagnostics where they earn their keep. A fuller definition is to be confirmed."},
        {"q": "What does AgriTech mean here?", "a": "Agricultural technology in that same model-based sketch. It is not a named vendor programme on this page. To be confirmed if more public definition is required."},
        {"q": "What is the demonstration farm?", "a": "A live integrated-farm demonstration in the East Kolkata Wetlands, 500 metres from Sector V, is being built. It is not presented as finished."},
        {"q": "What can a farmer learn?", "a": "Why a loop can carry less risk than a single crop, how the enterprises feed each other, and that a public demonstration is being built. Model numbers are illustrative."},
        {"q": "How can I participate?", "a": "Express farmer interest. The form downloads a file to your device. It is not enrolment."},
        {"q": "Is farmer enrolment currently open?", "a": "No. Only an interest note is live. The intake mechanism beyond this note is to be confirmed."},
        {"q": "Is 1 lakh rupees guaranteed?", "a": "No. One lakh rupees is proposed seed-support in the patron model. It is not a farmer grant paid on this page."},
        {"q": "Is there any payment on this site?", "a": "No. Nothing on this page takes money."},
        {"q": "How is the larger 5,000-farm vision being approached?", "a": "About 5,000 village farms is a mobilisation target, not a completed count."},
        {"q": "Who organises this?", "a": "Organised by KarmYog for the 21st Century. Bharatiya Krishak Samaj is the organising partner, not the title sponsor."},
        {"q": "What happens after I download the file?", "a": "The website does not submit it to a server. If you send the file to BKS, that handling is outside this website."},
    ]

    if not any(item.get("href") == "#faq" for item in ex["sponsors"]["nav"]):
        ex["sponsors"]["nav"].append({"id": "faq", "label": "FAQ", "href": "#faq"})
    ex["sponsors"]["faq"] = [
        {"q": "What is the opportunity?", "a": "A sponsorship conversation around Bharatiya Krishak Samaj Pujo, not a four-day booking. The ask is a conversation, not an online payment."},
        {"q": "Why is this different from conventional event sponsorship?", "a": "Durga Puja is when Bengal is outdoors together. This Pujo places the farmer and Integrated Farming inside that week. That is the intended setting. No footfall, media-reach or return is guaranteed."},
        {"q": "Is this only a four-day Puja?", "a": "The civic window is 16 to 20 October 2026. The page also describes a platform meant to continue. Year 2 and Year 3 programmes are not published. Season 1 of a three-year movement remains pending confirmation as locked public language."},
        {"q": "What is the longer-term movement?", "a": "Intended continuing work around farmer visibility, Integrated Farming and a live demonstration being built. Later-year programmes are not published here."},
        {"q": "Who is the organising partner?", "a": "Bharatiya Krishak Samaj. Organised by KarmYog for the 21st Century. Bharatiya Krishak Samaj does not occupy the title-sponsor slot."},
        {"q": "Is a title sponsor already confirmed?", "a": "No. The title-sponsorship opportunity is pending confirmation."},
        {"q": "Are package amounts confirmed?", "a": "Figures already on the campaign page, including the 10 lakh and 2.5 lakh class amounts, are shown as assumed. They are not confirmed commercial rates."},
        {"q": "What does expressing interest do?", "a": "The form downloads a JSON file to your device. This website does not submit it to a server."},
        {"q": "How does the enquiry process work?", "a": "You may send the downloaded file to BKS outside this website. The committee uses the file only if you send it."},
        {"q": "Does this website take payment?", "a": "No."},
        {"q": "Is audience or ROI guaranteed?", "a": "No."},
        {"q": "Where does this sit in the ecosystem?", "a": "This is the sponsor organ of Bharatiya Krishak Samaj Pujo. The main Pujo site remains the umbrella."},
    ]

    if not any(item.get("href") == "#faq" for item in ex["stakeholders"]["nav"]):
        ex["stakeholders"]["nav"].append({"id": "faq", "label": "FAQ", "href": "#faq"})
    if not any(sec.get("id") == "farmtech-note" for sec in ex["stakeholders"]["sections"]):
        ex["stakeholders"]["sections"].append(
            {
                "id": "farmtech-note",
                "kicker": "FarmTech + AgriTech",
                "title": "Tools on a small farm, shown in public, not a notified mission.",
                "body": (
                    "The model on file includes monitoring and careful tools where they earn their keep. "
                    "FarmTech and AgriTech is named as that layer. It is not claimed as a government AgriTech scheme. "
                    "A fuller definition is to be confirmed."
                ),
            }
        )
    ex["stakeholders"]["faq"] = [
        {"q": "What is the initiative?", "a": "Bharatiya Krishak Samaj Pujo: a Sharadiya 2026 gathering that names the farmer, shows Integrated Farming, and is building a live demonstration."},
        {"q": "Who is organising it?", "a": "Organised by KarmYog for the 21st Century. Bharatiya Krishak Samaj is the organising partner."},
        {"q": "What is being proposed?", "a": "A public demonstration of Integrated Farming and a mobilisation target of about 5,000 village farms. Those farms are a goal, not a government target on this page."},
        {"q": "What is being executed?", "a": "The Puja is the visible week. The farm demonstration in the East Kolkata Wetlands, 500 metres from Sector V, is being built."},
        {"q": "What role can institutions play?", "a": "Look, question, visit when the demonstration can be walked, and say what would make village-farm pairing responsible."},
        {"q": "Is government already endorsing it?", "a": "No. Nothing here is a claimed government partnership, endorsement or scheme."},
        {"q": "What does the 294 figure mean?", "a": "West Bengal's assembly has 294 seats. That is the scale of the stakeholder universe, not a list of endorsements."},
        {"q": "How can an MLA or institution request a briefing?", "a": "Use the form on this page. It downloads a file to your device. You may also write to contact@bkswbengal.org or call +91 86552 46764."},
        {"q": "What information is currently confirmed?", "a": "Civic dates 16 to 20 October 2026 in Kolkata; organiser and organising partner as named; demonstration being built. Venue, committee and ritual clocks remain to be announced."},
        {"q": "Does requesting a briefing log me with a department?", "a": "No. The website does not submit the form to a server."},
        {"q": "Where does this sit in the ecosystem?", "a": "This is the government and influencer organ of Bharatiya Krishak Samaj Pujo. The main Pujo site remains the umbrella."},
    ]

    if not any(item.get("href") == "#faq" for item in ex["public"]["nav"]):
        ex["public"]["nav"].append({"id": "faq", "label": "FAQ", "href": "#faq"})
    ex["public"]["faq"] = [
        {"q": "What is Bharatiya Krishak Samaj Pujo?", "a": "A Durga Puja that puts the farmer in the gathering. Worship, craft, food, music and neighbourhood remain the centre. It does not rewrite Saptami or visarjan as an advertisement."},
        {"q": "When is it?", "a": "Sharadiya 2026. Civic dates on this project are 16 to 20 October 2026."},
        {"q": "Where is it?", "a": "Kolkata, West Bengal. Exact pandal address is to be announced."},
        {"q": "What is confirmed?", "a": "The event name, organiser (KarmYog for the 21st Century), organising partner (Bharatiya Krishak Samaj), and the civic window. Photographs from 2025 Mahotsav are historical or reference unless labelled otherwise."},
        {"q": "What is still to be announced?", "a": "Venue, committee and ritual clocks from a named Panjika."},
        {"q": "What is the farmer connection?", "a": "The gathering names the farmer, recognises unnamed farmers, including Ashtami awards, then shows Integrated Farming as a livelihood, then a live farm being built."},
        {"q": "What is Integrated Farming?", "a": "A loop on small land: leftover becomes input. Details live on the farmer door and the Integrated Farming page."},
        {"q": "How can the public participate?", "a": "Visit when the address is announced, explore the Puja pages, nominate a farmer (no entry fee as published), or leave volunteer interest. No shifts are open on this website."},
        {"q": "Does this website take payment?", "a": "No."},
        {"q": "Where does this sit in the ecosystem?", "a": "This is the public Puja organ of Bharatiya Krishak Samaj Pujo. The main Pujo site remains the umbrella."},
    ]

    ex["nrb"]["primaryCta"] = "Express supporter interest"
    if not any(item.get("href") == "#faq" for item in ex["nrb"]["nav"]):
        ex["nrb"]["nav"].append({"id": "faq", "label": "FAQ", "href": "#faq"})
    ex["nrb"]["faq"] = [
        {"q": "Why should NRBs participate?", "a": "If your native village is in Bengal, whether you live abroad or in a Kolkata high-rise, this Pujo is a way to take part in Bengal's farming story from wherever you are."},
        {"q": "What does participation mean?", "a": "Expressing interest in seeding a village integrated farm. Pairing with a local farmer team is intended later. It is not live allocation on this website."},
        {"q": "How does the Puja connect to the farmer?", "a": "The festival is when Bengal is paying attention together. The farmer is named, recognised, and then a farm livelihood is shown."},
        {"q": "What is the integrated farming vision?", "a": "A closed-loop holding, crop, animals, water, soil, market, shown as a demonstration being built, and as a model for village farms."},
        {"q": "What does the 5,000 goal represent?", "a": "A mobilisation target: about 5,000 patrons and about 5,000 farms. It is not a completed count."},
        {"q": "How does support work?", "a": "One lakh rupees is the proposed seed for one farm, or 20,000 rupees every two months. That is proposed, not collected here."},
        {"q": "Is payment available on this site?", "a": "No. No UPI, card or gateway."},
        {"q": "What happens after I download the interest form?", "a": "The file stays on your device. This website does not submit it to a server. You may send it to BKS separately."},
        {"q": "Are tax / 80G documents available?", "a": "To be confirmed. They are not issued on this website."},
        {"q": "Who organises this?", "a": "Organised by KarmYog for the 21st Century. Bharatiya Krishak Samaj is the organising partner."},
        {"q": "Where does this sit in the ecosystem?", "a": "This is the NRB and supporter organ of Bharatiya Krishak Samaj Pujo. The main Pujo site remains the umbrella."},
    ]

    SRC.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    SITE.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SRC, SITE)
    print("patched", SRC, "bytes", SRC.stat().st_size)


if __name__ == "__main__":
    main()
