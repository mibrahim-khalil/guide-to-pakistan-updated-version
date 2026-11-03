import api from '../../../shared/lib/axios';

export const ordersApi = {
  list: async (params = {}) => {
    const res = await api.get('/orders', { params });
    return res.data.data;
  },
  getById: async (id) => {
    const res = await api.get('/orders/' + id);
    return res.data.data;
  },
  update: async (id, payload) => {
    const res = await api.put('/orders/' + id, payload);
    return res.data.data;
  },
  remove: async (id) => {
    return await api.delete('/orders/' + id);
  }
};