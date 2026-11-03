import api from '../../../shared/lib/axios'

export const routeConditionsApi = {
  async list({ isPublished } = {}) {
    const res = await api.get('/route-conditions', {
      params: typeof isPublished === 'boolean' ? { isPublished } : {},
    })
    return (res.data?.data || []).map((item) => ({
      ...item,
      id: item._id || item.id,
    }))
  },

  async create(payload) {
    const res = await api.post('/route-conditions', payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async update(id, payload) {
    const res = await api.put('/route-conditions/' + id, payload)
    const item = res.data?.data
    return { ...item, id: item._id || item.id }
  },

  async remove(id) {
    await api.delete('/route-conditions/' + id)
    return true
  },
}