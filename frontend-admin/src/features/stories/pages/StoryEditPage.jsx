import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import StoryForm from '../components/StoryForm';
import { storiesApi } from '../api/storiesApi';

export default function StoryEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    storiesApi
      .getById(id)
      .then((item) => {
        if (!item) {
          toast.error('Article not found');
          navigate('/stories');
          return;
        }
        setInitial(item);
      })
      .catch(() => {
        toast.error('Failed to load article');
        navigate('/stories');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const updated = await storiesApi.update(id, values);
      toast.success('Article updated!');
      setInitial(updated);
    } catch (e) {
      toast.error('Failed to update article');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-sm text-gray-500">Loading article...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
          <p className="text-sm text-gray-500 mt-1">{initial?.title}</p>
        </div>
        <Link to="/stories" className="text-sm text-gray-600 hover:text-gray-900">Back to list</Link>
      </div>
      <StoryForm initialValues={initial} onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}