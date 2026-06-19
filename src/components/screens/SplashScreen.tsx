'use client';

import { useRouter } from 'next/navigation';

import { saveUserLocation } from '@/src/lib/storage/location';
import { PawPrint, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function SplashScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const activateLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        saveUserLocation(location);

        console.log('Ubicación guardada', location);

        setLoading(false);

        router.push('/feed');
      },
      (error) => {
        console.error(error);

        alert('No pudimos obtener tu ubicación.');

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-50/50 to-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-8">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 shadow-lg shadow-orange-500/20">
          <PawPrint className="h-12 w-12 text-white" />
        </div>

        <h1 className="text-center text-5xl font-black tracking-tight text-zinc-900">
          Pet<span className="text-orange-500">Finder</span>
        </h1>

        <p className="mt-5 max-w-xs text-center text-base leading-relaxed text-zinc-500">Encontrá y reportá mascotas perdidas cerca tuyo en segundos.</p>

        <div className="mt-12 flex w-full flex-col gap-3">
          <button
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-orange-500 font-semibold text-white transition hover:bg-orange-600"
            onClick={activateLocation}
            disabled={loading}
          >
            <MapPin size={20} />
            Activar mi ubicación
          </button>

          <button className="h-14 rounded-2xl border border-zinc-200 bg-white font-semibold text-zinc-700 transition hover:bg-zinc-50">Iniciar sesión</button>
        </div>

        <div className="mt-12 flex items-center gap-2">
          <div className="h-2 w-8 rounded-full bg-orange-500" />
          <div className="h-2 w-2 rounded-full bg-orange-200" />
          <div className="h-2 w-2 rounded-full bg-orange-200" />
        </div>
      </div>
    </main>
  );
}
