import { DEFAULT_PLACE } from "../defaults/defaultPlace";
import { createDefaultWeather } from "../defaults/defaultWeather";
import { createDefaultAdvisories } from "../defaults/defaultAdvisories";
import { createDefaultReviews } from "../defaults/defaultReviews";

import {
  getRegionLabel,
  normalizeSlug,
  resolvePlaceSlug,
  resolveRegionSlug,
} from "./slugHelpers";

function mergeExpandedContent(
  defaultExpanded = {},
  customExpanded = {},
) {
  return {
    ...defaultExpanded,
    ...customExpanded,

    cuisine: {
      ...defaultExpanded.cuisine,
      ...customExpanded.cuisine,
    },

    traditionalDish: {
      ...defaultExpanded.traditionalDish,
      ...customExpanded.traditionalDish,
    },

    socialLife: {
      ...defaultExpanded.socialLife,
      ...customExpanded.socialLife,
    },
  };
}

function mergeOverview(
  defaultOverview = {},
  customOverview = {},
) {
  return {
    ...defaultOverview,
    ...customOverview,

    paragraphs:
      customOverview.paragraphs ||
      defaultOverview.paragraphs,

    expandedContent: mergeExpandedContent(
      defaultOverview.expandedContent,
      customOverview.expandedContent,
    ),
  };
}

function mergeHero(
  defaultHero = {},
  customHero = {},
) {
  return {
    ...defaultHero,
    ...customHero,
  };
}

export function createPlaceDetails(config = {}) {
  const resolvedRegionSlug =
    resolveRegionSlug(config.regionSlug);

  const resolvedPlaceSlug =
    resolvePlaceSlug(
      config.slug ||
        config.placeSlug ||
        config.name,
    );

  const placeName =
    String(config.name || "").trim() ||
    "Destination";

  const regionName =
    config.regionName ||
    getRegionLabel(resolvedRegionSlug);

  const defaultWeather =
    createDefaultWeather({
      baseTemperature:
        config.defaultTemperature ?? 22,

      condition:
        config.defaultCondition ||
        "Partly cloudy",

      updated:
        config.weatherUpdated ||
        "Recently updated",
    });

  const defaultAdvisories =
    createDefaultAdvisories({
      placeName,

      risk:
        config.defaultRisk ||
        "Low",

      status:
        config.defaultStatus ||
        "Active",

      updatedAgo:
        config.advisoryUpdated ||
        "Recently updated",
    });

  const defaultReviews =
    createDefaultReviews({
      placeName,
    });

  return {
    ...DEFAULT_PLACE,
    ...config,

    slug:
      resolvedPlaceSlug ||
      normalizeSlug(placeName),

    name: placeName,

    regionSlug:
      resolvedRegionSlug,

    regionName,

    hero: mergeHero(
      DEFAULT_PLACE.hero,
      config.hero,
    ),

    overview: mergeOverview(
      DEFAULT_PLACE.overview,
      config.overview,
    ),

    weather:
      config.weather ||
      defaultWeather,

    advisories:
      config.advisories?.length
        ? config.advisories
        : defaultAdvisories,

    reviews:
      config.reviews?.length
        ? config.reviews
        : defaultReviews,

    placesToVisit:
      Array.isArray(config.placesToVisit)
        ? config.placesToVisit
        : [],
  };
}