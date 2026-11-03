import historyHeroImage from "../../../assets/images/hero/hero.jpeg";

/* =========================================================
   HISTORY HERO
========================================================= */

export const historyHeroData = {
  eyebrow: "Past • People • Civilizations",

  description:
    "Journey through thousands of years of civilizations, empires, cultures, movements, and defining moments that shaped the land we know today as Pakistan.",

  image: historyHeroImage,

  imageAlt:
    "Historic landscape of Pakistan surrounded by mountains and valleys",
};

/* =========================================================
   HISTORY OF PAKISTAN — ERA SLIDER
========================================================= */
export const pakistanHistoryData = {
  eyebrow: "History of Pakistan",

  title: "Thousands of years. One evolving story.",

  description:
    "Explore the civilizations, kingdoms, empires, political movements, and social transformations that shaped the territories and communities of present-day Pakistan.",

  eras: [
    /* =====================================================
       ERA 01 — PREHISTORIC FOUNDATIONS
    ===================================================== */

    {
      id: "era-01",

      period: "Prehistory – c. 3000 BCE",

      category: "Origins",

      title: "Prehistoric Foundations",

      paragraphs: [
        "The story of human settlement in the lands that now form Pakistan reaches far back into prehistory. Archaeological evidence from different parts of the region shows communities gradually adapting to river valleys, plains, mountains, and dry landscapes through hunting, gathering, tool-making, farming, and increasingly permanent settlement. One of the most important early archaeological traditions is associated with Mehrgarh in present-day Balochistan, where farming, animal domestication, craft production, and settled village life developed thousands of years before the rise of the great Indus cities.",

        "These early communities were not isolated. Over generations, improvements in agriculture, pottery, stone and bone tools, ornaments, storage, housing, and exchange networks allowed settlements to become larger and more organized. The transition from mobile communities to permanent agricultural settlements created the social and economic foundations from which later urban societies of the Indus region would emerge.",
      ],

      milestones: [
        "Growth of permanent agricultural settlements.",
        "Development of farming and animal domestication.",
        "Expansion of pottery, tools, ornaments, and craft production.",
        "Increasing exchange between early communities.",
      ],

      legacy:
        "The prehistoric period laid the foundations for settled life, agriculture, specialized crafts, and regional exchange that later supported the rise of complex urban civilization in the Indus basin.",

      highlights: [
        "Mehrgarh",
        "Early Agriculture",
        "Settlement",
        "Craft Production",
      ],

      image: historyHeroImage,

      imageAlt:
        "Landscape representing the prehistoric foundations of Pakistan",
    },

    /* =====================================================
       ERA 02 — ANCIENT CIVILIZATIONS
    ===================================================== */

    {
      id: "era-02",

      period: "c. 3000 BCE – 500 CE",

      category: "Civilizations",

      title: "Ancient Civilizations",

      paragraphs: [
        "During the third millennium BCE, the Indus Valley Civilization developed one of the ancient world's great urban traditions. Major centers such as Mohenjo-daro and Harappa were distinguished by planned streets, standardized brick construction, drainage systems, wells, craft workshops, storage areas, and extensive commercial connections. Mohenjo-daro in Sindh remains one of the clearest surviving examples of this sophisticated urban culture and demonstrates how carefully organized civic life had become in the region thousands of years ago.",

        "In later centuries, the northwest became another major center of political and cultural exchange. Taxila developed at the meeting point of important routes linking South Asia with Central Asia and the wider Hellenistic world. Under different dynasties, the Gandhara region became renowned for Buddhist learning, monasteries, sculpture, and artistic traditions that combined influences from several cultures. Together, the Indus and Gandhara traditions reveal how deeply the region participated in ancient networks of trade, religion, scholarship, and artistic innovation.",
      ],

      milestones: [
        "Rise of Harappa and Mohenjo-daro as major urban centers.",
        "Development of sophisticated planning, sanitation, and civic infrastructure.",
        "Expansion of regional and long-distance trade.",
        "Growth of Taxila and Gandhara as major cultural centers.",
      ],

      legacy:
        "The Indus and Gandhara civilizations remain among Pakistan's most important archaeological inheritances and demonstrate a long history of urbanism, trade, scholarship, religious exchange, and artistic achievement.",

      highlights: ["Mohenjo-daro", "Harappa", "Taxila", "Gandhara"],

      image: historyHeroImage,

      imageAlt: "Landscape representing ancient civilizations in Pakistan",
    },

    /* =====================================================
       ERA 03 — MEDIEVAL TRANSFORMATIONS
    ===================================================== */

    {
      id: "era-03",

      period: "c. 500 CE – 1526 CE",

      category: "Kingdoms & Sultanates",

      title: "Medieval Transformations",

      paragraphs: [
        "The medieval centuries brought major political, religious, linguistic, and cultural change to the regions that now form Pakistan. Sindh, Punjab, the northwest, and Balochistan were influenced by shifting kingdoms and dynasties while remaining connected to Afghanistan, Central Asia, Iran, and northern India through trade and military routes. From the early Islamic period onward, new systems of administration, architecture, scholarship, commerce, and religious life became increasingly important across the region.",

        "Sufi teachers, shrines, trading towns, fortified settlements, caravan routes, agricultural communities, and regional courts all contributed to a changing cultural landscape. Cities such as Multan, Lahore, Uch, Thatta, and Peshawar grew in importance at different times, while local languages and traditions continued to develop alongside Persian, Arabic, and other cultural influences. The medieval period therefore created many of the religious, linguistic, architectural, and regional identities that remained influential in later centuries.",
      ],

      milestones: [
        "Expansion of Islamic political influence into the region.",
        "Growth of regional kingdoms and fortified urban centers.",
        "Development of Sufi networks, shrines, and religious learning.",
        "Expansion of trade and cultural links with neighboring regions.",
      ],

      legacy:
        "Medieval political and cultural transformations strongly influenced the religious traditions, languages, architecture, shrine culture, trade networks, and regional identities of later Pakistan.",

      highlights: [
        "Multan",
        "Sufi Traditions",
        "Trade Routes",
        "Regional Kingdoms",
      ],

      image: historyHeroImage,

      imageAlt: "Landscape representing medieval history in Pakistan",
    },

    /* =====================================================
       ERA 04 — MUGHAL ERA
    ===================================================== */

    {
      id: "era-04",

      period: "1526 CE – Early 18th Century",

      category: "Mughal Era",

      title: "Empire & Cultural Expansion",

      paragraphs: [
        "The Mughal period brought large parts of the region into one of South Asia's most powerful imperial systems. Punjab in particular became strategically important to Mughal administration, military movement, agriculture, and trade. Lahore emerged as one of the empire's great cities and at times served as an imperial residence. Successive emperors transformed the city through palaces, gardens, mosques, gateways, markets, roads, and monumental architecture, making Lahore a major political and cultural center.",

        "Mughal rule also encouraged artistic production, manuscript culture, craftsmanship, irrigation, commerce, garden design, and urban development. Persianate court traditions interacted with regional languages, local building practices, and diverse religious communities. Lahore Fort and the Shalamar Gardens remain outstanding examples of this cultural flowering, preserving architectural forms associated especially with the reigns of Akbar, Jahangir, and Shah Jahan.",
      ],

      milestones: [
        "Lahore developed into a major Mughal political and cultural center.",
        "Expansion of monumental architecture, gardens, mosques, and palaces.",
        "Growth of imperial roads, commerce, and administrative networks.",
        "Flourishing of artistic, literary, architectural, and craft traditions.",
      ],

      legacy:
        "The Mughal era left one of Pakistan's most visible architectural and artistic legacies, especially in Lahore, where imperial monuments continue to shape the historical identity of the city.",

      highlights: [
        "Lahore Fort",
        "Shalamar Gardens",
        "Mughal Architecture",
        "Imperial Culture",
      ],

      image: historyHeroImage,

      imageAlt: "Landscape representing Mughal-era Pakistan",
    },

    /* =====================================================
       ERA 05 — COLONIAL TRANSFORMATION
    ===================================================== */

    {
      id: "era-05",

      period: "18th Century – 1947",

      category: "Colonial Transformation",

      title: "Empire, Industry & Political Change",

      paragraphs: [
        "The decline of Mughal authority opened a long period of political competition and regional state-building. Punjab experienced major transformations under different rulers before the Sikh Empire emerged as a powerful state in the early nineteenth century. Following British annexation, new systems of administration, taxation, law, military organization, education, and communication reshaped both urban and rural life across large parts of the region.",

        "Railways, canals, roads, cantonments, colleges, courts, municipalities, and new commercial centers transformed the physical and economic landscape. At the same time, the late nineteenth and early twentieth centuries saw growing political debate about representation, education, religious identity, constitutional reform, and the future of British India. Muslim political organization expanded during this period, eventually contributing to the movement that culminated in independence and the creation of Pakistan in 1947.",
      ],

      milestones: [
        "Rise of the Sikh Empire in Punjab.",
        "Expansion of British colonial administration.",
        "Construction of railways, canals, roads, and civic infrastructure.",
        "Growth of political movements leading toward independence.",
      ],

      legacy:
        "The colonial period left behind major administrative institutions, transport networks, irrigation systems, educational structures, cities, and political movements that strongly influenced the state inherited by Pakistan in 1947.",

      highlights: [
        "Sikh Empire",
        "British Rule",
        "Railways & Canals",
        "Pakistan Movement",
      ],

      image: historyHeroImage,

      imageAlt:
        "Landscape representing colonial-era transformation in Pakistan",
    },

    /* =====================================================
       ERA 06 — MODERN ERA
    ===================================================== */

    {
      id: "era-06",

      period: "1947 CE – 2000 CE",

      category: "Nationhood",

      title: "Modern Era",

      paragraphs: [
        "Pakistan emerged as an independent state in August 1947 following the partition of British India. Independence was accompanied by one of the largest migrations of the twentieth century, with millions of people moving across the newly created borders. The new country faced the immediate challenges of refugee settlement, establishing government institutions, organizing the civil service and armed forces, developing economic systems, managing territorial disputes, and building a shared national identity across geographically and culturally diverse regions.",

        "The following decades brought repeated constitutional change, periods of civilian and military government, industrialization, agricultural transformation, urban growth, expansion of education, and major infrastructure development. The political crisis of 1971 and the separation of East Pakistan, which became Bangladesh, represented one of the most consequential turning points in the country's history. In the decades that followed, Pakistan continued to experience political restructuring, demographic growth, migration to cities, changing media, economic reform, and evolving relations between federal and provincial institutions.",
      ],

      milestones: [
        "Creation of Pakistan in August 1947.",
        "Mass migration and establishment of national institutions.",
        "Political, constitutional, agricultural, and industrial transformation.",
        "Separation of East Pakistan and creation of Bangladesh in 1971.",
      ],

      legacy:
        "The first five decades of independence established many of the institutions, political debates, infrastructure networks, cities, industries, and social transformations that continue to shape contemporary Pakistan.",

      highlights: [
        "Independence",
        "Nation Building",
        "1971",
        "Modern Development",
      ],

      image: historyHeroImage,

      imageAlt: "Landscape representing Pakistan during the modern era",
    },

    /* =====================================================
       ERA 07 — CONTEMPORARY PAKISTAN
    ===================================================== */

    {
      id: "era-07",

      period: "2000 CE – Present",

      category: "Contemporary",

      title: "Contemporary Pakistan",

      paragraphs: [
        "In the twenty-first century, Pakistan has experienced rapid urbanization, demographic growth, expanding digital connectivity, new infrastructure, changing media, and increasingly interconnected regional economies. Major cities such as Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Quetta have continued to grow while smaller cities and towns have become more closely linked through highways, communications, education, commerce, and digital technology.",

        "At the same time, contemporary Pakistan remains deeply connected to its historic and cultural inheritance. Archaeological sites, Mughal monuments, Sufi shrines, historic forts, traditional settlements, mountain communities, languages, crafts, cuisines, festivals, and regional identities continue to shape everyday life. The country's ongoing story is therefore not simply one of modernization, but of negotiation between rapid technological and social change and the preservation of a remarkably diverse historical landscape.",
      ],

      milestones: [
        "Rapid growth of digital technology and communications.",
        "Expansion of cities and regional infrastructure.",
        "Greater economic and social connectivity across the country.",
        "Growing interest in heritage conservation, tourism, and cultural identity.",
      ],

      legacy:
        "Contemporary Pakistan reflects an ongoing relationship between ancient heritage, regional diversity, urban growth, technology, modernization, and global connectivity.",

      highlights: [
        "Urbanization",
        "Technology",
        "Infrastructure",
        "Heritage & Tourism",
      ],

      image: historyHeroImage,

      imageAlt: "Landscape representing contemporary Pakistan",
    },
  ],
};

