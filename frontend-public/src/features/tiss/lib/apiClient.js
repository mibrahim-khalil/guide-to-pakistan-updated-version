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

/* Normalize a report doc from the API for UI use */
function normalizeReport(r) {
  if (!r) return null
  return {
    ...r,
    id: r._id || r.id,
    week_start: r.weekStartDate,
    week_end: r.weekEndDate,
    published_at: r.updatedAt || r.createdAt,
    overview_snippet: r.story?.text
      ? r.story.text.length > 180
        ? r.story.text.slice(0, 180) + '…'
        : r.story.text
      : '',
  }
}

/* ── Live Route Scraper API (Node :5000 → Python :8000) ─────────────── */
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

/* ── Weekly Reports ─────────────────────────────────────────────────── */
export async function getLatestReport() {
  try {
    const res = await fetch(`${API_BASE_URL}/reports/latest`)
    const json = await res.json()
    return normalizeReport(json?.data)
  } catch (error) {
    console.error('Failed to fetch latest report:', error)
    return null
  }
}

export async function getReportById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/reports/${id}`)
    const json = await res.json()
    return normalizeReport(json?.data)
  } catch (error) {
    console.error('Failed to fetch report by ID:', error)
    return null
  }
}

export async function getReports({ limit = 10, offset = 0 } = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}/reports?status=published`)
    const json = await res.json()
    const items = (json?.data || []).map(normalizeReport)
    return { total: items.length, items: items.slice(offset, offset + limit), limit, offset }
  } catch (error) {
    console.error('Failed to fetch reports:', error)
    return { total: 0, items: [], limit, offset }
  }
}

/* ── TISS main page data (REAL DB) ─────────────────────────────────── */
export async function getTravelUpdatesPageData() {
  try {
    const [placesRes, routesRes, advisoriesRes, latestReport] = await Promise.all([
      fetch(`${API_BASE_URL}/places?status=published`),
      fetch(`${API_BASE_URL}/route-conditions?isPublished=true`),
      fetch(`${API_BASE_URL}/advisories?isPublished=true&activeOnly=true`),
      getLatestReport(),
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
      latest_report: latestReport,
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

/* ── Destination detail ─────────────────────────────────────────────── */
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

/* ── Stubs kept for compatibility ──────────────────────────────────── */
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