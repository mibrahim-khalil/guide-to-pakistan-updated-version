import api from '../../../shared/lib/axios';

export const pagesApi = {
  get: async (name) => (await api.get(`/pages/${name}`)).data.data,
  update: async (name, content) => (await api.put(`/pages/${name}`, content)).data.data,
};
