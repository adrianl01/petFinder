'use client';

import { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';

interface Props {
  onFileSelect: (file: File | null) => void;
}

export default function ImageUploader({ onFileSelect }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    onFileSelect(file);

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <label className="relative flex h-56 cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-orange-300 bg-orange-50">
      <input type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={handleFileChange} />

      {previewUrl ? (
        <>
          <img src={previewUrl} alt="Preview mascota" className="h-full w-full object-cover" />

          <div className="absolute inset-0 flex items-end justify-center bg-black/20 opacity-0 transition hover:opacity-100">
            <div className="mb-4 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-800">Change image</div>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <Camera size={32} className="text-orange-500" />

          <p className="font-semibold text-orange-600">Upload an image of your pet</p>

          <span className="text-sm text-zinc-500">JPG or PNG of 5 MB max</span>
        </div>
      )}
    </label>
  );
}
