import { useEffect, useState } from "react";
import { publicToursApi } from "../api/publicToursApi";

export function useToursList(params = {}) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);

    publicToursApi.getTours(params)
      .then((data) => {
        if (alive) setTours(data);
      })
      .catch((err) => {
        if (alive) setError("Failed to load tour packages");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, [JSON.stringify(params)]);

  return { tours, loading, error };
}

export function useTourDetails(slug) {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setLoading(true);

    publicToursApi.getTourBySlug(slug)
      .then((data) => {
        if (alive) setTour(data);
      })
      .catch(() => {
        if (alive) setError("Tour package not found");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, [slug]);

  return { tour, loading, error };
}