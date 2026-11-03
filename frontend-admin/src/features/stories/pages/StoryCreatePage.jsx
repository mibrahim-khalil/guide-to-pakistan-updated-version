import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import StoryForm from '../components/StoryForm';
import { storiesApi } from '../api/storiesApi';

export default function StoryCreatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const created = await storiesApi.create(values);
      toast.success('Article published!');
      navigate(`/stories/${created.id}/edit`);
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to publish article');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Write New Article</h1>
          <p className="text-sm text-gray-500 mt-1">Publish travel guides, news, or blog stories.</p>
        </div>
        <Link to="/stories" className="text-sm text-gray-600 hover:text-gray-900">Back to list</Link>
      </div>
      <StoryForm onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}