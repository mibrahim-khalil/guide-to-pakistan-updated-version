import api from '../../../shared/lib/api';

export const publicBookingsApi = {
  async createBooking(payload) {
    const res = await api.post('/bookings', payload);
    return res.data?.data;
  },
};