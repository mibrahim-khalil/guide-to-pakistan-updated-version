import { PLACE_REGISTRY } from "./placeRegistry";

import {
  makePlaceKey,
  resolvePlaceSlug,
  resolveRegionSlug,
} from "../helpers/slugHelpers";

/* =========================================================
   NORMALIZE ONE PLACE
========================================================= */

function normalizePlace(place) {
  if (!place) {
    return null;
  }

  const regionSlug = resolveRegionSlug(
    place.regionSlug,
  );

  const placeSlug = resolvePlaceSlug(
    place.slug,
  );

  if (!regionSlug || !placeSlug) {
    return null;
  }

  return {
    ...place,
    regionSlug,
    slug: placeSlug,
  };
}

/* =========================================================
   NORMALIZED REGISTRY
========================================================= */

const NORMALIZED_PLACE_REGISTRY =
  PLACE_REGISTRY.map(normalizePlace).filter(
    Boolean,
  );

/* =========================================================
   CREATE AUTOMATIC PLACES TO VISIT

   When a place does not have custom placesToVisit data,
   the other destinations from the same region are used.
========================================================= */

function createRegionalPlacesToVisit(
  currentPlace,
) {
  if (!currentPlace) {
    return [];
  }

  const customPlaces =
    currentPlace.placesToVisit;

  if (
    Array.isArray(customPlaces) &&
    customPlaces.length > 0
  ) {
    return customPlaces;
  }

  return NORMALIZED_PLACE_REGISTRY.filter(
    (candidatePlace) =>
      candidatePlace.regionSlug ===
        currentPlace.regionSlug &&
      candidatePlace.slug !==
        currentPlace.slug,
  ).map((candidatePlace) => ({
    id: candidatePlace.slug,

    slug: candidatePlace.slug,

    name: candidatePlace.name,

    region:
      candidatePlace.regionName,

    image:
      candidatePlace.hero?.image,

    description:
      candidatePlace.hero?.summary ||
      `Explore ${candidatePlace.name} and discover its local attractions, culture, and natural surroundings.`,

    path: `/destinations/${candidatePlace.regionSlug}/${candidatePlace.slug}`,
  }));
}

/* =========================================================
   FINAL ENRICHED REGISTRY
========================================================= */

const ENRICHED_PLACE_REGISTRY =
  NORMALIZED_PLACE_REGISTRY.map(
    (place) => ({
      ...place,

      placesToVisit:
        createRegionalPlacesToVisit(place),
    }),
  );

/* =========================================================
   CREATE FAST LOOKUP MAP
========================================================= */

const PLACE_LOOKUP =
  ENRICHED_PLACE_REGISTRY.reduce(
    (lookup, place) => {
      const placeKey = makePlaceKey(
        place.regionSlug,
        place.slug,
      );

      lookup[placeKey] = place;

      return lookup;
    },
    {},
  );

/* =========================================================
   CREATE NESTED PLACE DETAILS OBJECT

   Supports:
   PLACE_DETAILS["punjab"]["murree"]
========================================================= */

export const PLACE_DETAILS =
  ENRICHED_PLACE_REGISTRY.reduce(
    (details, place) => {
      if (!details[place.regionSlug]) {
        details[place.regionSlug] = {};
      }

      details[place.regionSlug][
        place.slug
      ] = place;

      return details;
    },
    {},
  );

/* =========================================================
   GET ONE PLACE
========================================================= */

export function getPlaceDetails(
  regionSlug = "",
  placeSlug = "",
) {
  const resolvedRegionSlug =
    resolveRegionSlug(regionSlug);

  const resolvedPlaceSlug =
    resolvePlaceSlug(placeSlug);

  const placeKey = makePlaceKey(
    resolvedRegionSlug,
    resolvedPlaceSlug,
  );

  return PLACE_LOOKUP[placeKey] || null;
}

/* =========================================================
   GET ALL PLACES
========================================================= */

export function getAllPlaces() {
  return [...ENRICHED_PLACE_REGISTRY];
}

/* =========================================================
   GET PLACES BY REGION
========================================================= */

export function getPlacesByRegion(
  regionSlug = "",
) {
  const resolvedRegionSlug =
    resolveRegionSlug(regionSlug);

  return ENRICHED_PLACE_REGISTRY.filter(
    (place) =>
      place.regionSlug ===
      resolvedRegionSlug,
  );
}

/* =========================================================
   CHECK IF PLACE EXISTS
========================================================= */

export function hasPlaceDetails(
  regionSlug = "",
  placeSlug = "",
) {
  return Boolean(
    getPlaceDetails(
      regionSlug,
      placeSlug,
    ),
  );
}

/* =========================================================
   GET PLACE BY SLUG ONLY
========================================================= */

export function getPlaceBySlug(
  placeSlug = "",
) {
  const resolvedPlaceSlug =
    resolvePlaceSlug(placeSlug);

  return (
    ENRICHED_PLACE_REGISTRY.find(
      (place) =>
        place.slug ===
        resolvedPlaceSlug,
    ) || null
  );
}

/* =========================================================
   GET REGISTERED REGIONS
========================================================= */

export function getRegisteredRegions() {
  return [
    ...new Set(
      ENRICHED_PLACE_REGISTRY.map(
        (place) => place.regionSlug,
      ),
    ),
  ];
}

/* =========================================================
   GET REGISTERED PLACE ROUTES
========================================================= */

export function getRegisteredPlaceRoutes() {
  return ENRICHED_PLACE_REGISTRY.map(
    (place) => ({
      regionSlug:
        place.regionSlug,

      placeSlug:
        place.slug,

      name:
        place.name,

      path: `/destinations/${place.regionSlug}/${place.slug}`,
    }),
  );
}