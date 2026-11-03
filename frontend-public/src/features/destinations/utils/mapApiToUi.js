export function mapPlaceToCard(place) {
  if (!place) return null;
  return {
    id: place._id || place.id,
    name: place.name,
    region: place.regionName,
    regionSlug: place.regionSlug,
    slug: place.slug,
    image: place.hero?.image || "",
    temperature: place.weather?.baseTemperature != null
      ? `${place.weather.baseTemperature}°C`
      : "-",
    civicStatus: "Normal",
    risk: place.hero?.risk || "Unknown",
    roadStatus: place.hero?.roadAccess || "Normal",
    updatedAgo: place.hero?.updatedAgo || "Recently updated",
    desc:
      place.hero?.summary ||
      place.overview?.paragraphs?.[0] ||
      `Explore ${place.name}.`,
  };
}

export function mapRegionToExplore(region) {
  if (!region) return null;
  const images = [
    ...(region.heroImages || []),
    region.heroImage,
  ].filter(Boolean);

  while (images.length < 3) images.push(images[0] || "");

  return {
    id: region.slug,
    name: region.name,
    slug: region.slug,
    intro: region.about || region.tagline || "",
    details: [
      { label: "Tagline", value: region.tagline || "-" },
      { label: "Route status", value: "Check local advisories before travel" },
      { label: "Vibe", value: "Explore this region" },
      { label: "Best time", value: "Seasonal - see place pages" },
    ],
    images: images.slice(0, 3),
  };
}

export function buildRegionPageModel(region, places = []) {
  if (!region) return null;
  const cards = places.map(mapPlaceToCard).filter(Boolean);

  return {
    name: region.name,
    tagline: region.tagline || "",
    heroImage: region.heroImage || cards[0]?.image || "",
    heroImages:
      region.heroImages?.length > 0
        ? region.heroImages
        : [region.heroImage].filter(Boolean),
    about: region.about || "",
    history: region.history || null,
    cultural: region.cultural || null,
    social: region.social || null,
    festivals: region.festivals || null,
    places: cards,
    attractions: region.attractions || [],
    faqs: region.faqs || [],
  };
}

export function mapPlaceToDetails(place) {
  if (!place) return null;
  return {
    ...place,
    id: place._id || place.id,
    hero: {
      category: place.hero?.category || "Destination",
      risk: place.hero?.risk || "Low Risk",
      roadAccess: place.hero?.roadAccess || "Normal",
      summary: place.hero?.summary || "",
      updatedAgo: place.hero?.updatedAgo || "Recently updated",
      image: place.hero?.image || "",
    },
    overview: {
      label: place.overview?.label || "Local identity",
      paragraphs: place.overview?.paragraphs || [],
      image: place.overview?.image || place.hero?.image || "",
      expandedContent: place.overview?.expandedContent || {},
    },
    weather: place.weather || null,
    advisories: place.advisories || [],
    reviews: place.reviews || [],
    placesToVisit: place.placesToVisit || [],
  };
}