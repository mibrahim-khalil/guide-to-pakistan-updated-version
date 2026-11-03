import { useEffect, useState } from 'react';
import { BookOpen, Image as ImageIcon, Tag, User } from 'lucide-react';
import ImageUploader from '../../../shared/components/ImageUploader';

const CATEGORIES = [
  'Travel Guide',
  'Culture & Heritage',
  'Adventure',
  'Food & Dining',
  'Traveler Story',
];

const empty = {
  title: '',
  slug: '',
  subtitle: '',
  category: 'Travel Guide',
  author: 'GTP Editorial',
  readTime: '5 min read',
  coverImage: '',
  content: '',
  featured: false,
  status: 'published',
  tags: '',
};

export default function StoryForm({ initialValues, onSubmit, submitting }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...empty,
        ...initialValues,
        tags: Array.isArray(initialValues.tags) ? initialValues.tags.join(', ') : initialValues.tags || '',
      });
    }
  }, [initialValues]);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = String(form.tags || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      ...form,
      tags: tagArray,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 max-w-4xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Article Title *</label>
          <input
            required
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. Top 10 Hidden Gems in Hunza Valley"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle / Excerpt</label>
          <input
            value={form.subtitle}
            onChange={(e) => setField('subtitle', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="A short hook or summary displayed on the blog card..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Author Name</label>
            <input
              value={form.author}
              onChange={(e) => setField('author', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              placeholder="e.g. Amina Shah"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Read Time</label>
            <input
              value={form.readTime}
              onChange={(e) => setField('readTime', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              placeholder="e.g. 5 min read"
            />
          </div>
        </div>

        <div>
          <ImageUploader
            label="Cover Image *"
            hint="Upload a high quality featured cover photo for the article."
            value={form.coverImage}
            onChange={(url) => setField('coverImage', url)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Article Content *</label>
          <textarea
            required
            rows={12}
            value={form.content}
            onChange={(e) => setField('content', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
            placeholder="Write your article content here..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (Comma Separated)</label>
          <input
            value={form.tags}
            onChange={(e) => setField('tags', e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            placeholder="Hunza, Trekking, Photography, Food"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Status</label>
            <select
              value={form.status}
              onChange={(e) => setField('status', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none cursor-pointer"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => setField('featured', e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              Featured Article on Blog Header
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-sm font-bold shadow-md transition disabled:opacity-60"
        >
          {submitting ? 'Saving Article...' : 'Publish / Save Article'}
        </button>
      </div>
    </form>
  );
}