import api from '../../../shared/lib/axios'

export const destinationsApi = {
  async list({ q = '', status = 'all' } = {}) {
    const res = await api.get('/places', {
      params: { q, status },
    })
    // normalize _id -> id for UI
    return (res.data?.data || []).map((item) => ({
      ...item,
      id: item._id || item.id,
    }))
  },

  async getById(id) {
    const res = await api.get('/places')
    const item = (res.data?.data || []).find(
      (p) => p._id === id || p.id === id
    )
    if (!item) return null
    return { ...item, id: item._id || item.id }
  },

  async create(payload) {
    const res = await api.post('/places', payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async update(id, payload) {
    const res = await api.put('/places/' + id, payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async remove(id) {
    await api.delete('/places/' + id)
    return true
  },
}
