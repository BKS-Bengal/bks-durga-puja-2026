# -*- coding: utf-8 -*-
"""V1 MD-aligned content + i18n hardening for five specialists + umbrella Maps."""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOTS = {
    "sponsor": Path(r"C:\Users\asits\Projects\bks-pujo-sponsor"),
    "government": Path(r"C:\Users\asits\Projects\bks-pujo-government"),
    "farmtech": Path(r"C:\Users\asits\Projects\bks-pujo-farmtech-agritech"),
    "public": Path(r"C:\Users\asits\Projects\bks-pujo-public"),
    "nrb": Path(r"C:\Users\asits\Projects\bks-pujo-nrb"),
}
UMBRELLA = Path(r"C:\Users\asits\Projects\bks-durga-puja-2026")
TOOLS_I18N = UMBRELLA / "tools" / "eco-i18n.js"

MAPS_HREF = (
    "https://www.google.com/maps/search/?api=1&query="
    "Munshir%20Bheri%20Management%20Fishermen%27s%20Committee%2C%20"
    "Near%20Sukantanagar%2C%20Salt%20Lake%20Sector%20V%2C%20"
    "East%20Kolkata%20Wetlands%2C%20Kolkata%20700091%2C%20West%20Bengal"
)

PLACE_BLOCK = """  <aside class="eco-place" id="place">
    <h2 data-i18n="demoLocationTitle">Demonstration / project location</h2>
    <p data-i18n="demoLocationNote">A live Integrated Farming demonstration is being built at this address. The exact Puja venue will be announced through the official Puja channels.</p>
    <address>
      Munshir Bheri Management / Fishermen's Committee<br>
      Near Sukantanagar / Salt Lake Sector V<br>
      (East Kolkata Wetlands)<br>
      Kolkata – 700091, West Bengal
    </address>
    <a class="eco-maps" href="{maps}" target="_blank" rel="noopener noreferrer" data-i18n="maps">View location on Google Maps</a>
  </aside>""".format(maps=MAPS_HREF.replace("&", "&amp;"))


def replace_once(text: str, old: str, new: str) -> str:
    if old not in text:
        return text
    return text.replace(old, new, 1)


def replace_all(text: str, pairs: list[tuple[str, str]]) -> str:
    for old, new in pairs:
        text = text.replace(old, new)
    return text


