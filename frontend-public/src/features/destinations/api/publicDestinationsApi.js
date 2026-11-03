import api from '../../../shared/lib/api'
import { resolveRegionSlug } from '../utils/regionSlug'
import {
  buildRegionPageModel,
  mapPlaceToDetails,
  mapRegionToExplore,
} from '../utils/mapApiToUi'

export const publicDestinationsApi = {
  async getRegions() {
    const res = await api.get('/regions')
    return res.data?.data || []
  },

  async getExploreRegions() {
    const regions = await this.getRegions()
    return regions.map(mapRegionToExplore).filter(Boolean)
  },

  async getRegionPage(regionSlugFromUrl) {
    const canonical = resolveRegionSlug(regionSlugFromUrl)

    // Try public slug first, then canonical
    let regionRes
    try {
      regionRes = await api.get('/regions/' + encodeURIComponent(regionSlugFromUrl))
    } catch {
      regionRes = await api.get('/regions/' + encodeURIComponent(canonical))
    }

    const region = regionRes.data?.data
    if (!region) return null

    const placesRes = await api.get('/places', {
      params: {
        region: resolveRegionSlug(region.slug || canonical),
        status: 'published',
      },
    })

    const places = placesRes.data?.data || []
    return buildRegionPageModel(region, places)
  },

  async getPlacesByRegion(regionSlugFromUrl) {
    const canonical = resolveRegionSlug(regionSlugFromUrl)
    const res = await api.get('/places', {
      params: { region: canonical, status: 'published' },
    })
    return res.data?.data || []
  },

  async getPlaceDetails(regionSlugFromUrl, placeSlug) {
    const canonical = resolveRegionSlug(regionSlugFromUrl)
    try {
      const res = await api.get(
        `/places/${encodeURIComponent(canonical)}/${encodeURIComponent(placeSlug)}`
      )
      return mapPlaceToDetails(res.data?.data)
    } catch {
      // fallback: list filter
      const all = await this.getPlacesByRegion(canonical)
      const found = all.find((p) => p.slug === placeSlug)
      return mapPlaceToDetails(found)
    }
  },

  async getFeaturedPlaces(limit = 12) {
    const res = await api.get('/places', { params: { status: 'published' } })
    const list = res.data?.data || []
    return list.slice(0, limit)
  },
}
