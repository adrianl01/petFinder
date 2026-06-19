"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  ArrowLeft,
  Check,
  Crosshair,
  LocateFixed,
  MapPin,
  Minus,
  PawPrint,
  Plus,
  Trash2,
} from "lucide-react";

interface PetMapProps {
  initialCoords?: {
    lat: number;
    lng: number;
  };
  onConfirm?: (coords: {
    lat: number;
    lng: number;
  }) => void;
  onBack?: () => void;
}

const DEFAULT_CENTER: [number, number] = [-58.3816, -34.6037];

export default function PetMap({
  initialCoords,
  onConfirm,
  onBack,
}: PetMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const [zoom, setZoom] = useState(13);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      "YOUR_MAPBOX_PUBLIC_TOKEN";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: initialCoords
        ? [initialCoords.lng, initialCoords.lat]
        : DEFAULT_CENTER,
      zoom: 13,
    });

    mapRef.current = map;

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      "top-right"
    );

    map.on("load", () => {
      if (initialCoords) {
        placeMarker(
          initialCoords.lng,
          initialCoords.lat
        );
      }
    });

    map.on("move", () => {
      setZoom(
        Number(map.getZoom().toFixed(0))
      );
    });

    map.on("click", (e) => {
      placeMarker(
        e.lngLat.lng,
        e.lngLat.lat
      );
    });

    return () => {
      map.remove();
    };
  }, []);

  const placeMarker = (
    lng: number,
    lat: number
  ) => {
    if (!mapRef.current) return;

    if (markerRef.current) {
      markerRef.current.remove();
    }

    const el = document.createElement("div");

    el.innerHTML = `
      <div style="
        width:40px;
        height:40px;
        background:#E8521A;
        border-radius:999px;
        display:flex;
        align-items:center;
        justify-content:center;
        border:3px solid white;
        box-shadow:0 8px 20px rgba(232,82,26,.35);
      ">
        🐾
      </div>
    `;

    markerRef.current = new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    setSelectedCoords({
      lat,
      lng,
    });
  };

  const handleLocateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };

        mapRef.current?.flyTo({
          center: [coords.lng, coords.lat],
          zoom: 16,
        });

        placeMarker(
          coords.lng,
          coords.lat
        );
      }
    );
  };

  const handleClear = () => {
    markerRef.current?.remove();
    markerRef.current = null;
    setSelectedCoords(null);
  };

  const handleConfirm = () => {
    if (!selectedCoords) return;
    onConfirm?.(selectedCoords);
  };

  return (
    <main className="min-h-screen bg-[#FBF9F7]">
      <div className="mx-auto max-w-md overflow-hidden rounded-t-[32px] bg-[#FBF9F7]">
        <header className="flex items-center gap-3 border-b border-black/10 bg-white px-5 py-5">
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10"
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <h1 className="text-[17px] font-extrabold text-zinc-900">
              Ubicar mascota
            </h1>

            <p className="text-xs text-zinc-500">
              Touch the map to mark a location
            </p>
          </div>
        </header>

        <div className="border-b border-[#FAD4BC] bg-[#FDF0E8] px-5 py-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#712B13]">
            <Crosshair size={16} />
            Touch the map to mark the last location sight
          </div>
        </div>

        <div className="relative h-[380px]">
          <div
            ref={mapContainerRef}
            className="h-full w-full"
          />

          <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/70 px-3 py-1 text-xs font-bold text-white">
            Zoom {zoom}
          </div>

          {selectedCoords && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-bold text-white">
              <MapPin size={14} />
              {selectedCoords.lat.toFixed(
                5
              )}
              ,{" "}
              {selectedCoords.lng.toFixed(
                5
              )}
            </div>
          )}

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <button
              onClick={() =>
                mapRef.current?.zoomIn()
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white"
            >
              <Plus size={16} />
            </button>

            <button
              onClick={() =>
                mapRef.current?.zoomOut()
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white"
            >
              <Minus size={16} />
            </button>

            <button
              onClick={handleLocateMe}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white"
            >
              <LocateFixed size={16} />
            </button>
          </div>
        </div>

        <section className="bg-white p-5">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-[#FBF9F7] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF0E8]">
              <MapPin
                size={18}
                className="text-[#E8521A]"
              />
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">
                Selected Coords
              </p>

              {selectedCoords ? (
                <>
                  <p className="font-bold text-zinc-900">
                    {selectedCoords.lat.toFixed(
                      5
                    )}
                    ,{" "}
                    {selectedCoords.lng.toFixed(
                      5
                    )}
                  </p>

                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#E0F5EE] px-3 py-1 text-xs font-bold text-[#085041]">
                    <Check size={12} />
                    Location selected
                  </span>
                </>
              ) : (
                <p className="italic text-zinc-500">
                  Unselected
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="flex items-center justify-center rounded-2xl border border-black/10 px-4"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={handleConfirm}
              disabled={!selectedCoords}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#E8521A] py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PawPrint size={18} />
              Confirm location
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}