import { useEffect, useState } from 'react';
import { publicStoriesApi } from '../api/publicStoriesApi';

export function useStoriesList(params = {}) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    publicStoriesApi.getStories(params)
      .then((data) => {
        if (alive) setStories(data);
      })
      .catch(() => {
        if (alive) setStories([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, [JSON.stringify(params)]);

  return { stories, loading };
}