import api from '../../../shared/lib/axios'

export const advisoriesApi = {
  async list({ isPublished } = {}) {
    const res = await api.get('/advisories', {
      params: typeof isPublished === 'boolean' ? { isPublished } : {},
    })
    return (res.data?.data || []).map((item) => ({
      ...item,
      id: item._id || item.id,
    }))
  },

  async create(payload) {
    const res = await api.post('/advisories', payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async update(id, payload) {
    const res = await api.put('/advisories/' + id, payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async remove(id) {
    await api.delete('/advisories/' + id)
    return true
  },
}