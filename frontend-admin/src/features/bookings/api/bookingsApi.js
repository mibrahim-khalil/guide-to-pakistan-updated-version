import api from '../../../shared/lib/axios';

export const bookingsApi = {
  async list({ q = '', status = 'all', paymentStatus = 'all' } = {}) {
    const res = await api.get('/bookings', { params: { q, status, paymentStatus } });
    return (res.data?.data || []).map((item) => ({
      ...item,
      id: item._id || item.id,
    }));
  },

  async getById(id) {
    const res = await api.get(`/bookings/${id}`);
    const item = res.data?.data;
    return item ? { ...item, id: item._id || item.id } : null;
  },

  async updateStatus(id, { status, paymentStatus }) {
    const res = await api.put(`/bookings/${id}`, { status, paymentStatus });
    const item = res.data?.data;
    return item ? { ...item, id: item._id || item.id } : null;
  },

  async remove(id) {
    await api.delete(`/bookings/${id}`);
    return true;
  },
};
