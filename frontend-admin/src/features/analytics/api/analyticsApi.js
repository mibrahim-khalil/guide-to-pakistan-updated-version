import api from '../../../shared/lib/axios';

export const analyticsApi = {
  getStats: async () => (await api.get('/analytics/stats')).data.data,
};
