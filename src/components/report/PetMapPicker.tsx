'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocateFixed, MapPin } from 'lucide-react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Props {
  onLocationSelect?: (coords: Coordinates) => void;
}

export default function PetMapPicker({ onLocationSelect }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<mapboxgl.Map | null>(null);

  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const [coords, setCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-58.3816, -34.6037],
      zoom: 13
    });

    mapRef.current = map;

    navigator.geolocation.getCurrentPosition((position) => {
      const lng = position.coords.longitude;

      const lat = position.coords.latitude;

      map.flyTo({
        center: [lng, lat],
        zoom: 15
      });
    });

    map.on('click', (e) => {
      const selected = {
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat
      };

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new mapboxgl.Marker({
        color: '#f97316'
      })
        .setLngLat([selected.longitude, selected.latitude])
        .addTo(map);

      setCoords(selected);

      onLocationSelect?.(selected);
    });

    return () => {
      map.remove();
    };
  }, [onLocationSelect]);

  const centerOnUser = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lng = position.coords.longitude;

      const lat = position.coords.latitude;

      mapRef.current?.flyTo({
        center: [lng, lat],
        zoom: 16
      });
    });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
      <div className="relative">
        <div ref={mapContainerRef} className="h-64 w-full" />

        <button type="button" onClick={centerOnUser} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg">
          <LocateFixed size={18} />
        </button>
      </div>

      <div className="border-t border-zinc-200 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-orange-100 p-2">
            <MapPin size={18} className="text-orange-600" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Selected location</p>

            {coords ? (
              <p className="mt-1 font-semibold text-zinc-900">
                {coords.latitude.toFixed(6)}, {coords.longitude.toFixed(6)}
              </p>
            ) : (
              <p className="mt-1 text-sm text-zinc-500">Tap the map to mark where the pet was seen.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
