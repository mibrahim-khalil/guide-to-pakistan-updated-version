import api from "../../../shared/lib/api";

export const publicToursApi = {
  async getTours(params = {}) {
    const res = await api.get("/tours", { params: { status: "published", ...params } });
    return res.data?.data || [];
  },

  async getFeaturedTours() {
    const res = await api.get("/tours", { params: { status: "published", featured: "true" } });
    return res.data?.data || [];
  },

  async getTourBySlug(slug) {
    const res = await api.get("/tours/" + encodeURIComponent(slug));
    return res.data?.data || null;
  }
};