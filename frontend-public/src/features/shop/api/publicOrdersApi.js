import api from '../../../shared/lib/api';

export const publicOrdersApi = {
  create: async (payload) => {
    const res = await api.post('/orders', payload);
    return res.data.data;
  }
};