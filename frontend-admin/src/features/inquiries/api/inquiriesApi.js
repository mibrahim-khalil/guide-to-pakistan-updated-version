import api from '../../../shared/lib/axios';

export const inquiriesApi = {
  list: async (params = {}) => (await api.get('/inquiries', { params })).data.data,
  updateStatus: async (id, status) => (await api.put(`/inquiries/${id}`, { status })).data.data,
  remove: async (id) => await api.delete(`/inquiries/${id}`),
};
