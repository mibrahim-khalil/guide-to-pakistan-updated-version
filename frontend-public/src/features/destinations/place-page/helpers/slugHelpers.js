export function normalizeSlug(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toTitleCaseFromSlug(slug = "") {
  return normalizeSlug(slug)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function makePlaceKey(regionSlug = "", placeSlug = "") {
  return `${normalizeSlug(regionSlug)}::${normalizeSlug(placeSlug)}`;
}

export function getRegionLabel(regionSlug = "") {
  const normalizedRegion = normalizeSlug(regionSlug);

  const regionLabels = {
    "gilgit-baltistan": "Gilgit-Baltistan",

    "khyber-pakhtunkhwa": "Khyber Pakhtunkhwa",

    islamabad: "Islamabad Capital Territory",

    punjab: "Punjab",

    sindh: "Sindh",

    balochistan: "Balochistan",

    kashmir: "Azad Jammu & Kashmir",

    "azad-jammu-and-kashmir": "Azad Jammu & Kashmir",
  };

  return (
    regionLabels[normalizedRegion] || toTitleCaseFromSlug(normalizedRegion)
  );
}

export function resolveRegionSlug(regionSlug = "") {
  const normalizedRegion = normalizeSlug(regionSlug);

  const aliases = {
    "islamabad-capital-territory": "islamabad",
    "islamabad-capital": "islamabad",
    ict: "islamabad",
    islamabad: "islamabad",

    kpk: "khyber-pakhtunkhwa",

    "khyber-pakhtunkhwa": "khyber-pakhtunkhwa",

    gb: "gilgit-baltistan",

    "gilgit-baltistan": "gilgit-baltistan",

    ajk: "kashmir",

    "azad-jammu-kashmir": "kashmir",

    "azad-jammu-and-kashmir": "kashmir",

    kashmir: "kashmir",

    ict: "islamabad",

    islamabad: "islamabad",
  };

  return aliases[normalizedRegion] || normalizedRegion;
}

export function resolvePlaceSlug(placeSlug = "") {
  const normalizedPlace = normalizeSlug(placeSlug);

  const aliases = {
    kalash: "kalaash-valley",

    "kalash-valley": "kalaash-valley",

    kalaash: "kalaash-valley",

    naran: "naraan-valley",

    "naran-valley": "naraan-valley",

    naraan: "naraan-valley",

    "skardu-valley": "skardu-valley",

    skardu: "skardu-valley",

    "attabad-lake": "attabad-lake",

    attabad: "attabad-lake",

    "pir-sohawa": "pir-sohawa",

    "peer-sohawa": "pir-sohawa",

    "neela-sandh": "neela-sandh",

    "neela-sand": "neela-sandh",

    "toli-peer": "toli-peer",

    "toli-pir": "toli-peer",

    "banjosa-lake": "banjosa-lake",
  };

  return aliases[normalizedPlace] || normalizedPlace;
}
