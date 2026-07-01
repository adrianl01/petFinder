'use client';

import { LoaderCircle } from 'lucide-react';

interface LoadingOverlayProps {
  text?: string;
}

export default function LoadingOverlay({
  text = 'Loading...'
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-xl">
        <LoaderCircle className="animate-spin" size={40} />
        <p className="font-medium text-zinc-700">{text}</p>
      </div>
    </div>
  );
}