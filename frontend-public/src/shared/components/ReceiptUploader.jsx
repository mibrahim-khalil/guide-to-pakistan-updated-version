import { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadCloud, Loader2, X, CheckCircle } from 'lucide-react';
import api from '../lib/api'; // Verify this route config to point correctly to your public API client

export default function ReceiptUploader({ value, onChange, label = "Payment Receipt/Proof screenshot" }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Please upload an image file (PNG, JPG)');

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/media/upload-receipt', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(res.data.data.url);
      toast.success('Receipt uploaded successfully!');
    } catch (err) {
      toast.error('Failed to upload receipt. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-slate-700 block">{label}</label>
      {value ? (
        <div className="relative rounded-2xl border-2 border-emerald-400 overflow-hidden bg-emerald-50 max-w-sm">
          <img src={value} alt="Transfer Proof" className="w-full h-44 object-cover" />
          <button 
            type="button" 
            onClick={() => onChange('')} 
            className="absolute top-2.5 right-2.5 bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-rose-700 transition"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-2.5 left-2.5 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
            <CheckCircle size={14} /> Receipt Attached
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition duration-150 hover:border-amber-500">
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 text-amber-600 animate-spin mb-2" />
              <p className="text-xs text-slate-600 font-bold">Uploading to secure media library...</p>
            </>
          ) : (
            <>
              <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-sm text-slate-700 font-bold"><span className="text-amber-600">Click to upload</span> receipt screenshot</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase">PNG, JPG, JPEG, WEBP (Max 5MB)</p>
            </>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleFile} disabled={uploading} />
        </label>
      )}
    </div>
  );
}