/* =========================================================
   PROVINCE HISTORY CARDS
   We will connect this in the next section
========================================================= */

export const provinceHistoryCardsData = {
  eyebrow: "History Across Pakistan",

  title: "Every region carries a different chapter.",

  description:
    "Explore the distinct historical identities, civilizations, cultural influences, and defining moments of Pakistan's major regions.",

  provinces: [
    {
      id: "province-punjab",

      slug: "punjab",

      name: "Punjab",

      shortDescription:
        "A historic heartland shaped by ancient settlements, empires, Sikh heritage, Mughal culture, colonial transformation, and the movement for independence.",

      period: "Ancient Civilizations → Modern Pakistan",

      highlights: ["Harappa", "Mughal Heritage", "Sikh History"],

      image: historyHeroImage,

      imageAlt: "Historic landscape representing Punjab",
    },

    {
      id: "province-sindh",

      slug: "sindh",

      name: "Sindh",

      shortDescription:
        "Home to the Indus Valley Civilization, ancient ports, Sufi traditions, historic cities, and centuries of political and cultural exchange.",

      period: "Indus Valley → Contemporary Era",

      highlights: ["Mohenjo-daro", "Sufi Heritage", "Historic Sindh"],

      image: historyHeroImage,

      imageAlt: "Historic landscape representing Sindh",
    },

    {
      id: "province-kpk",

      slug: "khyber-pakhtunkhwa",

      name: "Khyber Pakhtunkhwa",

      shortDescription:
        "A historic crossroads connecting South and Central Asia through the Khyber Pass, shaped by Gandhara, empires, trade routes, and frontier history.",

      period: "Gandhara → Modern Era",

      highlights: ["Gandhara", "Khyber Pass", "Peshawar"],

      image: historyHeroImage,

      imageAlt: "Historic landscape representing Khyber Pakhtunkhwa",
    },

    {
      id: "province-balochistan",

      slug: "balochistan",

      name: "Balochistan",

      shortDescription:
        "A vast region with prehistoric settlements, ancient trade routes, tribal traditions, strategic coastal connections, and a distinctive cultural history.",

      period: "Prehistory → Contemporary Era",

      highlights: ["Mehrgarh", "Trade Routes", "Coastal History"],

      image: historyHeroImage,

      imageAlt: "Historic landscape representing Balochistan",
    },

    {
      id: "province-gilgit-baltistan",

      slug: "gilgit-baltistan",

      name: "Gilgit-Baltistan",

      shortDescription:
        "A mountainous crossroads shaped by ancient Silk Road networks, Buddhist heritage, local kingdoms, trade routes, and centuries of cultural exchange.",

      period: "Ancient Routes → Modern Era",

      highlights: ["Silk Road", "Buddhist Heritage", "Mountain Kingdoms"],

      image: historyHeroImage,

      imageAlt: "Historic landscape representing Gilgit-Baltistan",
    },
  ],
};

