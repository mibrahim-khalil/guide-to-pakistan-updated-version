export function normalizeSlug(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function resolveRegionSlug(regionSlug = "") {
  const normalized = normalizeSlug(regionSlug);
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
    punjab: "punjab",
    sindh: "sindh",
    balochistan: "balochistan",
  };
  return aliases[normalized] || normalized;
}

export function toPublicRegionSlug(regionSlug = "") {
  const canonical = resolveRegionSlug(regionSlug);
  const map = {
    islamabad: "islamabad-capital-territory",
    kashmir: "azad-jammu-and-kashmir",
  };
  return map[canonical] || canonical;
}