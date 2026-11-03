import { useState } from 'react';
import { Image as ImageIcon, Loader2, X, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

export default function ImageUploader({ label, value, onChange, hint }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return toast.error('Please select a valid image file');
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.data.url);
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = ''; // reset input
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      {hint && <p className="text-xs text-gray-500 mb-2">{hint}</p>}

      {value ? (
        <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50 group">
          <img src={value} alt="Uploaded preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
              title="Remove image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition hover:border-emerald-400 group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
                <p className="text-sm text-gray-500 font-medium">Uploading to Cloudinary...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 text-gray-400 mb-3 group-hover:text-emerald-500 transition" />
                <p className="mb-1 text-sm text-gray-700"><span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or WEBP (MAX. 5MB)</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}
    </div>
  );
}