/* =========================================================
   PROVINCE HISTORY EXPLORER
   Data prepared now — UI will be built later
========================================================= */

/* =========================================================
   REGIONAL HISTORY EXPLORER DATA
========================================================= */
export const provinceHistorySliderData = {
  provinces: [
    /* =====================================================
       PUNJAB
    ===================================================== */

    {
      id: "province-history-punjab",
      slug: "punjab",
      name: "Punjab",

      images: [historyHeroImage, historyHeroImage, historyHeroImage],

      history: {
        title: "History of Punjab",

        summary:
          "Punjab has been one of South Asia's most important regions for settlement, agriculture, trade, political power, and cultural exchange for thousands of years.",

        paragraphs: [
          "The region contains some of the subcontinent's most significant archaeological and historic sites, including Harappa and the historic city of Lahore. Its location between the Indus basin and routes leading toward Afghanistan, Central Asia, and northern India repeatedly made Punjab a major center of movement, conquest, trade, and settlement.",

          "Over the centuries, Punjab came under numerous dynasties and empires, including the Mauryans, Kushans, Ghaznavids, Delhi Sultanate, Mughals, Sikhs, and British. Lahore developed into a major political, cultural, religious, and architectural center, while the colonial period introduced new canals, railways, institutions, and administrative systems before Partition reshaped the region in 1947.",
        ],

        highlights: [
          "Harappa",
          "Lahore",
          "Mughal Heritage",
          "Sikh Era",
          "Partition",
        ],
      },

      cultural: {
        title: "Culture of Punjab",

        summary:
          "Punjab's cultural identity is shaped by language, music, poetry, food, crafts, architecture, agriculture, and a strong tradition of communal celebration.",

        paragraphs: [
          "Punjabi culture is deeply connected to the region's agricultural landscape and village traditions, while cities such as Lahore have long served as major centers of literature, music, art, education, and cuisine. Punjabi, Saraiki, and other regional languages contribute to a rich linguistic environment shaped by centuries of interaction and migration.",

          "Folk music, qawwali, traditional dance, embroidery, pottery, woodwork, truck art, and regional cuisine remain important expressions of identity. Sufi poetry and shrine culture have also played a major role in shaping the cultural life of Punjab, blending spiritual traditions with music, literature, and community gatherings.",
        ],

        highlights: [
          "Punjabi Language",
          "Sufi Poetry",
          "Bhangra",
          "Traditional Crafts",
          "Lahore Cuisine",
        ],
      },

      social: {
        title: "Social Life in Punjab",

        summary:
          "Social life in Punjab is shaped by family networks, village and urban communities, hospitality, education, agriculture, commerce, and rapidly changing city life.",

        paragraphs: [
          "Extended family structures and community relationships remain important across both rural and urban Punjab. In agricultural areas, seasonal cycles and farming communities influence everyday routines, while larger cities reflect increasingly diverse professional, educational, and commercial lifestyles.",

          "Urbanization has transformed social life in cities such as Lahore, Rawalpindi, Faisalabad, Multan, and Gujranwala. Modern cafés, universities, workplaces, shopping districts, and digital culture now exist alongside older bazaars, neighborhood traditions, religious gatherings, and family-centered social customs.",
        ],

        highlights: [
          "Family Networks",
          "Village Life",
          "Urban Growth",
          "Education",
          "Hospitality",
        ],
      },

      festivals: {
        title: "Festivals & Events in Punjab",

        summary:
          "Punjab's calendar includes religious festivals, seasonal celebrations, cultural events, shrine gatherings, and large urban festivals.",

        paragraphs: [
          "Religious occasions such as Eid are celebrated widely across the province, while seasonal and agricultural traditions also influence local celebrations. Shrine festivals and urs gatherings bring together music, devotion, food, and community participation around the legacies of important Sufi saints.",

          "Major cities host literary festivals, food events, cultural exhibitions, music performances, sports tournaments, and heritage celebrations. These events create a blend of traditional and contemporary cultural life, particularly in Lahore and other urban centers.",
        ],

        highlights: [
          "Eid Celebrations",
          "Urs Festivals",
          "Literary Events",
          "Food Festivals",
          "Cultural Fairs",
        ],
      },
    },

    /* =====================================================
       SINDH
    ===================================================== */

    {
      id: "province-history-sindh",
      slug: "sindh",
      name: "Sindh",

      images: [historyHeroImage, historyHeroImage, historyHeroImage],

      history: {
        title: "History of Sindh",

        summary:
          "Sindh's history is deeply connected to the Indus River, ancient urban civilization, regional dynasties, Sufi traditions, trade, and maritime connections.",

        paragraphs: [
          "Sindh was home to Mohenjo-daro, one of the most important urban centers of the Indus Civilization. The Indus River supported agriculture, settlement, commerce, and communication across the region for thousands of years.",

          "Later periods brought Arab rule, local dynasties, Mughal influence, Talpur rule, and eventual British administration. Historic Thatta, Makli, river settlements, ports, and Karachi's growth as a major coastal city all form part of Sindh's layered political and economic history.",
        ],

        highlights: [
          "Mohenjo-daro",
          "Indus River",
          "Thatta",
          "Makli",
          "Karachi",
        ],
      },

      cultural: {
        title: "Culture of Sindh",

        summary:
          "Sindhi culture is known for its poetry, Sufi traditions, textiles, music, crafts, cuisine, and strong relationship with the Indus landscape.",

        paragraphs: [
          "Sindhi language and literature have a deep tradition, with Sufi poets playing an especially important role in shaping regional identity. Music, storytelling, spiritual poetry, and shrine traditions continue to influence cultural life across the province.",

          "Ajrak, Sindhi topi, embroidery, block printing, pottery, handicrafts, and traditional jewelry are among the most recognizable visual expressions of Sindhi culture. Regional foods and community customs also vary between riverine, desert, rural, and coastal areas.",
        ],

        highlights: [
          "Ajrak",
          "Sindhi Topi",
          "Sufi Poetry",
          "Folk Music",
          "Handicrafts",
        ],
      },

      social: {
        title: "Social Life in Sindh",

        summary:
          "Sindh combines long-established rural communities, river settlements, desert traditions, historic towns, and the fast-paced urban life of Karachi.",

        paragraphs: [
          "Rural social life often centers on family, agriculture, local markets, religious gatherings, and community traditions. The Indus River continues to influence settlement patterns, livelihoods, and social relationships across much of the province.",

          "Karachi presents a very different social environment, shaped by migration, commerce, industry, education, media, and extraordinary linguistic and cultural diversity. Together, rural Sindh and metropolitan Karachi give the province a uniquely varied social character.",
        ],

        highlights: [
          "River Communities",
          "Rural Traditions",
          "Karachi Life",
          "Migration",
          "Community Networks",
        ],
      },

      festivals: {
        title: "Festivals & Events in Sindh",

        summary:
          "Sindh's festivals reflect religious devotion, Sufi traditions, local crafts, seasonal gatherings, and the cultural diversity of its cities and rural communities.",

        paragraphs: [
          "Urs gatherings at major Sufi shrines are among Sindh's most significant cultural and religious events, bringing together pilgrims, musicians, vendors, and local communities. Religious festivals such as Eid are celebrated throughout the province.",

          "Cultural festivals also highlight Ajrak, handicrafts, folk music, poetry, traditional dress, and regional cuisine. Karachi adds large-scale book fairs, arts festivals, exhibitions, concerts, and other urban events to Sindh's cultural calendar.",
        ],

        highlights: [
          "Urs Gatherings",
          "Sindh Cultural Day",
          "Folk Music",
          "Craft Festivals",
          "Karachi Events",
        ],
      },
    },

    /* =====================================================
       KHYBER PAKHTUNKHWA
    ===================================================== */

    {
      id: "province-history-kpk",
      slug: "khyber-pakhtunkhwa",
      name: "Khyber Pakhtunkhwa",

      images: [historyHeroImage, historyHeroImage, historyHeroImage],

      history: {
        title: "History of Khyber Pakhtunkhwa",

        summary:
          "Khyber Pakhtunkhwa has long served as a gateway between South Asia, Afghanistan, Central Asia, and regions farther west.",

        paragraphs: [
          "The region formed a major part of ancient Gandhara, which became renowned for Buddhist monasteries, sculpture, scholarship, and artistic traditions shaped by cross-cultural exchange. Mountain passes and valleys made the region strategically important to traders, pilgrims, rulers, and armies.",

          "Peshawar and surrounding areas remained important through later periods under different dynasties and empires. Historic routes, forts, bazaars, archaeological sites, and local traditions reflect a complex history shaped by mobility, frontier politics, and strong regional identities.",
        ],

        highlights: [
          "Gandhara",
          "Takht-i-Bahi",
          "Peshawar",
          "Khyber Pass",
          "Buddhist Heritage",
        ],
      },

      cultural: {
        title: "Culture of Khyber Pakhtunkhwa",

        summary:
          "The region's culture is strongly shaped by Pashtun traditions, hospitality, poetry, music, craftsmanship, tribal histories, and mountain communities.",

        paragraphs: [
          "Pashto language, oral poetry, storytelling, and traditional music are central to cultural identity across much of the province. Hospitality and community customs are deeply valued, while local dress, architecture, food, and crafts vary between valleys and districts.",

          "Traditional woodwork, embroidery, carpets, caps, jewelry, and regional cuisine remain important cultural expressions. Historic Peshawar also contributes a distinctive urban culture influenced by centuries of trade and migration.",
        ],

        highlights: [
          "Pashto",
          "Hospitality",
          "Folk Music",
          "Traditional Crafts",
          "Peshawar Culture",
        ],
      },

      social: {
        title: "Social Life in Khyber Pakhtunkhwa",

        summary:
          "Social life is shaped by family, community ties, local traditions, mountain geography, urban development, and the strong role of hospitality.",

        paragraphs: [
          "Family and community networks remain central in many parts of the province. Rural and mountain communities often maintain strong local traditions connected to agriculture, livestock, seasonal movement, and village life.",

          "Cities such as Peshawar, Abbottabad, Mardan, and Swat's urban centers increasingly combine traditional social structures with universities, business districts, tourism, modern services, and digital connectivity.",
        ],

        highlights: [
          "Family Networks",
          "Community Life",
          "Mountain Settlements",
          "Urban Change",
          "Hospitality",
        ],
      },

      festivals: {
        title: "Festivals & Events in Khyber Pakhtunkhwa",

        summary:
          "The province hosts religious celebrations, cultural gatherings, sports events, seasonal festivals, and local traditions shaped by its valleys and mountain communities.",

        paragraphs: [
          "Eid celebrations and religious gatherings are important across the province, while local communities also organize seasonal fairs, traditional music events, and cultural programs.",

          "Mountain regions host tourism and sports events connected to snow, polo, hiking, heritage, and regional traditions. Cultural festivals increasingly highlight Pashtun music, food, crafts, and local identity.",
        ],

        highlights: [
          "Religious Festivals",
          "Polo",
          "Mountain Events",
          "Cultural Fairs",
          "Traditional Music",
        ],
      },
    },

    /* =====================================================
       BALOCHISTAN
    ===================================================== */

    {
      id: "province-history-balochistan",
      slug: "balochistan",
      name: "Balochistan",

      images: [historyHeroImage, historyHeroImage, historyHeroImage],

      history: {
        title: "History of Balochistan",

        summary:
          "Balochistan preserves evidence of some of the earliest settled communities in South Asia and centuries of interaction across inland and coastal trade routes.",

        paragraphs: [
          "Mehrgarh provides important archaeological evidence of early agriculture, animal domestication, craft production, and permanent settlement. Its record places Balochistan among the key regions for understanding early settled life in South Asia.",

          "Later history was shaped by tribal societies, local rulers, the Khanate of Kalat, regional trade, and connections with Iran, Afghanistan, Central Asia, and the Arabian Sea. The Makran coast added an important maritime dimension to the province's history.",
        ],

        highlights: [
          "Mehrgarh",
          "Kalat",
          "Makran",
          "Ancient Settlements",
          "Trade Routes",
        ],
      },

      cultural: {
        title: "Culture of Balochistan",

        summary:
          "Balochistan is culturally diverse, with strong Baloch, Pashtun, Brahui, and other regional traditions expressed through language, music, dress, crafts, food, and oral history.",

        paragraphs: [
          "Traditional embroidery, mirror work, weaving, carpets, jewelry, and distinctive regional dress are important visual expressions of identity. Music and oral storytelling play a significant role in preserving local history and community memory.",

          "Food traditions reflect the province's pastoral and geographic character, while cultural practices vary widely between Quetta, Kalat, Makran, highland communities, and desert regions.",
        ],

        highlights: [
          "Balochi Culture",
          "Brahui Traditions",
          "Embroidery",
          "Folk Music",
          "Regional Cuisine",
        ],
      },

      social: {
        title: "Social Life in Balochistan",

        summary:
          "Social life is shaped by strong community ties, tribal and family relationships, pastoral traditions, urban centers, and the province's vast geography.",

        paragraphs: [
          "In many rural areas, family and tribal networks remain central to social organization. Livestock, agriculture, local markets, and seasonal movement continue to influence daily life in different parts of the province.",

          "Quetta and other growing towns introduce more urban patterns of education, commerce, employment, and services, creating a social landscape where traditional systems and modern institutions increasingly intersect.",
        ],

        highlights: [
          "Tribal Networks",
          "Family Life",
          "Pastoral Traditions",
          "Quetta",
          "Community Ties",
        ],
      },

      festivals: {
        title: "Festivals & Events in Balochistan",

        summary:
          "Balochistan's festivals bring together traditional music, dance, crafts, sports, religious celebrations, and regional community gatherings.",

        paragraphs: [
          "Religious festivals such as Eid are widely celebrated, while local cultural gatherings showcase regional dress, music, food, crafts, and traditional performances.",

          "Events in Quetta and other areas increasingly promote tourism, handicrafts, local sports, cultural heritage, and the province's diverse Baloch, Pashtun, and Brahui traditions.",
        ],

        highlights: [
          "Eid",
          "Cultural Gatherings",
          "Traditional Music",
          "Craft Events",
          "Local Sports",
        ],
      },
    },

    /* =====================================================
       GILGIT-BALTISTAN
    ===================================================== */

    {
      id: "province-history-gilgit-baltistan",
      slug: "gilgit-baltistan",
      name: "Gilgit-Baltistan",

      images: [historyHeroImage, historyHeroImage, historyHeroImage],

      history: {
        title: "History of Gilgit-Baltistan",

        summary:
          "Gilgit-Baltistan developed along ancient mountain routes linking South Asia with Central Asia, Tibet, and western China.",

        paragraphs: [
          "Travelers, merchants, monks, and local communities moved through the region's valleys and passes for centuries, leaving inscriptions, carvings, religious influences, and trade connections that reveal its importance within wider mountain networks.",

          "Local dynasties and princely states shaped political life across Hunza, Nagar, Gilgit, Baltistan, and neighboring valleys. Historic forts, settlements, and oral traditions preserve the legacy of these mountain communities.",
        ],

        highlights: [
          "Silk Routes",
          "Baltit Fort",
          "Altit Fort",
          "Rock Carvings",
          "Mountain Kingdoms",
        ],
      },

      cultural: {
        title: "Culture of Gilgit-Baltistan",

        summary:
          "The region's culture reflects mountain geography, linguistic diversity, traditional architecture, music, crafts, food, and centuries of interaction along trans-Himalayan routes.",

        paragraphs: [
          "Communities across Hunza, Baltistan, Gilgit, Ghizer, Diamer, and other valleys maintain distinct languages, dress, musical traditions, food cultures, and architectural styles. Stone and timber construction, fort architecture, and compact mountain settlements remain important elements of the visual landscape.",

          "Traditional music, dance, wool products, woodwork, jewelry, local cuisine, and oral storytelling continue to preserve regional identity while tourism and education increasingly connect local communities with the wider world.",
        ],

        highlights: [
          "Mountain Languages",
          "Traditional Music",
          "Fort Architecture",
          "Local Cuisine",
          "Craft Heritage",
        ],
      },

      social: {
        title: "Social Life in Gilgit-Baltistan",

        summary:
          "Social life is closely connected to village communities, family networks, mountain agriculture, education, tourism, and the demands of living in high-altitude environments.",

        paragraphs: [
          "Village cooperation has traditionally been important for agriculture, irrigation, construction, and coping with harsh mountain conditions. Family and community relationships remain central across many valleys.",

          "Education, tourism, road connectivity, digital access, and migration have introduced major social changes. Towns such as Gilgit and Skardu increasingly serve as regional hubs for education, commerce, healthcare, and tourism.",
        ],

        highlights: [
          "Village Communities",
          "Mountain Agriculture",
          "Education",
          "Tourism",
          "Community Cooperation",
        ],
      },

      festivals: {
        title: "Festivals & Events in Gilgit-Baltistan",

        summary:
          "Gilgit-Baltistan hosts seasonal, cultural, religious, and sporting events closely connected to mountain life and local identity.",

        paragraphs: [
          "Polo is one of the region's most recognizable sporting traditions, with tournaments attracting communities and visitors from across the mountains. Seasonal gatherings also celebrate local music, food, crafts, and traditional performances.",

          "Religious festivals and regional cultural events vary between valleys and communities, reflecting the extraordinary diversity of the region. Tourism festivals increasingly showcase mountain sports, heritage, cuisine, and local culture.",
        ],

        highlights: [
          "Polo",
          "Mountain Festivals",
          "Traditional Music",
          "Seasonal Events",
          "Tourism Events",
        ],
      },
    },
  ],
};
export const historicalPlacesData = {
  eyebrow: "Walk Through History",

  title: "Explore Timeless Heritage",

  description:
    "Discover archaeological sites, forts, monuments, historic cities, and cultural landmarks that preserve Pakistan's layered past.",

  places: [
    {
      id: "mohenjo-daro",
      name: "Mohenjo-daro",
      region: "Sindh",
      period: "Indus Civilization",
      description:
        "One of the most important surviving urban centers of the ancient Indus Civilization.",
      image: historyHeroImage,
      imageAlt: "Mohenjo-daro archaeological heritage site",
    },

    {
      id: "taxila",
      name: "Taxila",
      region: "Punjab",
      period: "Ancient Gandhara",
      description:
        "An ancient center of learning, trade, Buddhist culture, and regional exchange.",
      image: historyHeroImage,
      imageAlt: "Historic ruins representing Taxila",
    },

    {
      id: "lahore-fort",
      name: "Lahore Fort",
      region: "Punjab",
      period: "Mughal Era",
      description:
        "A monumental complex reflecting centuries of imperial architecture and cultural history.",
      image: historyHeroImage,
      imageAlt: "Historic view representing Lahore Fort",
    },

    {
      id: "rohtas-fort",
      name: "Rohtas Fort",
      region: "Punjab",
      period: "16th Century",
      description:
        "A powerful fortified complex built during a period of major political transformation.",
      image: historyHeroImage,
      imageAlt: "Historic view representing Rohtas Fort",
    },

    {
      id: "makli",
      name: "Makli Necropolis",
      region: "Sindh",
      period: "14th–18th Century",
      description:
        "A vast funerary landscape reflecting centuries of architecture, craftsmanship, and dynastic history.",
      image: historyHeroImage,
      imageAlt: "Historic landscape representing Makli Necropolis",
    },

    {
      id: "takht-i-bahi",
      name: "Takht-i-Bahi",
      region: "Khyber Pakhtunkhwa",
      period: "Buddhist Heritage",
      description:
        "A remarkable Buddhist monastic complex associated with the ancient Gandhara world.",
      image: historyHeroImage,
      imageAlt: "Historic Buddhist site representing Takht-i-Bahi",
    },

    {
      id: "baltit-fort",
      name: "Baltit Fort",
      region: "Gilgit-Baltistan",
      period: "Mountain Kingdoms",
      description:
        "A historic fortified residence reflecting the political and architectural heritage of Hunza.",
      image: historyHeroImage,
      imageAlt: "Historic mountain fort representing Baltit Fort",
    },
  ],
};
export const historyClosingCTAData = {
  eyebrow: "Experience the Past",

  title: "History isn't only something to read. It's somewhere you can go.",

  description:
    "Walk through ancient cities, forts, archaeological sites, historic streets, mountain settlements, and cultural landscapes that continue to tell Pakistan's story today.",

  image: historyHeroImage,

  imageAlt: "Historic landscape of Pakistan",

  primaryCta: {
    label: "Explore Historical Places",
    path: "/destinations",
  },

  secondaryCta: {
    label: "Plan Your Journey",
    path: "/plan-your-trip",
  },
};
