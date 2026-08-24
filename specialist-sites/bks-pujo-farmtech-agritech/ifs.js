(function () {
  "use strict";

var COPY = {
    en: {
      nav: "Integrated Farming",
      kicker: "Integrated Farming",
      title: "A living farm, where one part can feed another.",
      lede: "Integrated Farming is not simply many things on one plot. It is a way of arranging crop, animals, water, trees and the household so leftovers can become the next input.",
      photoAlt: "Illustrative Integrated Farming landscape: pond, crops, animals, trees and people. Conceptual picture, not a photograph of the 2026 pandal or of a built BKS farm.",
      photoCap: "Illustrative Integrated Farming landscape. A conceptual picture of how crop, water, livestock and people can sit together. Not a photograph of the 2026 pandal, and not a documentary image of a BKS farm already built.",
      frame: {
        main: "The Puja names the annadata. Integrated Farming is the living-farm idea that follows — then careful tools, then a longer invitation for Bengal.",
        sponsor: "This is the farming idea the Puja places in public view. Association is with culture, community and a living farm story.",
        gov: "Integrated Farming is public knowledge for agricultural resilience, nutrition and community learning in India and West Bengal.",
        farm: "The loop is the point. Tools come later. Mix, scale and results vary with land, water, labour and care.",
        public: "You do not need to be a farmer to follow this. The Puja uses its gathering to show how a farm can work as a living system.",
        nrb: "From a distance, this is the longer agricultural idea the Puja holds: leftover becomes input, and Bengal’s farms can be imagined as living systems, not a single standing crop."
      },
      whatH: "What is Integrated Farming?",
      whatP1: "An Integrated Farming System brings complementary work onto the same holding: crops, horticulture, livestock, fishery, poultry or ducks, trees, bees, mushrooms, composting and other bio-inputs — chosen for the place, not copied as a kit.",
      whatP2: "The useful idea is simple. The output or leftover of one activity can become the input of another. Crop residue can feed animals or compost. Manure can return to soil, compost or energy. Pond water can hold fish and help irrigate. Pond silt can enrich fields. Produce feeds the house first, then the market.",
      whatP3: "The design looks for less unused leftover and more complementarity: mixed cropping, rotation, trees, animals and water working with one another rather than competing for the same space. Bunds, pond dykes and homestead corners are part of the farm, not spare ground.",
      whatP4: "Not every farm needs every enterprise. The mix should follow land, water, soil, climate, the household, the market, labour and local knowledge. The aim is less waste and a sturdier livelihood. It is not a promise of “zero waste”, guaranteed yield or a fixed income.",
      whyH: "Why it matters",
      why: [
        { t: "Diversification", b: "Several enterprises share the year, so one crop is not asked to carry every weather, pest or market risk." },
        { t: "Land and water", b: "Bunds, pond edges, homestead corners and stored water are put to work, not left idle." },
        { t: "Nutrient return", b: "Residues, manure and silt can cycle back as compost, feed or soil, instead of leaving the farm as unused leftover." },
        { t: "Soil and water care", b: "Compost, residue return and tree cover can help soil organic matter, microbial life and reduced erosion — depending on how the farm is tended." },
        { t: "Resilience", b: "Mixed crops, trees and animals can cushion climate and market shocks better than a single standing crop." },
        { t: "Food and livelihood", b: "A wider plate at home, and more than one way to earn, when the mix is tended well." }
      ],
      loopH: "How the farm connects",
      loopIntro: "See the holding as a loop, not a list. One leftover can become the next input.",
      loop: ["Crop", "Livestock", "Manure / compost", "Soil", "Water", "Fish", "Horticulture", "Home / market"],
      loopNote: "The arrow is a teaching picture. Real farms skip, swap and resize these steps.",
      loopAdapt: "A hill orchard with goats is not a coastal pond with ducks. Integrated Farming is adapted, not copied.",
      indiaH: "Why it matters in India",
      indiaP1: "Most Indian holdings are small. A single crop on a small parcel carries weather, market and input risk in one place. Integrated Farming is one way households have combined enterprises according to local soil, rain, labour and market — not a single national template.",
      indiaP2: "Studies of Integrated Farming models, compared with the prevailing crop systems around them, have reported higher total production measured as rice-equivalent yield. In Eastern Himalayan settings the lift has been modest — around nine percent. In some other agro-climatic regions it has been much larger. More than twenty peer-reviewed studies have also reported higher net income and lower per-unit production costs than sole cropping.",
      indiaP3: "On a one-hectare crop–livestock–dairy model, studies recorded about 750 person-days of work in a year, against about 225 in a rice–maize system. Case evidence from rice–wheat landscapes, including work reported from Punjab and West Bengal, has shown that bringing dairy, horticulture and aquaculture onto the same holding can raise net returns compared with rice–wheat alone. Results vary. They are not guaranteed, and they are not Bharatiya Krishak Samaj Pujo results.",
      indiaP4: "Nutrition-sensitive integrated farms in other states have widened what families grow and eat. One reading of thousands of farms found crop lists and home gardens growing more diverse, and a much larger share of women eating from at least five food groups than a few years earlier. Women often carry livestock, poultry, compost and seed. In dairy, women’s share of the work is very high. The model can open livelihood. It can also add labour if tools and sharing are weak.",
      wbH: "Integrated Farming in West Bengal",
      wbP: "West Bengal runs from the northern hills through Terai and Teesta country, across old and new alluvial rice belts, into red and laterite tracts and the coastal saline zone. Integrated Farming therefore has no single template for the state. The mix should follow the zone: land, water, soil, climate, the household, the market, labour and local knowledge.",
      wbP2: "Krishi Vigyan Kendras across West Bengal have promoted models fitted to those zones, moving from a single enterprise toward a farm plan made for the household in front of them. National work on rainfed and sustainable agriculture also recognises Integrated Farming. That is public institutional context, not a Bharatiya Krishak Samaj programme, and not a claim of partnership.",
      wbP3: "For coastal saline, flood-prone and drought-prone pockets, mixed systems can spread risk: fish, salt-aware crops, horticulture and livestock sharing the same holding, with rainwater and land shaping where water is the limit. Nutrition can be planned into the farm — home gardens, fruit, milk, eggs and fish beside staple grain — rather than treated as a separate afterthought.",
      zones: [
        { t: "Northern hills, Terai and Teesta", b: "Horticulture-led systems: vegetables, fruit and livestock, using slope, moisture and homestead space together." },
        { t: "Old and new alluvial belts", b: "Rice-based systems that can bring in fish, ducks, horticulture and dairy on the same holding." },
        { t: "Red and laterite tracts", b: "Mixed cropping with millets, pulses and livestock, where soils are lighter and rain is less assured." },
        { t: "Coastal saline areas", b: "Fishery with vegetables and fruit on pond embankments, rainwater harvesting and land shaping so salt and scarce fresh water are managed together." }
      ],
      modelsH: "Models already walked in West Bengal",
      modelsP: "Examples from West Bengal show Integrated Farming in farmers’ fields — through Krishi Vigyan Kendras and other public and civil-society work. They show that the idea is already practised, not only written. They are public examples, not Bharatiya Krishak Samaj projects or partnerships.",
      modelsP2: "A sustainable integrated farming approach has also been used with thousands of small and marginal farm families in resource-poor parts of Jharkhand and West Bengal, diversifying crops, trees, livestock, poultry, fish, composting and bees, and making more use of what the farm already produces.",
      models: [
        { t: "Murshidabad", b: "Ponds used with fish, livestock and poultry across a spread of blocks, recycling farm leftovers as feed and organic input." },
        { t: "Dakshin Dinajpur", b: "Fish–duck–vegetable systems on pond water and dykes, using the water surface and the bund together." },
        { t: "South 24 Parganas", b: "Fishery-based models with carp, catfish, prawn and ornamental fish; vegetables and fruit on embankments; land shaping and rainwater harvesting in a coastal setting." },
        { t: "Krishi Vigyan Kendras", b: "Krishi Vigyan Kendras across West Bengal have promoted zone-wise models so one leftover can support the next enterprise." },
        { t: "Smallholder integrated farms", b: "Civil-society programmes in poorer districts have walked diversified, low-external-input farms with small families — public examples of practice, not BKS partnerships." }
      ],
      futureH: "What the future can look like",
      futureP1: "The opportunity is serious. Climate-resilient mixes for saline, flood and drought pockets. More diverse food. Work that can include youth and women — dairy, poultry, fishery, trees, compost, value from the farm — if training, tools and markets keep pace. Careful technology after the farm system. Scaling from models that already work locally, through Krishi Vigyan Kendras, farmer groups and field programmes already on the ground.",
      futureP2: "West Bengal already has field models to learn from. The next step is not a slogan. It is farm planning that fits the zone, extension that stays with the household, and scaling that does not flatten local difference.",
      futureP3: "A credible farm story names the work as well as the hope. Integrated Farming is not effortless, and it is not a guaranteed transformation.",
      challengeH: "What the work asks",
      challenges: [
        { t: "Labour", b: "Several enterprises ask more hands. Without sharing, tools or mechanisation, the extra work often falls on women." },
        { t: "Know-how", b: "The farm needs understanding of more than one enterprise, and of how they meet. Training, field schools and steady advisory matter." },
        { t: "Tools", b: "Suitable mechanisation and labour-saving implements help the mix stay possible on a small holding." },
        { t: "Data", b: "Long-term evidence on area, water, soil, emissions and biodiversity is still thin. Planning at scale needs that honesty." }
      ],
      bioH: "A farm of living relationships",
      bioP: "Soil, water, plants, trees, animals, birds, fish, insects, microbes and people are not separate drawers. Manure feeds soil. Soil holds crops. Crops feed animals and the household. Ponds hold fish and water for plants. Trees hold soil, shade and birds. People tend the whole.",
      bioP2: "The point is not only to grow more. It is to design relationships in a living system. Some name that biophilic: life making room for life. The word matters less than the farm that can be walked.",
      techH: "Where FarmTech + AgriTech fits",
      techP: "Farm first. Integrated system second. Careful technology third. Tools can help a farmer observe soil, measure moisture, manage water, understand crops, watch ponds, tend livestock and keep records that support a decision.",
      techP2: "They do not replace the loop. They do not guarantee yield. This page does not sell a kit, name a vendor, or promise an AI harvest.",
      pujaH: "From Puja to the annadata",
      pujaP: "The sequence stays: Puja → annadata → agriculture → Integrated Farming → nature → FarmTech + AgriTech → a longer agricultural future for Bengal.",
      pujaP2: "The Puja is not turned into a textbook. It uses its platform so the farmer, and leftover-becomes-input, stand in public view. Integrated Farming gives that conversation a practical direction.",
      nextFarm: "See how careful tools sit with the farm",
      nextMain: "Return to the Pujo gathering"
    },
    bn: {
      nav: "সমন্বিত চাষ",
      kicker: "সমন্বিত চাষ",
      title: "জীবন্ত খামার, যেখানে এক অংশ অন্য অংশকে খাওয়াতে পারে।",
      lede: "সমন্বিত চাষ মানে এক জমিতে শুধু অনেক কাজ জড়ানো নয়। ফসল, পশু, জল, গাছ ও ঘর এমন করে সাজানো, যাতে বাঁচতি পরের কাজে লাগে।",
      photoAlt: "সমন্বিত চাষের দৃষ্টান্তমূলক চিত্র: পুকুর, ফসল, পশু, গাছ ও মানুষ। ধারণার ছবি, ২০২৬-এর প্যান্ডেল বা নির্মিত বি কে এস খামারের ছবি নয়।",
      photoCap: "সমন্বিত চাষের দৃষ্টান্তমূলক ভূদৃশ্য। ধারণার ছবি। ২০২৬-এর প্যান্ডেল নয়, আর ইতিমধ্যে গড়া বি কে এস খামারের আলোকচিত্রও নয়।",
      frame: {
        main: "পূজা অন্নদাতার নাম করে। সমন্বিত চাষ তার পরের জীবন্ত খামারের কথা — তারপর সতর্ক সরঞ্জাম, তারপর বাংলার দীর্ঘতর নিমন্ত্রণ।",
        sponsor: "পূজা জনসমক্ষে যে চাষের ধারণা রাখে, তা এই। সংযোগ সংস্কৃতি, সম্প্রদায় ও জীবন্ত খামারের গল্পে।",
        gov: "সমন্বিত চাষ জনজ্ঞান: ভারত ও পশ্চিমবঙ্গে কৃষির সহনশীলতা, পুষ্টি ও সম্প্রদায়ের শেখার কথা।",
        farm: "লুপটাই কথা। সরঞ্জাম পরে। মিশ্রণ, মাপ, ফল জমি-জল-শ্রম-যত্নে বদলায়।",
        public: "কৃষক না হলেও অনুসরণ করা যায়। পূজার জমায়েত দেখায়, খামার কীভাবে জীবন্ত ব্যবস্থা হয়ে উঠতে পারে।",
        nrb: "দূর থেকেও এই দীর্ঘতর কৃষি-ধারণা: বাঁচতি কাজে লাগে, আর বাংলার জোতকে এক ফসল নয়, জীবন্ত ব্যবস্থা হিসেবে ভাবা যায়।"
      },
      whatH: "সমন্বিত চাষ কী?",
      whatP1: "সমন্বিত চাষ একই জোতে একাধিক কাজ রাখে: ফসল, সবজি-ফল, পশু, মাছ, হাঁস-মুরগি, গাছ, মৌ, মাশরুম, কম্পোস্ট ও অন্য জৈব উপকরণ — জায়গা অনুসারে, কিট নকল করে নয়।",
      whatP2: "সহজ কথা: এক কাজের ফল বা বাঁচতি অন্য কাজের উপকরণ হতে পারে। নাড়া পশু বা কম্পোস্টে যায়। গোবর মাটি, কম্পোস্ট বা শক্তিতে ফেরে। পুকুরের জল মাছ রাখে, সেচেও সাহায্য করে। পুকুরের পলি জমিকে সমৃদ্ধ করে। ফসল আগে ঘরে, তারপর বাজারে।",
      whatP3: "নকশা খোঁজে কম ফেলে দেওয়া, বেশি সহযোগ। মিশ্র চাষ, পালাবদল, গাছ, পশু ও জল একে অন্যের সঙ্গে কাজ করে — একই জায়গা নিয়ে লড়াই করে না। আইল, পুকুরপাড়, বাড়ির কোণও খামারের অংশ, ফাঁকা জমি নয়।",
      whatP4: "প্রতি খামারে সব কাজ লাগে না। মিশ্রণ জমি, জল, মাটি, আবহাওয়া, ঘর, বাজার, শ্রম ও স্থানীয় জ্ঞান অনুসারে হয়। ইচ্ছে: কম অপচয়, মজবুত জীবিকা। “শূন্য বর্জ্য”, নিশ্চিত ফলন বা নির্দিষ্ট আয়ের প্রতিশ্রুতি নয়।",
      whyH: "কেন দরকার",
      why: [
        { t: "বৈচিত্র্য", b: "বছরজুড়ে একাধিক কাজ, যাতে এক ফসলকে আবহাওয়া, পোকা বা বাজারের সব ঝুঁকি বইতে না হয়।" },
        { t: "জমি ও জল", b: "আইল, পুকুরপাড়, বাড়ির কোণ, জমা জল — ফাঁকা না রেখে কাজে লাগে।" },
        { t: "পুষ্টি ফেরত", b: "নাড়া, গোবর, পলি কম্পোস্ট, খাদ্য বা মাটি হয়ে ফিরতে পারে।" },
        { t: "মাটি ও জলের যত্ন", b: "কম্পোস্ট, নাড়া ফেরত ও গাছের ছায়া মাটির জৈব পদার্থ ও ক্ষয় কমাতে সাহায্য করতে পারে — যত্ন অনুসারে।" },
        { t: "সহনশীলতা", b: "মিশ্র ফসল, গাছ, পশু জলবায়ু ও বাজারের ধাক্কা এক ফসলের চেয়ে সামলাতে পারে।" },
        { t: "খাবার ও জীবিকা", b: "ঘরে বিস্তৃত থালা, আর যত্ন থাকলে আয়ের একাধিক পথ।" }
      ],
      loopH: "খামার কীভাবে জোড়া লাগে",
      loopIntro: "তালিকা নয়, লুপ হিসেবে দেখুন। এক বাঁচতি পরের কাজে লাগতে পারে।",
      loop: ["ফসল", "পশু", "গোবর / কম্পোস্ট", "মাটি", "জল", "মাছ", "সবজি-ফল", "ঘর / বাজার"],
      loopNote: "তীর শিক্ষার ছবি। আসল খামার ধাপ বাদ দেয়, বদলায়, মাপ ছোট-বড় করে।",
      loopAdapt: "পাহাড়ের বাগান আর ছাগল এক, উপকূলের পুকুর আর হাঁস আরেক। সমন্বিত চাষ নকল নয়, মানিয়ে নেওয়া।",
      indiaH: "ভারতে কেন এ কথা",
      indiaP1: "ভারতের বেশির ভাগ জোত ছোট। ছোট জমিতে এক ফসল মানে আবহাওয়া, বাজার ও খরচের ঝুঁকি এক জায়গায়। সমন্বিত চাষ সেই জোতে স্থানীয় মাটি, বৃষ্টি, শ্রম ও বাজার অনুসারে একাধিক কাজ জোড়া দেওয়ার এক পথ — একটি জাতীয় ফর্ম নয়।",
      indiaP2: "সমন্বিত চাষের মডেল, আশপাশের প্রচলিত ফসলি ব্যবস্থার তুলনায়, গবেষণায় মোট উৎপাদন চাল-সমতুল্য হিসাবে বেশি দেখিয়েছে। পূর্ব হিমালয় অঞ্চলে বৃদ্ধি মোটামুটি — প্রায় নয় শতাংশ। অন্য কিছু কৃষি-জলবায়ু অঞ্চলে অনেক বেশি। বিশের বেশি সহপাঠ্য গবেষণায় এক-ফসলি চাষের তুলনায় নিট আয় বেশি ও প্রতি একক খরচ কমও দেখা গেছে।",
      indiaP3: "এক হেক্টর ফসল-পশু-দুগ্ধ মডেলে বছরে প্রায় ৭৫০ শ্রমদিবস ধরা হয়েছে, ধান-ভুট্টায় প্রায় ২২৫-এর তুলনায়। ধান-গম এলাকার উদাহরণে, পাঞ্জাব ও পশ্চিমবঙ্গের প্রতিবেদনসহ, দুগ্ধ, উদ্যান ও মৎস্য এক জোতে আনলে শুধু ধান-গমের চেয়ে নিট আয় বাড়তে পারে। ফল জায়গাভেদে বদলায়। প্রতিশ্রুতি নয়, ভারতীয় কৃষক সমাজ পূজোর ফলও নয়।",
      indiaP4: "অন্য রাজ্যে পুষ্টি-সচেতন সমন্বিত খামারে ঘরে ফসল ও খাবার বিস্তৃত হয়েছে। হাজার হাজার খামারের এক পাঠে ফসলের তালিকা ও বাড়ির বাগান আরও বৈচিত্র্যময়, আর কয়েক বছর আগের তুলনায় অনেক বেশি নারী অন্তত পাঁচ ধরনের খাবার খেয়েছেন। নারীরা প্রায়ই পশু, হাঁস-মুরগি, কম্পোস্ট ও বীজ সামলান। দুগ্ধে নারীর কাজের ভাগ খুব বেশি। জীবিকা খুলতে পারে, আবার সরঞ্জাম ও ভাগাভাগি না থাকলে খাটুনিও বাড়ে।",
      wbH: "পশ্চিমবঙ্গে সমন্বিত চাষ",
      wbP: "পশ্চিমবঙ্গ উত্তরের পাহাড় থেকে তরাই ও তিস্তা, পুরনো ও নতুন পলিমাটির ধান এলাকা, লাল ও ল্যাটেরাইট, তারপর উপকূলের লবণাক্ত অঞ্চল পর্যন্ত বিস্তৃত। তাই রাজ্যের জন্য একটি ছাঁচ নেই। মিশ্রণ অঞ্চল অনুসারে হওয়া উচিত: জমি, জল, মাটি, আবহাওয়া, ঘর, বাজার, শ্রম ও স্থানীয় জ্ঞান।",
      wbP2: "পশ্চিমবঙ্গের কৃষি বিজ্ঞান কেন্দ্রগুলো সেই অঞ্চল অনুসারে মডেল দেখিয়েছে, এক কাজ থেকে ঘরের মুখোমুখি খামার পরিকল্পনার দিকে। বৃষ্টিনির্ভর ও সহনশীল কৃষির জাতীয় কাজও সমন্বিত চাষকে চিনেছে। এটা প্রাতিষ্ঠানিক প্রসঙ্গ। ভারতীয় কৃষক সমাজের কর্মসূচি নয়, আর এই পাতা সেই প্রতিষ্ঠানগুলোকে অংশীদার বলে দাবি করে না।",
      wbP3: "উপকূলের লবণ, বন্যা আর খরার পকেটে মিশ্র ব্যবস্থা ঝুঁকি ভাগ করতে পারে: মাছ, লবণ-সচেতন ফসল, সবজি-ফল ও পশু এক জোতে, জল যেখানে সীমা সেখানে বৃষ্টির জল ও জমির আকৃতি। পুষ্টি খামারের ভিতরে পরিকল্পিত হতে পারে — ঘরের বাগান, ফল, দুধ, ডিম, মাছ, সঙ্গে প্রধান শস্য — আলাদা না হলে।",
      zones: [
        { t: "উত্তরের পাহাড়, তরাই ও তিস্তা", b: "উদ্যানভিত্তিক: সবজি, ফল ও পশু; ঢাল, রস ও বাড়ির জায়গা একসঙ্গে।" },
        { t: "পুরনো ও নতুন পলিমাটি", b: "ধানভিত্তিক ব্যবস্থা, সঙ্গে মাছ, হাঁস, সবজি-ফল ও দুগ্ধ।" },
        { t: "লাল ও ল্যাটেরাইট", b: "মিশ্র চাষ: কাউন-জাতীয় শস্য, ডাল ও পশু, যেখানে মাটি হালকা ও বৃষ্টি অনিশ্চিত।" },
        { t: "উপকূলীয় লবণাক্ত অঞ্চল", b: "মৎস্য, পুকুরপাড়ে সবজি-ফল, বৃষ্টির জল ধরা ও জমি আকৃতি, যাতে লবণ ও মিষ্টি জল একসঙ্গে সামলানো যায়।" }
      ],
      modelsH: "পশ্চিমবঙ্গে যে মডেল ইতিমধ্যে হাঁটা হয়েছে",
      modelsP: "পশ্চিমবঙ্গের উদাহরণে সমন্বিত চাষ কৃষকের জমিতে দেখা যায় — কৃষি বিজ্ঞান কেন্দ্র ও অন্য জনকাজ ও সমাজসেবায়। ধারণা শুধু লেখা নয়, হাঁটাও হয়েছে। এগুলো ভারতীয় কৃষক সমাজের প্রকল্প নয়, অংশীদারির দাবিও নয়।",
      modelsP2: "ঝাড়খণ্ড ও পশ্চিমবঙ্গের অভাবগ্রস্ত এলাকায় হাজার হাজার ক্ষুদ্র ও প্রান্তিক পরিবারের সঙ্গে টেকসই সমন্বিত চাষও চলেছে: ফসল, গাছ, পশু, হাঁস-মুরগি, মাছ, কম্পোস্ট, মৌ — খামারে যা আছে তা আরও কাজে লাগিয়ে।",
      models: [
        { t: "মুর্শিদাবাদ", b: "অনেক ব্লকে পুকুরে মাছ, পশু ও হাঁস-মুরগি; খামারের বাঁচতি খাদ্য ও জৈব উপকরণ হিসেবে।" },
        { t: "দক্ষিণ দিনাজপুর", b: "মাছ-হাঁস-সবজি, পুকুরের জল ও আইলে একসঙ্গে।" },
        { t: "দক্ষিণ ২৪ পরগনা", b: "মৎস্যভিত্তিক: কার্প, মাগুর, চিংড়ি, অলংকার মাছ; পাড়ে সবজি-ফল; জমি আকৃতি ও বৃষ্টির জল, উপকূলের পরিবেশে।" },
        { t: "কৃষি বিজ্ঞান কেন্দ্র", b: "পশ্চিমবঙ্গজুড়ে কেন্দ্রগুলো অঞ্চল অনুসারে মডেল দেখায়, যাতে এক বাঁচতি পরের কাজে লাগে।" },
        { t: "ক্ষুদ্র জোতের খামার", b: "অভাবগ্রস্ত জেলায় সমাজসেবা সংস্থার কাজে বৈচিত্র্যময়, কম বাইরের উপকরণের খামার হাঁটা হয়েছে — জনউদাহরণ, বি কে এস অংশীদারি নয়।" }
      ],
      futureH: "ভবিষ্যৎ কেমন দেখতে পারে",
      futureP1: "সুযোগ গম্ভীর। লবণ, বন্যা, খরার পকেটে সহনশীল মিশ্রণ। বৈচিত্র্যময় খাবার। যুব ও নারীর কাজ — দুগ্ধ, হাঁস-মুরগি, মাছ, গাছ, কম্পোস্ট, খামারের মূল্য — যদি প্রশিক্ষণ, সরঞ্জাম ও বাজার তাল মিলায়। খামার ব্যবস্থার পরে সতর্ক প্রযুক্তি। স্থানীয় সফল মডেল থেকে বিস্তার, যে কেন্দ্র, কৃষকদল ও মাঠের কাজ ইতিমধ্যে আছে।",
      futureP2: "পশ্চিমবঙ্গে শেখার মতো মাঠের মডেল আগেই আছে। পরের ধাপ স্লোগান নয়। অঞ্চল অনুসারে খামার পরিকল্পনা, ঘরের পাশে থেকে যাওয়া পরামর্শ, আর স্থানীয় ফারাক না মুছে বিস্তার।",
      futureP3: "বিশ্বাসযোগ্য গল্প আশা ও খাটুনি দুই-ই বলে। সমন্বিত চাষ সহজ নয়, আর নিশ্চিত রূপান্তরও নয়।",
      challengeH: "কাজ কী চায়",
      challenges: [
        { t: "শ্রম", b: "একাধিক কাজ মানে বেশি হাত। ভাগাভাগি, সরঞ্জাম বা যন্ত্র না থাকলে বাড়তি খাটুনি প্রায়ই নারীর ঘাড়ে পড়ে।" },
        { t: "জ্ঞান", b: "একাধিক কাজ ও তাদের মিল বোঝা লাগে। প্রশিক্ষণ, মাঠ স্কুল ও স্থির পরামর্শ দরকার।" },
        { t: "সরঞ্জাম", b: "উপযুক্ত যন্ত্র ও খাটুনি কমানোর হাতিয়ার ছোট জোতে মিশ্রণ সম্ভব রাখে।" },
        { t: "তথ্য", b: "জমি, জল, মাটি, নির্গমন ও জীববৈচিত্র্যের দীর্ঘ তথ্য এখনও পাতলা। বড় পরিকল্পনায় সেই সততা লাগে।" }
      ],
      bioH: "জীবন্ত সম্পর্কের খামার",
      bioP: "মাটি, জল, গাছ, পশু, পাখি, মাছ, পোকা, জীবাণু ও মানুষ আলাদা ড্রয়ার নয়। গোবর মাটিকে খাওয়ায়। মাটি ফসল ধরে। ফসল পশু ও ঘরকে খাওয়ায়। পুকুর মাছ ও গাছের জল রাখে। গাছ মাটি, ছায়া ও পাখি রাখে। মানুষ পুরো যত্ন করে।",
      bioP2: "শুধু বেশি ফলানো নয় — জীবন্ত ব্যবস্থায় সম্পর্ক সাজানো। কেউ একে বায়োফিলিক বলে: জীবন যেন জীবনের জায়গা রাখে। শব্দের চেয়ে হেঁটে দেখা খামার বেশি কথা বলে।",
      techH: "সতর্ক প্রযুক্তি কোথায় বসে",
      techP: "আগে খামার। তারপর সমন্বিত ব্যবস্থা। তারপর সতর্ক প্রযুক্তি। সরঞ্জাম মাটি দেখতে, রস মাপতে, জল সামলাতে, ফসল বুঝতে, পুকুর দেখতে, পশুর যত্ন ও হিসাব রাখতে সাহায্য করতে পারে — সিদ্ধান্তের সঙ্গে।",
      techP2: "লুপের জায়গা নেয় না। ফলনের নিশ্চয়তা দেয় না। এই পাতা কিট বেচে না, বিক্রেতার নাম করে না, কৃত্রিম বুদ্ধিমত্তার ফসলের প্রতিশ্রুতি দেয় না।",
      pujaH: "পূজা থেকে অন্নদাতা",
      pujaP: "ক্রম থাকে: পূজা → অন্নদাতা → কৃষি → সমন্বিত চাষ → প্রকৃতি → সতর্ক প্রযুক্তি → বাংলার দীর্ঘতর কৃষি-ভবিষ্যৎ।",
      pujaP2: "পূজা পাঠ্যবই হয় না। মঞ্চ ব্যবহার করে কৃষক ও ‘বাঁচতি কাজে লাগে’ জনসমক্ষে দাঁড়ায়। সমন্বিত চাষ সেই আলোচনাকে হাতের কাছের দিক দেয়।",
      nextFarm: "খামারের পাশে সতর্ক সরঞ্জাম কীভাবে বসে, দেখুন",
      nextMain: "পূজোর জমায়েতে ফিরুন"
    },
    hi: {
      nav: "समेकित कृषि",
      kicker: "समेकित कृषि",
      title: "एक जीवंत खेत, जहाँ एक भाग दूसरे को पाल सके।",
      lede: "समेकित कृषि केवल एक खेत पर कई काम नहीं। फसल, पशु, जल, पेड़ और घर ऐसे सजे कि बचा हुआ अगले काम में लगे।",
      photoAlt: "समेकित कृषि का दृष्टांत चित्र: तालाब, फसल, पशु, पेड़ और लोग। अवधारणा की तस्वीर, 2026 के पंडाल या बने हुए बीकेएस खेत की तस्वीर नहीं।",
      photoCap: "समेकित कृषि का दृष्टांत परिदृश्य। अवधारणा की तस्वीर। 2026 का पंडाल नहीं, और पहले से बने बीकेएस खेत का फोटो भी नहीं।",
      frame: {
        main: "पूजा अन्नदाता का नाम लेती है। समेकित कृषि उसके बाद का जीवंत खेत है — फिर सावधान औज़ार, फिर बंगाल का लंबा निमंत्रण।",
        sponsor: "पूजा सार्वजनिक दृष्टि में जो कृषि-विचार रखती है, वही यह है। जुड़ाव संस्कृति, समुदाय और जीवंत खेत की कथा से है।",
        gov: "समेकित कृषि सार्वजनिक ज्ञान है: भारत और पश्चिम बंगाल में कृषि का लचीलापन, पोषण और सामुदायिक सीख।",
        farm: "लूप ही बात है। औज़ार बाद में। मिश्रण, नाप, फल ज़मीन-जल-श्रम-देखभाल से बदलते हैं।",
        public: "किसान न हों, तब भी साथ चल सकते हैं। पूजा की भीड़ दिखाती है कि खेत जीवंत व्यवस्था कैसे बन सकता है।",
        nrb: "दूर से भी यही लंबा कृषि-विचार: बचा हुआ काम में लगे, और बंगाल के खेत एक फसल नहीं, जीवंत व्यवस्था माने जाएँ।"
      },
      whatH: "समेकित कृषि क्या है?",
      whatP1: "समेकित कृषि एक ही जोत पर पूरक काम लाती है: फसल, बागवानी, पशु, मत्स्य, मुर्गी-बत्तख, पेड़, मधुमक्खी, मशरूम, कंपोस्ट और अन्य जैव उपादान — जगह के हिसाब से, किट की नकल नहीं।",
      whatP2: "सरल बात: एक काम का फल या बचा हिस्सा दूसरे का उपादान बन सकता है। अवशेष पशु या कंपोस्ट को। गोबर मिट्टी, कंपोस्ट या ऊर्जा को। तालाब का जल मछली रखता है, सिंचाई में भी मदद करता है। गाद खेत को समृद्ध करती है। उपज पहले घर, फिर बाज़ार।",
      whatP3: "डिज़ाइन कम बेकार छोड़ना और अधिक सहयोग चाहती है। मिश्रित खेती, चक्र, पेड़, पशु और जल एक-दूसरे के साथ काम करें — एक ही जगह के लिए न लड़ें। मेड़, तालाब की पाल और आँगन भी खेत हैं, खाली ज़मीन नहीं।",
      whatP4: "हर खेत पर हर उद्यम नहीं चाहिए। मिश्रण ज़मीन, जल, मिट्टी, जलवायु, घर, बाज़ार, श्रम और स्थानीय ज्ञान से बने। इच्छा: कम अपव्यय, मजबूत आजीविका। “शून्य कचरा”, तय उपज या तय आय का वादा नहीं।",
      whyH: "यह क्यों मायने रखती है",
      why: [
        { t: "विविधता", b: "साल भर कई उद्यम, ताकि एक फसल मौसम, कीट या बाज़ार का सारा जोखिम न ढोए।" },
        { t: "ज़मीन और जल", b: "मेड़, तालाब किनारा, आँगन, जमा पानी — खाली न छोड़कर काम में।" },
        { t: "पोषक वापसी", b: "अवशेष, गोबर, गाद कंपोस्ट, चारा या मिट्टी बनकर लौट सकते हैं।" },
        { t: "मिट्टी और जल की देखभाल", b: "कंपोस्ट, अवशेष वापसी और पेड़ों का आवरण मिट्टी के जैव पदार्थ और कटाव कम करने में मदद कर सकते हैं — देखभाल के अनुसार।" },
        { t: "लचीलापन", b: "मिश्रित फसल, पेड़, पशु जलवायु और बाज़ार के झटके एक फसल से बेहतर सह सकते हैं।" },
        { t: "भोजन और आजीविका", b: "घर में व्यापक थाली, और देखभाल हो तो कमाई के एक से अधिक रास्ते।" }
      ],
      loopH: "खेत कैसे जुड़ता है",
      loopIntro: "सूची नहीं, लूप की तरह देखें। एक बचा अगले काम में लग सकता है।",
      loop: ["फसल", "पशु", "गोबर / कंपोस्ट", "मिट्टी", "जल", "मछली", "बागवानी", "घर / बाज़ार"],
      loopNote: "तीर सिखाने की तस्वीर है। असली खेत कदम छोड़ते, बदलते, नाप घटाते-बढ़ाते हैं।",
      loopAdapt: "पहाड़ी बाग और बकरी एक बात है, तटीय तालाब और बत्तख दूसरी। समेकित कृषि नकल नहीं, अनुकूलन है।",
      indiaH: "भारत में यह क्यों",
      indiaP1: "भारत की अधिकतर जोत छोटी हैं। छोटी ज़मीन पर एक फसल का मतलब मौसम, बाज़ार और लागत का जोखिम एक जगह। समेकित कृषि स्थानीय मिट्टी, वर्षा, श्रम और बाज़ार के हिसाब से उद्यम जोड़ने का एक मार्ग है — एक राष्ट्रीय फॉर्म नहीं।",
      indiaP2: "समेकित कृषि के मॉडल, आसपास की प्रचलित फसल व्यवस्था की तुलना में, अध्ययनों में कुल उत्पादन धान-समतुल्य के रूप में अधिक बताए गए हैं। पूर्वी हिमालयी क्षेत्रों में वृद्धि मामूली रही है — लगभग नौ प्रतिशत। कुछ अन्य कृषि-जलवायु क्षेत्रों में कहीं अधिक। बीस से अधिक सह-समीक्षित अध्ययनों में एकल फसल की तुलना में शुद्ध आय अधिक और प्रति इकाई लागत कम भी बताई गई है।",
      indiaP3: "एक हेक्टेयर फसल-पशु-डेयरी मॉडल पर वर्ष में लगभग 750 श्रम-दिवस दर्ज हुए, धान-मक्का के लगभग 225 के मुकाबले। धान-गेहूँ इलाकों के साक्ष्य में, पंजाब और पश्चिम बंगाल की रिपोर्ट समेत, डेयरी, बागवानी और मत्स्य एक जोत पर लाने से केवल धान-गेहूँ से शुद्ध आय बढ़ सकती है। परिणाम जगह के हिसाब से बदलते हैं। वादा नहीं, भारतीय कृषक समाज पूजो का परिणाम भी नहीं।",
      indiaP4: "अन्य राज्यों में पोषण-संवेदनशील समेकित खेतों ने घर की फसल और थाली चौड़ी की है। हज़ारों खेतों के एक पाठ में फसल सूची और घर के बाग अधिक विविध मिले, और कुछ वर्ष पहले की तुलना में कहीं अधिक महिलाओं ने कम से कम पाँच खाद्य समूह खाए। महिलाएँ अक्सर पशु, मुर्गी, कंपोस्ट और बीज सँभालती हैं। डेयरी में महिलाओं का हिस्सा बहुत ऊँचा है। आजीविका खुल सकती है, और औज़ार व बँटवारा कम हो तो श्रम भी बढ़ सकता है।",
      wbH: "पश्चिम बंगाल में समेकित कृषि",
      wbP: "पश्चिम बंगाल उत्तरी पहाड़ों से तराई और तिस्ता, पुरानी और नई जलोढ़ धान पट्टी, लाल और लैटेराइट, फिर तटीय खारे क्षेत्र तक फैला है। इसलिए राज्य के लिए एक साँचा नहीं। मिश्रण क्षेत्र के अनुसार हो: ज़मीन, जल, मिट्टी, जलवायु, घर, बाज़ार, श्रम और स्थानीय ज्ञान।",
      wbP2: "पश्चिम बंगाल के कृषि विज्ञान केंद्रों ने उन क्षेत्रों के हिसाब से मॉडल दिखाए हैं, एक उद्यम से घर के सामने की खेत योजना तक। वर्षाश्रित और टिकाऊ कृषि का राष्ट्रीय काम भी समेकित कृषि को पहचानता है। यह संस्थागत संदर्भ है। भारतीय कृषक समाज का कार्यक्रम नहीं, और यह पृष्ठ उन संस्थानों को साझेदार नहीं कहता।",
      wbP3: "तटीय खारे, बाढ़ग्रस्त और सूखाग्रस्त इलाकों में मिश्रित व्यवस्था जोखिम बाँट सकती है: मछली, नमक-सचेत फसल, बागवानी और पशु एक जोत पर, जहाँ जल सीमा हो वहाँ वर्षा जल और भूमि आकार। पोषण खेत के भीतर योजना बन सकता है — घर का बाग, फल, दूध, अंडा, मछली, साथ मुख्य अनाज — अलग सोच नहीं।",
      zones: [
        { t: "उत्तरी पहाड़, तराई और तिस्ता", b: "बागवानी प्रधान: सब्ज़ी, फल और पशु; ढाल, नमी और आँगन साथ।" },
        { t: "पुरानी और नई जलोढ़ पट्टी", b: "धान आधारित व्यवस्था, साथ मछली, बत्तख, बागवानी और डेयरी।" },
        { t: "लाल और लैटेराइट", b: "मिश्रित खेती: मिलेट, दाल और पशु, जहाँ मिट्टी हल्की और वर्षा अनिश्चित।" },
        { t: "तटीय खारा क्षेत्र", b: "मत्स्य, मेड़ पर सब्ज़ी-फल, वर्षा जल संग्रह और भूमि आकार, ताकि नमक और मीठा जल साथ सँभलें।" }
      ],
      modelsH: "पश्चिम बंगाल में जो मॉडल पहले से चले हैं",
      modelsP: "पश्चिम बंगाल के उदाहरण किसानों के खेतों पर समेकित कृषि दिखाते हैं — कृषि विज्ञान केंद्रों और अन्य सार्वजनिक व सामाजिक काम में। विचार केवल लिखा नहीं, चला भी है। ये भारतीय कृषक समाज की परियोजनाएँ नहीं, साझेदारी का दावा नहीं।",
      modelsP2: "झारखंड और पश्चिम बंगाल के संसाधन-गरीब इलाकों में हज़ारों छोटे और सीमांत परिवारों के साथ टिकाऊ समेकित कृषि भी चली है: फसल, पेड़, पशु, मुर्गी, मछली, कंपोस्ट, मधुमक्खी — खेत पर जो है उसे और काम में लाकर।",
      models: [
        { t: "मुर्शिदाबाद", b: "कई प्रखंडों में तालाब के साथ मछली, पशु और मुर्गी; खेत का बचा चारा और जैव उपादान।" },
        { t: "दक्षिण दिनाजपुर", b: "मछली-बत्तख-सब्ज़ी, तालाब के जल और मेड़ पर साथ।" },
        { t: "दक्षिण 24 परगना", b: "मत्स्य आधारित: कार्प, मांगुर, झींगा, सजावटी मछली; मेड़ पर सब्ज़ी-फल; भूमि आकार और वर्षा जल, तटीय परिवेश में।" },
        { t: "कृषि विज्ञान केंद्र", b: "पश्चिम बंगाल भर के केंद्र क्षेत्र के हिसाब से मॉडल दिखाते हैं, ताकि एक बचा अगले काम को पाले।" },
        { t: "छोटी जोत के खेत", b: "गरीब जिलों में सामाजिक संस्थाओं के काम में विविध, कम बाहरी उपादान वाले खेत चले हैं — सार्वजनिक उदाहरण, बीकेएस साझेदारी नहीं।" }
      ],
      futureH: "भविष्य कैसा दिख सकता है",
      futureP1: "अवसर गंभीर है। खारे, बाढ़, सूखे इलाकों में लचीला मिश्रण। विविध भोजन। युवा और महिलाओं का काम — डेयरी, मुर्गी, मत्स्य, पेड़, कंपोस्ट, खेत का मूल्य — यदि प्रशिक्षण, औज़ार और बाज़ार साथ दें। खेत व्यवस्था के बाद सावधान तकनीक। स्थानीय सफल मॉडल से विस्तार, जो केंद्र, किसान समूह और मैदानी काम पहले से हैं।",
      futureP2: "पश्चिम बंगाल में सीखने लायक मैदानी मॉडल पहले से हैं। अगला कदम नारा नहीं। क्षेत्र के हिसाब से खेत योजना, घर के पास रहने वाला सलाह, और स्थानीय फ़र्क मिटाए बिना विस्तार।",
      futureP3: "विश्वसनीय कथा आशा और मेहनत दोनों कहती है। समेकित कृषि आसान नहीं, और तय रूपांतरण भी नहीं।",
      challengeH: "काम क्या माँगता है",
      challenges: [
        { t: "श्रम", b: "कई उद्यम मतलब अधिक हाथ। बँटवारा, औज़ार या यंत्र न हों तो अतिरिक्त काम अक्सर महिलाओं पर पड़ता है।" },
        { t: "ज्ञान", b: "एक से अधिक उद्यम और उनका मिलन समझना पड़ता है। प्रशिक्षण, खेत पाठशाला और स्थिर सलाह चाहिए।" },
        { t: "औज़ार", b: "उपयुक्त यंत्र और श्रम घटाने वाले औज़ार छोटी जोत पर मिश्रण संभव रखते हैं।" },
        { t: "आँकड़े", b: "क्षेत्र, जल, मिट्टी, उत्सर्जन और जैवविविधता का लंबा प्रमाण अभी पतला है। बड़े नियोजन में वह ईमानदारी चाहिए।" }
      ],
      bioH: "जीवंत संबंधों का खेत",
      bioP: "मिट्टी, जल, पौधे, पेड़, पशु, पक्षी, मछली, कीट, सूक्ष्मजीव और लोग अलग दराज नहीं। गोबर मिट्टी को पालता है। मिट्टी फसल थामती है। फसल पशु और घर को पालती है। तालाब मछली और पौधों का जल रखता है। पेड़ मिट्टी, छाया और पक्षी रखते हैं। लोग पूरे की देखभाल करते हैं।",
      bioP2: "केवल अधिक उपज नहीं — जीवंत व्यवस्था में संबंध सजाना। कोई इसे बायोफिलिक कहता है: जीवन के लिए जीवन की जगह। शब्द से ज़्यादा वह खेत बोलता है जिसे पैदल देखा जा सके।",
      techH: "सावधान तकनीक कहाँ बैठती है",
      techP: "पहले खेत। फिर समेकित व्यवस्था। फिर सावधान तकनीक। औज़ार मिट्टी देखने, नमी नापने, जल सँभालने, फसल समझने, तालाब देखने, पशु की देखभाल और हिसाब रखने में मदद कर सकते हैं — निर्णय के साथ।",
      techP2: "लूप की जगह नहीं लेते। उपज की गारंटी नहीं देते। यह पृष्ठ किट नहीं बेचता, विक्रेता नहीं नाम देता, कृत्रिम बुद्धि की फसल का वादा नहीं करता।",
      pujaH: "पूजा से अन्नदाता तक",
      pujaP: "क्रम रहता है: पूजा → अन्नदाता → कृषि → समेकित कृषि → प्रकृति → सावधान तकनीक → बंगाल का लंबा कृषि भविष्य।",
      pujaP2: "पूजा पाठ्यपुस्तक नहीं बनती। मंच से किसान और ‘बचा काम में लगे’ सार्वजनिक दृष्टि में खड़े होते हैं। समेकित कृषि उस बातचीत को व्यावहारिक दिशा देती है।",
      nextFarm: "खेत के साथ सावधान औज़ार कैसे बैठते हैं, देखें",
      nextMain: "पूजो की सभा में लौटें"
    }
  };

  function esc(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function lang() {
    var html = document.documentElement.lang || "en";
    if (html.indexOf("bn") === 0) return "bn";
    if (html.indexOf("hi") === 0) return "hi";
    return "en";
  }

  function pack() {
    var src = COPY[lang()] || COPY.en;
    var t = {};
    var k;
    for (k in src) {
      if (Object.prototype.hasOwnProperty.call(src, k)) t[k] = src[k];
    }
    t.loopH = t.loopH || t.loopH;
    t.indiaH = t.indiaH || t.indiaH;
    t.wbH = t.wbH || t.wbH;
    t.modelsH = t.modelsH || t.modelsH;
    t.futureH = t.futureH || t.futureH;
    t.bioH = t.bioH || t.bioH;
    t.pujaH = t.pujaH || t.pujaH;
    t.challengeH = t.challengeH || t.challengeH;
    t.photoCap = t.photoCap || t.photoCap;
    t.photoAlt = t.photoAlt || t.photoAlt;
    t.lede = t.lede || t.lede;
    t.kicker = t.kicker || t.kicker;
    t.frame = t.frame || t.frame;
    if (t.frame) {
      t.frame.gov = t.frame.gov || t.frame.gov;
      t.frame.nrb = t.frame.nrb || t.frame.nrb;
    }
    return t;
  }

  function audience() {
    var host = document.getElementById("ifs-body") || document.getElementById("ifs");
    var raw =
      (host && host.getAttribute("data-ifs-audience")) ||
      document.body.getAttribute("data-ifs-audience") ||
      document.body.getAttribute("data-audience") ||
      "main";
    if (raw === "government" || raw === "gov") return "gov";
    if (raw === "farmer" || raw === "farm") return "farm";
    if (raw === "sponsor") return "sponsor";
    if (raw === "public") return "public";
    if (raw === "nrb") return "nrb";
    return "main";
  }

  function assetSrc() {
    var script = document.querySelector("script[src*='ifs.js']");
    if (script && script.src) {
      return script.src.replace(/ifs\.js(\?.*)?$/, "") + "assets/integrated-farming/ifs-reference.jpg";
    }
    return "assets/integrated-farming/ifs-reference.jpg";
  }

  function cards(items) {
    if (!items || !items.length) return "";
    return (
      '<div class="bks-ifs__grid">' +
      items
        .map(function (item) {
          return (
            '<article class="bks-ifs__card"><h3>' +
            esc(item.t) +
            "</h3><p>" +
            esc(item.b) +
            "</p></article>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function paras() {
    var out = "";
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i]) out += "<p>" + esc(arguments[i]) + "</p>";
    }
    return out;
  }

  function html() {
    var t = pack();
    var frame = t.frame[audience()] || t.frame.gov || t.frame.main;
    var farmHref = "https://bks-pujo-farmtech-agritech.vercel.app/";
    var mainHref = "https://bks-durga-puja-2026.vercel.app/site/";
    var who = audience();
    var next =
      who === "farm"
        ? ""
        : '<p class="bks-ifs__note"><a href="' +
          (who === "main" ? farmHref : mainHref) +
          '">' +
          esc(who === "main" ? t.nextFarm : t.nextMain) +
          "</a></p>";
    return (
      '<div class="bks-ifs__wrap">' +
      '<header class="bks-ifs__block">' +
      '<p class="bks-ifs__kicker">' +
      esc(t.kicker) +
      "</p><h2 id='ifs-title'>" +
      esc(t.title) +
      "</h2><p class='bks-ifs__lede'>" +
      esc(t.lede) +
      "</p><p>" +
      esc(frame) +
      "</p></header>" +
      '<figure class="bks-ifs__frame"><img src="' +
      esc(assetSrc()) +
      '" width="1024" height="571" alt="' +
      esc(t.photoAlt) +
      '" loading="lazy"><figcaption>' +
      esc(t.photoCap) +
      "</figcaption></figure>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.whatH) +
      "</h3>" +
      paras(t.whatP1, t.whatP2, t.whatP3, t.whatP4) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.whyH) +
      "</h3>" +
      cards(t.why) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.loopH) +
      "</h3>" +
      paras(t.loopIntro) +
      '<ol class="bks-ifs__loop">' +
      t.loop
        .map(function (step) {
          return "<li>" + esc(step) + "</li>";
        })
        .join("") +
      "</ol>" +
      paras(t.loopNote, t.loopAdapt) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.indiaH) +
      "</h3>" +
      paras(t.indiaP1, t.indiaP2, t.indiaP3, t.indiaP4) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.wbH) +
      "</h3>" +
      paras(t.wbP, t.wbP2, t.wbP3) +
      cards(t.zones) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.modelsH) +
      "</h3>" +
      paras(t.modelsP, t.modelsP2) +
      cards(t.models) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.futureH) +
      "</h3>" +
      paras(t.futureP1, t.futureP2, t.futureP3) +
      (t.challengeH ? "<h3>" + esc(t.challengeH) + "</h3>" : "") +
      cards(t.challenges) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.bioH) +
      "</h3>" +
      paras(t.bioP, t.bioP2) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.techH) +
      "</h3>" +
      paras(t.techP, t.techP2) +
      "</section>" +
      '<section class="bks-ifs__block"><h3>' +
      esc(t.pujaH) +
      "</h3>" +
      paras(t.pujaP, t.pujaP2) +
      next +
      "</section></div>"
    );
  }

  function ensureHost() {
    var body = document.getElementById("ifs-body");
    if (body) return body;
    var host = document.getElementById("ifs");
    if (host) return host;
    host = document.createElement("section");
    host.id = "ifs";
    host.className = "bks-ifs";
    host.setAttribute("data-ifs-audience", audience());
    var memories = document.getElementById("memories");
    var faq = document.getElementById("faq");
    if (memories && memories.parentNode) memories.parentNode.insertBefore(host, memories);
    else if (faq && faq.parentNode) faq.parentNode.insertBefore(host, faq);
    else {
      var main = document.querySelector("main") || document.body;
      main.appendChild(host);
    }
    return host;
  }

  function injectNav(label) {
    var nodes = document.querySelectorAll(
      ".nav-desktop, .nav-drawer-list, #nav-desktop, #nav-drawer-list"
    );
    Array.prototype.forEach.call(nodes, function (nav) {
      var existing = nav.querySelector("a[href='#ifs']");
      if (existing) {
        existing.textContent = label;
        return;
      }
      var a = document.createElement("a");
      a.href = "#ifs";
      a.textContent = label;
      var mem = nav.querySelector("a[href='#memories']");
      var faq = nav.querySelector("a[href='#faq']");
      if (mem) nav.insertBefore(a, mem);
      else if (faq) nav.insertBefore(a, faq);
    });
  }

  function render() {
    var host = ensureHost();
    var t = pack();
    host.classList.add("bks-ifs");
    host.setAttribute("aria-labelledby", "ifs-title");
    host.innerHTML = html();
    injectNav(t.nav);
  }

  function wrap() {
    if (typeof window.BKS_RENDER === "function" && !window.BKS_RENDER._ifs) {
      var orig = window.BKS_RENDER;
      window.BKS_RENDER = function (code) {
        orig(code);
        render();
      };
      window.BKS_RENDER._ifs = true;
    }
  }

  function boot() {
    wrap();
    render();
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.setTimeout(render, 40);
      });
    });
    var obs = new MutationObserver(function () {
      render();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
