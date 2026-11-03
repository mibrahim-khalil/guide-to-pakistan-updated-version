import api from '../../../shared/lib/axios';

export const usersApi = {
  list: async (params = {}) => (await api.get('/users', { params })).data.data,
  updateRole: async (id, role) => (await api.put(`/users/${id}/role`, { role })).data.data,
  remove: async (id) => await api.delete(`/users/${id}`),
};
