import heroImg from "../../../../assets/images/hero/hero.jpeg";
import gbHeroImg from "../../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

import { createPlaceDetails } from "../helpers/createPlaceDetails";

/* =========================================================
   GILGIT-BALTISTAN
========================================================= */

const gilgitBaltistanPlaces = [
  createPlaceDetails({
    slug: "attabad-lake",
    name: "Attabad Lake",
    regionSlug: "gilgit-baltistan",
    hero: {
      image: gbHeroImg,
      summary:
        "A striking turquoise lake in Hunza, known for dramatic mountain scenery and boating experiences.",
    },
    overview: {
      paragraphs: [
        "Attabad Lake is one of Gilgit-Baltistan’s most recognizable natural attractions.",
        "Its vivid blue water, surrounding peaks, and lakeside settlements create a distinctive mountain experience.",
      ],
    },
  }),

  createPlaceDetails({
    slug: "skardu-valley",
    name: "Skardu Valley",
    regionSlug: "gilgit-baltistan",
    hero: {
      image: gbHeroImg,
      summary:
        "A major mountain destination surrounded by lakes, valleys, deserts, and high peaks.",
    },
    overview: {
      paragraphs: [
        "Skardu Valley is a gateway to some of Pakistan’s most dramatic mountain landscapes.",
        "The area combines lakes, historic sites, cold desert terrain, and traditional Balti culture.",
      ],
    },
  }),

  createPlaceDetails({
    slug: "rakaposhi-base-camp",
    name: "Rakaposhi Base Camp",
    regionSlug: "gilgit-baltistan",
    hero: {
      image: gbHeroImg,
      summary:
        "A scenic trekking destination beneath the towering Rakaposhi mountain.",
    },
    overview: {
      paragraphs: [
        "Rakaposhi Base Camp offers close views of one of Pakistan’s most prominent peaks.",
        "The route passes through villages, fields, glaciers, and alpine terrain.",
      ],
    },
  }),

  createPlaceDetails({
    slug: "astore-valley",
    name: "Astore Valley",
    regionSlug: "gilgit-baltistan",
    hero: {
      image: gbHeroImg,
      summary:
        "A peaceful valley known for alpine meadows, rivers, mountain villages, and access to Deosai.",
    },
    overview: {
      paragraphs: [
        "Astore Valley is shaped by remote mountain communities and wide natural landscapes.",
        "Its identity reflects traditional village life, seasonal travel routes, and alpine scenery.",
      ],
    },
  }),
];

/* =========================================================
   KHYBER PAKHTUNKHWA
========================================================= */

const khyberPakhtunkhwaPlaces = [
  createPlaceDetails({
    slug: "peshawar",
    name: "Peshawar",
    regionSlug: "khyber-pakhtunkhwa",
    hero: {
      image: heroImg,
      summary:
        "A historic city known for bazaars, architecture, museums, food, and deep cultural heritage.",
    },
    overview: {
      paragraphs: [
        "Peshawar is one of Pakistan’s oldest continuously inhabited cities.",
        "Its cultural identity is reflected in historic markets, traditional cuisine, architecture, and hospitality.",
      ],
    },
  }),

  createPlaceDetails({
    slug: "chitral",
    name: "Chitral",
    regionSlug: "khyber-pakhtunkhwa",
    hero: {
      image: heroImg,
      summary:
        "A mountain region known for valleys, rivers, forts, traditions, and views of Tirich Mir.",
    },
    overview: {
      paragraphs: [
        "Chitral is defined by mountain geography, local traditions, and diverse communities.",
        "The region is known for cultural festivals, historic settlements, and dramatic landscapes.",
      ],
    },
  }),

  createPlaceDetails({
    slug: "kalaash-valley",
    name: "Kalaash Valley",
    regionSlug: "khyber-pakhtunkhwa",
    hero: {
      image: heroImg,
      summary:
        "A culturally distinctive valley known for festivals, traditional dress, wooden homes, and mountain scenery.",
    },
    overview: {
      paragraphs: [
        "Kalaash Valley is recognized for its unique cultural traditions and seasonal festivals.",
        "Visitors should approach the valley with respect for local customs, privacy, and community practices.",
      ],
    },
  }),

  createPlaceDetails({
    slug: "naraan-valley",
    name: "Naraan Valley",
    regionSlug: "khyber-pakhtunkhwa",
    hero: {
      image: heroImg,
      summary:
        "A popular mountain destination known for rivers, lakes, meadows, and access to Kaghan Valley.",
    },
    overview: {
      paragraphs: [
        "Naraan Valley is one of northern Pakistan’s most visited summer destinations.",
        "Its tourism identity is shaped by mountain roads, alpine lakes, rivers, and seasonal hospitality.",
      ],
    },
  }),
];

/* =========================================================
   ISLAMABAD
========================================================= */

const islamabadPlaces = [
  createPlaceDetails({
    slug: "panjpeer-rocks",
    name: "Panjpeer Rocks",
    regionSlug: "islamabad",
    hero: {
      image: heroImg,
      summary:
        "A rocky highland destination known for open views, cliffs, hiking, and natural formations.",
    },
  }),

  createPlaceDetails({
    slug: "chattar-park",
    name: "Chattar Park",
    regionSlug: "islamabad",
    hero: {
      image: heroImg,
      summary:
        "A family recreation area surrounded by hills, greenery, and roadside attractions.",
    },
  }),

  createPlaceDetails({
    slug: "pir-sohawa",
    name: "Pir Sohawa",
    regionSlug: "islamabad",
    hero: {
      image: heroImg,
      summary:
        "A hilltop destination offering panoramic views of Islamabad and the Margalla Hills.",
    },
  }),

  createPlaceDetails({
    slug: "lake-view-park",
    name: "Lake View Park",
    regionSlug: "islamabad",
    hero: {
      image: heroImg,
      summary:
        "A major recreational park beside Rawal Lake with open spaces and family activities.",
    },
  }),
];

