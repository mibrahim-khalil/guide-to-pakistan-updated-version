import api from '../lib/api';

export const publicInquiriesApi = {
  create: async (payload) => {
    const res = await api.post('/inquiries', payload);
    return res.data.data;
  }
};
