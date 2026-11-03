import api from '../../../shared/lib/axios';

export const storiesApi = {
  async list({ q = '', category = 'all', status = 'all' } = {}) {
    const res = await api.get('/stories', { params: { q, category, status } });
    return (res.data?.data || []).map((item) => ({
      ...item,
      id: item._id || item.id,
    }));
  },

  async getById(id) {
    const res = await api.get('/stories');
    const item = (res.data?.data || []).find((s) => s._id === id || s.id === id);
    if (!item) return null;
    return { ...item, id: item._id || item.id };
  },

  async create(payload) {
    const res = await api.post('/stories', payload);
    const item = res.data?.data;
    return { ...item, id: item._id || item.id };
  },

  async update(id, payload) {
    const res = await api.put(`/stories/${id}`, payload);
    const item = res.data?.data;
    return { ...item, id: item._id || item.id };
  },

  async remove(id) {
    await api.delete(`/stories/${id}`);
    return true;
  },
};