import api from '../../../shared/lib/axios';

export const settingsApi = {
  get: async () => (await api.get('/settings')).data.data,
  update: async (payload) => (await api.put('/settings', payload)).data.data,
};
