const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'

function parseRiskToStatus(riskString) {
  if (!riskString) return 'unknown'
  const r = String(riskString).toLowerCase()
  if (r.includes('low') || r.includes('clear')) return 'low'
  if (r.includes('moderate')) return 'moderate'
  if (r.includes('high')) return 'high'
  if (r.includes('not safe') || r.includes('critical') || r.includes('closed')) return 'critical'
  return 'unknown'
}

export async function getLiveRouteInfo({ origin, destination, message } = {}) {
  const res = await fetch(`${API_BASE_URL}/route-info/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      origin: origin || undefined,
      destination: destination || undefined,
      message: message || undefined,
      query_type: 'all',
    }),
  })

  let json = null
  try {
    json = await res.json()
  } catch {
    throw new Error('Invalid response from travel service.')
  }

  if (!res.ok || json?.success === false) {
    throw new Error(json?.message || 'Failed to fetch live route information.')
  }

  return json?.data ?? json
}

export async function getTravelUpdatesPageData() {
  try {
    const [placesRes, routesRes, advisoriesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/places?status=published`),
      fetch(`${API_BASE_URL}/route-conditions?isPublished=true`),
      fetch(`${API_BASE_URL}/advisories?isPublished=true&activeOnly=true`),
    ])

    const placesJson = await placesRes.json()
    const routesJson = await routesRes.json()
    const advisoriesJson = await advisoriesRes.json()

    const places = placesJson?.data || []
    const routeRows = routesJson?.data || []
    const advisoryRows = advisoriesJson?.data || []

    const destinations = places.map((p) => ({
      id: p._id,
      name: p.name,
      slug: p.slug,
      is_active: p.status === 'published',
      status: parseRiskToStatus(p.hero?.risk),
      image: p.hero?.image || null,
      regionName: p.regionName,
      summary: p.hero?.summary || '',
    }))

    const routes = routeRows.map((r) => ({
      id: r._id,
      name: r.name,
      slug: r.slug,
      status: r.status === 'clear' ? 'low' : r.status,
      cause: r.cause || '',
      updated_at: r.updatedAt || r.createdAt,
    }))

    const advisories = advisoryRows.map((a) => ({
      id: a._id,
      title: a.title,
      summary: a.summary,
      severity: a.severity,
      published_at: a.createdAt,
      valid_until: a.validUntil,
      is_published: a.isPublished,
    }))

    return {
      last_refreshed_at: new Date().toISOString(),
      destinations,
      routes,
      advisories,
      latest_report: null,
    }
  } catch (error) {
    console.error('Failed to fetch page data:', error)
    return {
      last_refreshed_at: new Date().toISOString(),
      destinations: [],
      routes: [],
      advisories: [],
      latest_report: null,
    }
  }
}

export async function getDestinationDetailBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/places`)
    const json = await res.json()
    const place = (json?.data || []).find((p) => p.slug === slug)
    if (!place) return null

    return {
      destination: {
        id: place._id,
        name: place.name,
        slug: place.slug,
        status: parseRiskToStatus(place.hero?.risk),
        image: place.hero?.image,
        summary: place.hero?.summary,
      },
      weather: place.weather || null,
      active_advisories: [],
      latest_field_updates: [],
      last_refreshed_at: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export async function getRouteDetailBySlug() {
  return null
}
export async function getPublishedAdvisories() {
  const data = await getTravelUpdatesPageData()
  return data.advisories || []
}
export async function getAdvisoryById() {
  return null
}
export async function getReports() {
  return { total: 0, items: [] }
}
export async function getReportById() {
  return null
}