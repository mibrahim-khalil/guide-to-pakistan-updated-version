import api from '../../../shared/lib/axios';

export const mediaApi = {
  list: async (params = {}) => (await api.get('/media', { params })).data.data,
  upload: async (file, folder = 'general') => {
    const fd = new FormData();
    fd.append('image', file);
    fd.append('folder', folder);
    const res = await api.post('/media/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  },
  remove: async (id) => await api.delete(`/media/${id}`),
};
