import api from '../../../shared/lib/axios'

export const toursApi = {
  async list({ q = '', status = 'all', featured } = {}) {
    const res = await api.get('/tours', {
      params: { q, status, featured },
    })
    return (res.data?.data || []).map((item) => ({
      ...item,
      id: item._id || item.id,
    }))
  },

  async getById(id) {
    // list then find (or use slug endpoint if you pass slug)
    const res = await api.get('/tours')
    const item = (res.data?.data || []).find((t) => t._id === id || t.id === id)
    if (!item) return null
    return { ...item, id: item._id || item.id }
  },

  async getBySlug(slug) {
    const res = await api.get('/tours/' + encodeURIComponent(slug))
    const item = res.data?.data
    return item ? { ...item, id: item._id || item.id } : null
  },

  async create(payload) {
    const res = await api.post('/tours', payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async update(id, payload) {
    const res = await api.put('/tours/' + id, payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async remove(id) {
    await api.delete('/tours/' + id)
    return true
  },
}
