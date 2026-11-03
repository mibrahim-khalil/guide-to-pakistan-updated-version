import api from '../../../shared/lib/axios';
export const productsApi = {
  list: async (params = {}) => (await api.get('/products', { params })).data.data.map(p => ({...p, id: p._id})),
  getById: async (id) => (await api.get('/products/' + id)).data.data,
  create: async (payload) => (await api.post('/products', payload)).data.data,
  update: async (id, payload) => (await api.put('/products/' + id, payload)).data.data,
  remove: async (id) => await api.delete('/products/' + id)
};
