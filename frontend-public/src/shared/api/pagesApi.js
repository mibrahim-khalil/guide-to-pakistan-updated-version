import api from '../lib/api';

export const publicPagesApi = {
  get: async (name) => {
    const res = await api.get(`/pages/${name}`);
    return res.data.data?.content || {};
  }
};
