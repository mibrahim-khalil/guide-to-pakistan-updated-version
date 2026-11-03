import api from '../../../shared/lib/api';

export const publicStoriesApi = {
  async getStories(params = {}) {
    const res = await api.get('/stories', { params: { status: 'published', ...params } });
    return res.data?.data || [];
  },

  async getStoryBySlug(slug) {
    const res = await api.get('/stories/' + encodeURIComponent(slug));
    return res.data?.data || null;
  }
};