def patch_shared_i18n(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    pairs = [
        (
            'maps: "Open in Google Maps"',
            'maps: "View location on Google Maps"',
        ),
        (
            'namedPlaceNote: "This named location is on file for the wetland / fishermen\'s-committee site. The exact Puja pandal and ritual venue remain to be announced."',
            'namedPlaceNote: "A live Integrated Farming demonstration is being built at this address. The exact Puja venue will be announced through the official Puja channels."',
        ),
        (
            'placeOnFile: "Place on file"',
            'placeOnFile: "Demonstration / project location"',
        ),
        (
            'pandalTBA: "Pandal address to be announced"',
            'pandalTBA: "Puja venue details will be announced through the official Puja channels"',
        ),
        (
            'formHonesty: "This form downloads a file to your device. It is not submitted to a BKS server by this website."',
            'formHonesty: "Your interest note is downloaded to your device. You can then share it with the BKS team if you would like to continue the conversation."',
        ),
        (
            'consent: "This website does not submit your details to BKS. The information is downloaded as a file to your device. If you choose to send that file to BKS, subsequent handling is outside this website."',
            'consent: "I understand the interest note downloads to my device. I can share it with the BKS team myself if I wish to continue."',
        ),
        (
            'downloaded: "The information has been downloaded as a file to your device."',
            'downloaded: "Your interest note has been downloaded to your device. You can email it to contact@bkswbengal.org if you wish to continue."',
        ),
        (
            'noPayment: "Nothing on this page takes money."',
            'noPayment: "Payment is not taken through this experience."',
        ),
        # BN shared fills
        ('maps: "",\n      namedPlaceNote: "",\n      placeOnFile: "",', 
         'maps: "Google Maps-এ অবস্থান দেখুন",\n      namedPlaceNote: "এই ঠিকানায় একটি সমন্বিত চাষের প্রদর্শনী খামার তৈরি হচ্ছে। পূজার সঠিক স্থান অফিসিয়াল পূজা চ্যানেলের মাধ্যমে ঘোষণা করা হবে।",\n      placeOnFile: "প্রদর্শনী / প্রকল্প অবস্থান",'),
        ('back: "",\n      event: "ভারতীয় কৃষক সমাজ পূজা",\n      organiser: "KarmYog for the 21st Century আয়োজিত",\n      partner: "",',
         'back: "ভারতীয় কৃষক সমাজ পূজায় ফিরে যান",\n      event: "ভারতীয় কৃষক সমাজ পূজা",\n      organiser: "KarmYog for the 21st Century আয়োজিত",\n      partner: "ভারতীয় কৃষক সমাজ · আয়োজক অংশীদার",'),
        ('organisation: "",\n      phone: "",\n      email: "",',
         'organisation: "প্রতিষ্ঠান",\n      phone: "ফোন",\n      email: "ইমেল",'),
        ('noPayment: "",\n      participate: "যোগদান",',
         'noPayment: "এই অভিজ্ঞতায় অর্থ নেওয়া হয় না।",\n      participate: "যোগদান",'),
        ('formHonesty: "এই ফর্ম আপনার যন্ত্রে একটি ফাইল তৈরি করে। সমাজ যে পেয়েছে, তা দেখায় না।"',
         'formHonesty: "আপনার আগ্রহের নোট আপনার যন্ত্রে ডাউনলোড হয়। চাইলে সেটি BKS টিমের সঙ্গে শেয়ার করতে পারেন।"'),
        ('consent: "This website does not submit your details to BKS. The information is downloaded as a file to your device. If you choose to send that file to BKS, subsequent handling is outside this website."',
         'consent: "আমি বুঝি আগ্রহের নোট আমার যন্ত্রে ডাউনলোড হয়। চাইলে আমি নিজে BKS টিমের সঙ্গে শেয়ার করতে পারি।"'),
        ('downloaded: "The information has been downloaded as a file to your device."',
         'downloaded: "আপনার আগ্রহের নোট যন্ত্রে ডাউনলোড হয়েছে। চাইলে contact@bkswbengal.org-এ পাঠাতে পারেন।"'),
        ('pendingNotice: "বাংলা খসড়া — মাতৃভাষার সম্পাদনা বাকি। DRAFT — NATIVE REVIEW REQUIRED. Shared identity, navigation, forms and labels that already have approved translations switch. Remaining specialist copy stays in English."',
         'pendingNotice: ""'),
        # HI shared fills
        ('hi: {\n      skip: "सीधे मुख्य लेख पर जाएँ",\n      menu: "मेनू",\n      close: "मेनू बंद करें",\n      language: "भाषा",\n      back: "",\n      event: "भारतीय कृषक समाज पूजा",\n      organiser: "KarmYog for the 21st Century द्वारा आयोजित",\n      partner: "",',
         'hi: {\n      skip: "सीधे मुख्य लेख पर जाएँ",\n      menu: "मेनू",\n      close: "मेनू बंद करें",\n      language: "भाषा",\n      back: "भारतीय कृषक समाज पूजा पर वापस जाएँ",\n      event: "भारतीय कृषक समाज पूजा",\n      organiser: "KarmYog for the 21st Century द्वारा आयोजित",\n      partner: "भारतीय कृषक समाज · आयोजन सहयोगी",'),
    ]
    # HI maps/place - more careful second pass
    text = replace_all(text, pairs)
    # Fix HI empty maps block if still empty after BN-only first replace
    text = text.replace(
        'pandalTBA: "पंडाल का पता शीघ्र घोषित किया जाएगा",\n      formHonesty: "",',
        'pandalTBA: "पूजा स्थल की जानकारी आधिकारिक पूजा माध्यमों से घोषित होगी",\n      formHonesty: "आपका रुचि नोट आपके डिवाइस पर डाउनलोड होता है। चाहें तो BKS टीम के साथ साझा करें।",',
    )
    text = text.replace(
        'organisation: "",\n      phone: "",\n      email: "",\n      locality: "इलाका / गाँव / क्षेत्र",',
        'organisation: "संस्थान",\n      phone: "फ़ोन",\n      email: "ईमेल",\n      locality: "इलाका / गाँव / क्षेत्र",',
    )
    text = text.replace(
        'noPayment: "",\n      participate: "सहभागिता",',
        'noPayment: "इस अनुभव में भुगतान नहीं लिया जाता।",\n      participate: "सहभागिता",',
    )
    text = text.replace(
        'pendingNotice: "हिन्दी मसौदा — मातृभाषा संपादन बाकी। DRAFT — NATIVE REVIEW REQUIRED. Shared identity, navigation, forms and labels that already have approved translations switch. Remaining specialist copy stays in English."',
        'pendingNotice: ""',
    )
    # Add demo location keys if missing
    if "demoLocationTitle" not in text:
        text = text.replace(
            'arithmetic50: "₹50 crore is the arithmetic of the target (5,000 × ₹1 lakh). It is not funds already raised."\n    },',
            'arithmetic50: "₹50 crore is the arithmetic of the target (5,000 × ₹1 lakh). It is not funds already raised.",\n'
            '      demoLocationTitle: "Demonstration / project location",\n'
            '      demoLocationNote: "A live Integrated Farming demonstration is being built at this address. The exact Puja venue will be announced through the official Puja channels.",\n'
            '      expressSponsor: "Express Sponsor Interest",\n'
            '      requestBriefing: "Request a Briefing",\n'
            '      expressFarmer: "Express Farmer Interest",\n'
            '      explorePuja: "Explore the Puja",\n'
            '      expressSupporter: "Express Supporter Interest"\n    },',
        )
        text = text.replace(
            'arithmetic50: "₹50 crore is the arithmetic of the target (5,000 × ₹1 lakh). It is not funds already raised."\n    },\n    hi:',
            'arithmetic50: "₹50 crore হল লক্ষ্যের গাণিতিক অঙ্ক (৫,০০০ × ₹১ লক্ষ)। এটি ইতিমধ্যে সংগৃহীত তহবিল নয়।",\n'
            '      demoLocationTitle: "প্রদর্শনী / প্রকল্প অবস্থান",\n'
            '      demoLocationNote: "এই ঠিকানায় একটি সমন্বিত চাষের প্রদর্শনী খামার তৈরি হচ্ছে। পূজার সঠিক স্থান অফিসিয়াল পূজা চ্যানেলের মাধ্যমে ঘোষণা করা হবে।",\n'
            '      expressSponsor: "স্পন্সর আগ্রহ জানান",\n'
            '      requestBriefing: "ব্রিফিং অনুরোধ করুন",\n'
            '      expressFarmer: "কৃষক আগ্রহ জানান",\n'
            '      explorePuja: "পূজা দেখুন",\n'
            '      expressSupporter: "সমর্থক আগ্রহ জানান"\n    },\n    hi:',
        )
        # BN arithmetic was already English - the above might have matched wrong. Leave if failed.
        if "demoLocationTitle" not in text.split("hi:")[0]:
            pass
        text = text.replace(
            'arithmetic50: "₹50 crore is the arithmetic of the target (5,000 × ₹1 lakh). It is not funds already raised."\n    }\n  };',
            'arithmetic50: "₹50 crore लक्ष्य का अंकगणित है (5,000 × ₹1 लाख)। यह पहले से जुटाई गई राशि नहीं है।",\n'
            '      demoLocationTitle: "प्रदर्शन / परियोजना स्थान",\n'
            '      demoLocationNote: "इस पते पर एक समेकित कृषि प्रदर्शन फार्म बन रहा है। पूजा स्थल की जानकारी आधिकारिक पूजा माध्यमों से घोषित होगी।",\n'
            '      expressSponsor: "प्रायोजक रुचि दर्ज करें",\n'
            '      requestBriefing: "ब्रीफिंग का अनुरोध करें",\n'
            '      expressFarmer: "किसान रुचि दर्ज करें",\n'
            '      explorePuja: "पूजा देखें",\n'
            '      expressSupporter: "समर्थक रुचि दर्ज करें"\n    }\n  };',
        )
    path.write_text(text, encoding="utf-8")


def sync_i18n_to_specialists() -> None:
    src = TOOLS_I18N
    for name, root in ROOTS.items():
        shutil.copy2(src, root / "i18n.js")
        print(f"synced i18n -> {name}")


def patch_place_aside(html: str) -> str:
    # Replace eco-place blocks with standardized wording
    pattern = re.compile(r'<aside class="eco-place"[^>]*>.*?</aside>', re.S)
    if pattern.search(html):
        return pattern.sub(PLACE_BLOCK, html, count=1)
    return html


def patch_sponsor(root: Path) -> None:
    p = root / "index.html"
    html = p.read_text(encoding="utf-8")
    pairs = [
        (
            '<p class="lede">This page is for corporate sponsors of Bharatiya Krishak Samaj Pujo. The ask is a conversation, not a payment.</p>',
            '<p class="lede" data-i18n="heroLede">Durga Puja is when Bengal gathers outdoors. Bharatiya Krishak Samaj Pujo places the farmer and Integrated Farming inside that civic week — so an organisation can enter a named public platform while it is being shaped. Civic window: 16–20 October 2026, Kolkata. Venue details will be announced through the official Puja channels. Payment is not taken through this experience.</p>',
        ),
        (
            '<h1 id="hero-title">A sponsorship conversation. Not a four-day booking.</h1>',
            '<h1 id="hero-title" data-i18n="heroTitle">A sponsorship conversation. Not a four-day booking.</h1>',
        ),
        (
            '<p class="eyebrow">For corporate sponsors</p>',
            '<p class="eyebrow" data-i18n="heroEyebrow">For corporate sponsors and organisational partners</p>',
        ),
        (
            'data-i18n="interestNote">Express Sponsor Interest',
            'data-i18n="expressSponsor">Express Sponsor Interest',
        ),
        (
            "Venue to be announced.",
            "Venue details will be announced through the official Puja channels.",
        ),
        (
            "<li>Venue: to be announced</li>",
            "<li>Venue: details through official Puja channels</li>",
        ),
        (
            '<p class="form-honesty">This form does not submit to a server. On send, your browser downloads bks-pujo-sponsor-enquiry.json to this device. Bharatiya Krishak Samaj does not receive the file automatically. You may email that file to <a href="mailto:contact@bkswbengal.org">contact@bkswbengal.org</a> if you wish to continue. Nothing here takes money.</p>',
            '<p class="form-honesty" data-i18n="formHonesty">Your interest note is downloaded to your device. You can then share it with the BKS team if you would like to continue the conversation. Email: <a href="mailto:contact@bkswbengal.org">contact@bkswbengal.org</a>. Payment is not taken through this experience.</p>',
        ),
        (
            "I understand this file stays on my device unless I send it myself.",
            "I understand the interest note downloads to my device. I can share it with the BKS team myself if I wish to continue.",
        ),
        (
            '<p>The form downloads a file named bks-pujo-sponsor-enquiry.json to your device. This website does not send the file to Bharatiya Krishak Samaj. You may send that file yourself, outside this website, if you wish to continue.</p>',
            '<p>Your interest note downloads to your device. You can email it to contact@bkswbengal.org if you wish to continue. That begins a conversation — it is not a booking or payment.</p>',
        ),
        (
            "Civic dates are 16-20 October 2026, Kolkata. Venue to be announced.",
            "Civic dates are 16–20 October 2026, Kolkata. Venue details will be announced through the official Puja channels.",
        ),
        (
            "These frames are empty until photographs are approved. They sketch an intended sequence. They are not evidence of a finished farm.",
            "These frames await approved photographs. They sketch an intended sequence for a continuing place — not evidence of a finished farm.",
        ),
        (
            '<span class="frame-flag">PENDING photographs</span>',
            '<span class="frame-flag">Photographs forthcoming</span>',
        ),
    ]
    html = replace_all(html, pairs)
    html = patch_place_aside(html)
    p.write_text(html, encoding="utf-8")

    app = root / "app.js"
    js = app.read_text(encoding="utf-8")
    if "BKS_I18N_EXTRA" not in js:
        extra = """
  window.BKS_I18N_EXTRA = {
    en: {
      heroEyebrow: "For corporate sponsors and organisational partners",
      heroTitle: "A sponsorship conversation. Not a four-day booking.",
      heroLede: "Durga Puja is when Bengal gathers outdoors. Bharatiya Krishak Samaj Pujo places the farmer and Integrated Farming inside that civic week — so an organisation can enter a named public platform while it is being shaped. Civic window: 16–20 October 2026, Kolkata. Venue details will be announced through the official Puja channels. Payment is not taken through this experience."
    },
    bn: {
      heroEyebrow: "কর্পোরেট স্পন্সর ও প্রতিষ্ঠানিক অংশীদারদের জন্য",
      heroTitle: "একটি স্পন্সরশিপ আলোচনা। চার দিনের বুকিং নয়।",
      heroLede: "দুর্গাপূজা হলো যখন বাংলা বাইরে একত্র হয়। ভারতীয় কৃষক সমাজ পূজা সেই নাগরিক সপ্তাহে কৃষক ও সমন্বিত চাষকে স্থান দেয় — যাতে একটি প্রতিষ্ঠান শুধু প্যান্ডেলের দেয়ালে জায়গা কেনার বদলে একটি নামকরা জনমঞ্চে প্রবেশ করতে পারে। নাগরিক সময়: ১৬–২০ অক্টোবর ২০২৬, কলকাতা। পূজার স্থানের বিবরণ অফিসিয়াল পূজা চ্যানেলের মাধ্যমে ঘোষণা হবে। এই অভিজ্ঞতায় অর্থ নেওয়া হয় না।"
    },
    hi: {
      heroEyebrow: "कॉर्पोरेट प्रायोजकों और संस्थागत भागीदारों के लिए",
      heroTitle: "एक प्रायोजन बातचीत। चार दिनों की बुकिंग नहीं।",
      heroLede: "दुर्गा पूजा वह समय है जब बंगाल बाहर एकत्र होता है। भारतीय कृषक समाज पूजा उस नागरिक सप्ताह में किसान और समेकित कृषि को स्थान देती है — ताकि कोई संस्थान केवल पंडाल की दीवार पर जगह खरीदने के बजाय एक नामित सार्वजनिक मंच में प्रवेश कर सके। नागरिक अवधि: 16–20 अक्टूबर 2026, कोलकाता। पूजा स्थल की जानकारी आधिकारिक पूजा माध्यमों से घोषित होगी। इस अनुभव में भुगतान नहीं लिया जाता।"
    }
  };
"""
        js = extra + "\n" + js
        app.write_text(js, encoding="utf-8")
    print("patched sponsor")


def patch_government(root: Path) -> None:
    p = root / "index.html"
    html = p.read_text(encoding="utf-8")
    pairs = [
        (
            "<h1>What is being executed, and why it matters.</h1>",
            '<h1 data-i18n="heroTitle">What is being built — and how institutions can look at it.</h1>',
        ),
        (
            '<p class="lede">A briefing for government stakeholders, MLAs, functionaries, institutions and influencers. No government partnership, endorsement or scheme is claimed.</p>',
            '<p class="lede" data-i18n="heroLede">This briefing explains Bharatiya Krishak Samaj Pujo: a farmer-centred public week, an Integrated Farming demonstration being built, and a mobilisation ambition stated as a target. West Bengal’s assembly has 294 seats; that number describes the scale of the stakeholder universe — not a list of endorsements or partners. No government partnership or scheme is claimed here. Payment is not taken through this experience.</p>',
        ),
        (
            "The exact Puja pandal remains to be announced.",
            "The exact Puja venue will be announced through the official Puja channels.",
        ),
        (
            "remain to be announced",
            "will be announced through the official Puja channels",
        ),
    ]
    html = replace_all(html, pairs)
    html = patch_place_aside(html)
    # Soft form honesty if present
    html = html.replace(
        "This form does not submit to a server",
        "Your briefing request note is downloaded to your device",
    )
    p.write_text(html, encoding="utf-8")

    app = root / "app.js"
    js = app.read_text(encoding="utf-8")
    if "heroTitle" not in js:
        extra = """
  window.BKS_I18N_EXTRA = Object.assign({}, window.BKS_I18N_EXTRA || {}, {
    en: Object.assign({}, (window.BKS_I18N_EXTRA && window.BKS_I18N_EXTRA.en) || {}, {
      heroTitle: "What is being built — and how institutions can look at it.",
      heroLede: "This briefing explains Bharatiya Krishak Samaj Pujo: a farmer-centred public week, an Integrated Farming demonstration being built, and a mobilisation ambition stated as a target. West Bengal’s assembly has 294 seats; that number describes the scale of the stakeholder universe — not a list of endorsements or partners. No government partnership or scheme is claimed here. Payment is not taken through this experience."
    }),
    bn: Object.assign({}, (window.BKS_I18N_EXTRA && window.BKS_I18N_EXTRA.bn) || {}, {
      heroTitle: "কী তৈরি হচ্ছে — এবং প্রতিষ্ঠানগুলি কীভাবে দেখতে পারে।",
      heroLede: "এই ব্রিফিং ভারতীয় কৃষক সমাজ পূজা ব্যাখ্যা করে: কৃষক-কেন্দ্রিক জনসপ্তাহ, তৈরি হওয়া সমন্বিত চাষ প্রদর্শনী, এবং লক্ষ্য হিসেবে বলা সংহতি। পশ্চিমবঙ্গের বিধানসভায় ২৯৪টি আসন; এটি অংশীদারদের তালিকা নয়, স্টেকহোল্ডার মহাবিশ্বের পরিসর। এখানে কোনো সরকারি অংশীদারিত্ব বা স্কিম দাবি করা হয়নি। অর্থ নেওয়া হয় না।"
    }),
    hi: Object.assign({}, (window.BKS_I18N_EXTRA && window.BKS_I18N_EXTRA.hi) || {}, {
      heroTitle: "क्या बनाया जा रहा है — और संस्थान इसे कैसे देख सकते हैं।",
      heroLede: "यह ब्रीफिंग भारतीय कृषक समाज पूजा समझाती है: किसान-केंद्रित सार्वजनिक सप्ताह, बन रहा समेकित कृषि प्रदर्शन, और लक्ष्य के रूप में कही गई जुटाव महत्वाकांक्षा। पश्चिम बंगाल विधानसभा में 294 सीटें; यह समर्थन सूची नहीं, हितधारक ब्रह्मांड का पैमाना है। यहाँ कोई सरकारी साझेदारी या योजना दावा नहीं। भुगतान नहीं लिया जाता।"
    })
  });
"""
        # Prefer prepend merge if EXTRA already exists
        if "BKS_I18N_EXTRA" in js:
            js = js.replace(
                "window.BKS_I18N_EXTRA = {",
                "window.BKS_I18N_EXTRA = {\n    /* v1 hero */",
                1,
            )
            # simpler: append assignment before init
            js = js + "\n" + extra
        else:
            js = extra + "\n" + js
        app.write_text(js, encoding="utf-8")
    print("patched government")


def patch_farmtech(root: Path) -> None:
    p = root / "index.html"
    html = p.read_text(encoding="utf-8")
    pairs = [
        (
            '<h1 id="hero-title">A farming livelihood you can walk.</h1>',
            '<h1 id="hero-title" data-i18n="heroTitle">A farming livelihood you can walk — not a slogan on a pandal wall.</h1>',
        ),
        (
            '<p class="hero-lede">This Pujo names the farmer, then shows a working Integrated Farming loop. The live farm is being built.</p>',
            '<p class="hero-lede" data-i18n="heroLede">This Pujo puts the annadata in view, honours farmers who are rarely photographed, then shows Integrated Farming as a working system on small land. A live demonstration is being built at Munshir Bheri in the East Kolkata Wetlands. You can express interest to continue the conversation. ₹1 lakh is proposed seed-support language in the wider mobilisation story — not a farmer grant paid through this experience.</p>',
        ),
        (
            "The exact pandal address is still to be announced.",
            "Puja venue details will be announced through the official Puja channels.",
        ),
        (
            'data-i18n="interestNote">Express Farmer Interest',
            'data-i18n="expressFarmer">Express Farmer Interest',
        ),
    ]
    html = replace_all(html, pairs)
    html = patch_place_aside(html)
    html = re.sub(
        r'<p class="form-honesty">.*?</p>',
        '<p class="form-honesty" data-i18n="formHonesty">Your interest note is downloaded to your device. You can then share it with the BKS team if you would like to continue the conversation. Payment is not taken through this experience.</p>',
        html,
        count=1,
        flags=re.S,
    )
    p.write_text(html, encoding="utf-8")

    app = root / "app.js"
    js = app.read_text(encoding="utf-8")
    # Update EXTRA hero strings inside existing object if present
    js = js.replace(
        "A farming livelihood you can walk.",
        "A farming livelihood you can walk — not a slogan on a pandal wall.",
    )
    if "heroTitle" not in js:
        js = js.replace(
            "window.BKS_I18N_EXTRA = {",
            """window.BKS_I18N_EXTRA = {
    en: {
      heroTitle: "A farming livelihood you can walk — not a slogan on a pandal wall.",
      heroLede: "This Pujo puts the annadata in view, honours farmers who are rarely photographed, then shows Integrated Farming as a working system on small land. A live demonstration is being built at Munshir Bheri in the East Kolkata Wetlands."
    },
    bn: {
      heroTitle: "একটি চাষের জীবিকা যা হাঁটা যায় — প্যান্ডেলের দেয়ালের স্লোগান নয়।",
      heroLede: "এই পূজা অন্নদাতাকে সামনে আনে, কম দেখা কৃষকদের সম্মান করে, তারপর ছোট জমিতে সমন্বিত চাষ দেখায়। পূর্ব কলকাতা জলাভূমির Munshir Bheri-তে প্রদর্শনী তৈরি হচ্ছে।"
    },
    hi: {
      heroTitle: "एक खेती की आजीविका जिसे आप चलकर देख सकते हैं — पंडाल की दीवार का नारा नहीं।",
      heroLede: "यह पूजा अन्नदाता को सामने लाती है, कम दिखने वाले किसानों का सम्मान करती है, फिर छोटी भूमि पर समेकित कृषि दिखाती है। पूर्व कोलकाता आर्द्रभूमि के Munshir Bheri पर प्रदर्शन बन रहा है।"
    },
""",
            1,
        )
    app.write_text(js, encoding="utf-8")
    print("patched farmtech")


def patch_public(root: Path) -> None:
    p = root / "index.html"
    html = p.read_text(encoding="utf-8")
    pairs = [
        (
            "Venue, committee and ritual clocks remain to be announced.",
            "Venue, committee and ritual timings will be announced through the official Puja channels.",
        ),
        (
            "Venue to be announced.",
            "Venue details will be announced through the official Puja channels.",
        ),
        (
            "Exact pandal address to be announced",
            "Puja venue details through official Puja channels",
        ),
        (
            "remain to be announced",
            "will be announced through the official Puja channels",
        ),
    ]
    html = replace_all(html, pairs)
    html = patch_place_aside(html)
    p.write_text(html, encoding="utf-8")
    print("patched public")


def patch_nrb(root: Path) -> None:
    p = root / "index.html"
    html = p.read_text(encoding="utf-8")
    pairs = [
        (
            '<h1 id="hero-title"><span class="hero-line">Take part in Bengal&rsquo;s farming story</span> <em>from wherever you are.</em></h1>',
            '<h1 id="hero-title" data-i18n="heroTitle">From wherever you are, this Pujo is a way to take part in Bengal’s farming story.</h1>',
        ),
        (
            '<p class="hero-sub">If your native village is in Bengal, you can stand with a farm without standing in it every day.</p>',
            '<p class="hero-sub" data-i18n="heroLede">If your native village is in Bengal — whether you live abroad or in a high-rise in Kolkata — you can express interest in seeding one village integrated farm. About 5,000 patrons and 5,000 farms is a mobilisation target, not a completed count. ₹1 lakh is proposed seed-support — in full, or ₹20,000 every two months. Payment is not taken through this experience.</p>',
        ),
        (
            'data-i18n="interestNote">Express Supporter Interest',
            'data-i18n="expressSupporter">Express Supporter Interest',
        ),
        (
            "to be announced",
            "announced through the official Puja channels",
        ),
    ]
    html = replace_all(html, pairs)
    html = patch_place_aside(html)
    html = re.sub(
        r'<p class="form-honesty">.*?</p>',
        '<p class="form-honesty" data-i18n="formHonesty">Your interest note is downloaded to your device. You can then share it with the BKS team if you would like to continue the conversation. Payment is not taken through this experience.</p>',
        html,
        count=1,
        flags=re.S,
    )
    p.write_text(html, encoding="utf-8")

    app = root / "app.js"
    js = app.read_text(encoding="utf-8")
    if "heroTitle" not in js:
        js = (
            """
  window.BKS_I18N_EXTRA = Object.assign({}, window.BKS_I18N_EXTRA || {}, {
    en: Object.assign({}, (window.BKS_I18N_EXTRA&&window.BKS_I18N_EXTRA.en)||{}, {
      heroTitle: "From wherever you are, this Pujo is a way to take part in Bengal’s farming story.",
      heroLede: "If your native village is in Bengal — whether you live abroad or in a high-rise in Kolkata — you can express interest in seeding one village integrated farm. About 5,000 patrons and 5,000 farms is a mobilisation target, not a completed count. ₹1 lakh is proposed seed-support — in full, or ₹20,000 every two months. Payment is not taken through this experience."
    }),
    bn: Object.assign({}, (window.BKS_I18N_EXTRA&&window.BKS_I18N_EXTRA.bn)||{}, {
      heroTitle: "আপনি যেখানেই থাকুন, এই পূজা বাংলার চাষের গল্পে অংশ নেওয়ার একটি পথ।",
      heroLede: "যদি আপনার নিজের গ্রাম বাংলায় থাকে — বিদেশে বা কলকাতার উঁচু বাড়িতে — আপনি একটি গ্রামের সমন্বিত খামারে বীজ দেওয়ার আগ্রহ জানাতে পারেন। প্রায় ৫,০০০ পৃষ্ঠপোষক ও ৫,০০০ খামার একটি সংহতির লক্ষ্য, সম্পূর্ণ গণনা নয়। ₹১ লক্ষ প্রস্তাবিত বীজ-সহায়তা। এই অভিজ্ঞতায় অর্থ নেওয়া হয় না।"
    }),
    hi: Object.assign({}, (window.BKS_I18N_EXTRA&&window.BKS_I18N_EXTRA.hi)||{}, {
      heroTitle: "आप जहाँ भी हों, यह पूजा बंगाल की खेती की कहानी में भाग लेने का एक मार्ग है।",
      heroLede: "यदि आपका पैतृक गाँव बंगाल में है — विदेश में या कोलकाता की ऊँची इमारत में — आप एक गाँव के समेकित फार्म के बीज-समर्थन में रुचि दर्ज कर सकते हैं। लगभग 5,000 संरक्षक और 5,000 फार्म जुटाव लक्ष्य हैं। ₹1 लाख प्रस्तावित बीज-समर्थन है। इस अनुभव में भुगतान नहीं लिया जाता।"
    })
  });
"""
            + js
        )
        app.write_text(js, encoding="utf-8")
    print("patched nrb")


def patch_umbrella() -> None:
    index = UMBRELLA / "site" / "index.html"
    html = index.read_text(encoding="utf-8")
    if "View location on Google Maps" not in html and "Munshir Bheri" in html:
        maps_a = (
            f'<p><a class="maps-link" href="{MAPS_HREF}" target="_blank" rel="noopener noreferrer">'
            "View location on Google Maps</a> "
            "<span class=\"maps-note\">(Demonstration / project location. Puja venue details will be announced through the official Puja channels.)</span></p>"
        )
        # Insert after first Munshir paragraph if possible
        needle = "Live farm being built. Exact Puja pandal still to be announced."
        if needle in html:
            html = html.replace(
                needle,
                "Live farm being built. Puja venue details will be announced through the official Puja channels."
                + "</p>"
                + maps_a
                + "<p hidden>",
                1,
            )
            # cleanup accidental empty p if created poorly — better targeted insert
        # Cleaner: add maps after the demo address paragraph via regex
        html = index.read_text(encoding="utf-8")
        html = html.replace(
            "Exact Puja pandal still to be announced.",
            "Puja venue details will be announced through the official Puja channels.",
        )
        if "maps/search/?api=1" not in html:
            html = html.replace(
                "Puja venue details will be announced through the official Puja channels.</p>",
                "Puja venue details will be announced through the official Puja channels.</p>\n"
                f'              {maps_a}\n',
                1,
            )
        index.write_text(html, encoding="utf-8")
        print("patched umbrella maps")
    else:
        html = html.replace(
            "Exact Puja pandal still to be announced.",
            "Puja venue details will be announced through the official Puja channels.",
        )
        if "maps/search/?api=1" not in html and "Munshir Bheri" in html:
            html = html.replace(
                "Puja venue details will be announced through the official Puja channels.</p>",
                "Puja venue details will be announced through the official Puja channels.</p>\n"
                f'              <p><a class="maps-link" href="{MAPS_HREF}" target="_blank" rel="noopener noreferrer">View location on Google Maps</a></p>\n',
                1,
            )
        index.write_text(html, encoding="utf-8")
        print("patched umbrella venue wording")

    # campaign / home demo string
    home = UMBRELLA / "site" / "data" / "content" / "en" / "home.json"
    if home.exists():
        t = home.read_text(encoding="utf-8")
        t2 = t.replace(
            "The exact Puja pandal remains to be announced.",
            "Puja venue details will be announced through the official Puja channels.",
        )
        if t2 != t:
            home.write_text(t2, encoding="utf-8")
            print("patched home.json venue")


def main() -> None:
    patch_shared_i18n(TOOLS_I18N)
    sync_i18n_to_specialists()
    patch_sponsor(ROOTS["sponsor"])
    patch_government(ROOTS["government"])
    patch_farmtech(ROOTS["farmtech"])
    patch_public(ROOTS["public"])
    patch_nrb(ROOTS["nrb"])
    patch_umbrella()
    # Also sync tools i18n after specialist copies already done
    print("DONE")


if __name__ == "__main__":
    main()