/* =========================================================
   PUNJAB
========================================================= */

const punjabPlaces = [
  createPlaceDetails({
    slug: "murree",
    name: "Murree",
    regionSlug: "punjab",
    hero: {
      image: heroImg,
      summary:
        "A popular hill station known for forests, cool weather, viewpoints, and mountain roads.",
    },
  }),

  createPlaceDetails({
    slug: "neela-sandh",
    name: "Neela Sandh",
    regionSlug: "punjab",
    hero: {
      image: heroImg,
      summary:
        "A natural water destination known for blue pools, rocky surroundings, and outdoor recreation.",
    },
  }),

  createPlaceDetails({
    slug: "khewra-salt-mine",
    name: "Khewra Salt Mine",
    regionSlug: "punjab",
    hero: {
      image: heroImg,
      summary:
        "A historic salt mine known for underground chambers, salt formations, and visitor attractions.",
    },
  }),

  createPlaceDetails({
    slug: "kartarpur-corridor",
    name: "Kartarpur Corridor",
    regionSlug: "punjab",
    hero: {
      image: heroImg,
      summary:
        "A major religious and cultural destination centered on Gurdwara Darbar Sahib.",
    },
  }),
];

/* =========================================================
   SINDH
========================================================= */

const sindhPlaces = [
  createPlaceDetails({
    slug: "hyderabad",
    name: "Hyderabad",
    regionSlug: "sindh",
    hero: {
      image: heroImg,
      summary:
        "A historic Sindh city known for markets, crafts, food, forts, and cultural heritage.",
    },
  }),

  createPlaceDetails({
    slug: "sukkur",
    name: "Sukkur",
    regionSlug: "sindh",
    hero: {
      image: heroImg,
      summary:
        "A riverside city known for the Sukkur Barrage, historic sites, and Indus landscapes.",
    },
  }),

  createPlaceDetails({
    slug: "thar-desert",
    name: "Thar Desert",
    regionSlug: "sindh",
    hero: {
      image: heroImg,
      summary:
        "A vast desert region known for dunes, villages, traditional culture, and colorful local life.",
    },
  }),

  createPlaceDetails({
    slug: "thatta",
    name: "Thatta",
    regionSlug: "sindh",
    hero: {
      image: heroImg,
      summary:
        "A historic destination known for Makli Necropolis, mosques, and centuries of cultural heritage.",
    },
  }),
];

/* =========================================================
   BALOCHISTAN
========================================================= */

const balochistanPlaces = [
  createPlaceDetails({
    slug: "gwadar",
    name: "Gwadar",
    regionSlug: "balochistan",
    hero: {
      image: heroImg,
      summary:
        "A coastal destination known for beaches, marine views, cliffs, and a rapidly developing port city.",
    },
  }),

  createPlaceDetails({
    slug: "bolan-pass",
    name: "Bolan Pass",
    regionSlug: "balochistan",
    hero: {
      image: heroImg,
      summary:
        "A historic mountain pass known for rugged terrain, railway routes, and strategic importance.",
    },
  }),

  createPlaceDetails({
    slug: "ormara-beach",
    name: "Ormara Beach",
    regionSlug: "balochistan",
    hero: {
      image: heroImg,
      summary:
        "A quiet coastal destination known for long beaches, clear water, and dramatic cliffs.",
    },
  }),

  createPlaceDetails({
    slug: "ziarat-forest",
    name: "Ziarat Forest",
    regionSlug: "balochistan",
    hero: {
      image: heroImg,
      summary:
        "A mountain destination known for ancient juniper forests, cool weather, and scenic valleys.",
    },
  }),
];

/* =========================================================
   KASHMIR
========================================================= */

const kashmirPlaces = [
  createPlaceDetails({
    slug: "arang-kel",
    name: "Arang Kel",
    regionSlug: "kashmir",
    hero: {
      image: heroImg,
      summary:
        "A mountain village known for green meadows, wooden homes, and panoramic valley views.",
    },
  }),

  createPlaceDetails({
    slug: "toli-peer",
    name: "Toli Peer",
    regionSlug: "kashmir",
    hero: {
      image: heroImg,
      summary:
        "A high meadow destination known for open grasslands, ridgelines, and wide mountain views.",
    },
  }),

  createPlaceDetails({
    slug: "neelum-valley",
    name: "Neelum Valley",
    regionSlug: "kashmir",
    hero: {
      image: heroImg,
      summary:
        "A scenic valley known for rivers, forests, mountain settlements, and natural landscapes.",
    },
  }),

  createPlaceDetails({
    slug: "banjosa-lake",
    name: "Banjosa Lake",
    regionSlug: "kashmir",
    hero: {
      image: heroImg,
      summary:
        "A peaceful artificial lake surrounded by pine forest and family recreation areas.",
    },
  }),
];

/* =========================================================
   FINAL REGISTRY
========================================================= */

export const PLACE_REGISTRY = [
  ...gilgitBaltistanPlaces,
  ...khyberPakhtunkhwaPlaces,
  ...islamabadPlaces,
  ...punjabPlaces,
  ...sindhPlaces,
  ...balochistanPlaces,
  ...kashmirPlaces,
];