import api from '../../../shared/lib/api';
export const publicShopApi = {
  getProducts: async (params = {}) => (await api.get('/products', { params: { status: 'active', ...params } })).data.data || [],
  validateCoupon: async (code) => (await api.get('/coupons/validate/' + code)).data.data
};
