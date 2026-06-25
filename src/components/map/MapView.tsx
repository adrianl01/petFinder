'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ReportResponse } from '@/src/types/report';
import ReportMapModal from './ReportMapModal';
import ReportDetailsModal from '../report/reportDetailsModal';
import { LocateFixed } from 'lucide-react';
import { getUserLocation } from '@/src/lib/storage/location';

interface Props {
  reports: ReportResponse[];
}

let DEFAULT_CENTER: [number, number] = [-58.3816, -34.6037];

export default function MapView({ reports }: Props) {
  const location = getUserLocation();
  if (location) {
    DEFAULT_CENTER[0] = location.longitude;
    DEFAULT_CENTER[1] = location.latitude;
  }
  const [isLocated, setIsLocated] = useState(false);
  const [previewReport, setPreviewReport] = useState<ReportResponse | null>(null);
  const [detailsReport, setDetailsReport] = useState<ReportResponse | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const handleLocateUser = () => {
    if (!navigator.geolocation || !mapRef.current) return;

    setIsLocated(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        mapRef.current?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
          duration: 1500
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: DEFAULT_CENTER,
      zoom: 13
    });

    map.on('load', () => {
      map.on('dragstart', () => {
        setIsLocated(false);
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    reports
      .filter((report) => report.isActive)
      .forEach((report) => {
        const el = document.createElement('div');
        el.className = 'h-7 w-7 rounded-full border-2 border-white shadow-lg';
        el.style.backgroundColor = report.status === 'lost' ? '#DC2626' : '#16A34A';
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          setPreviewReport(report);
        });
        el.animate([{ transform: 'scale(0)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], {
          duration: 350,
          easing: 'ease-out'
        });
        const marker = new mapboxgl.Marker(el).setLngLat([report.location.longitude, report.location.latitude]).addTo(mapRef.current!);
        markersRef.current.push(marker);
      });

    mapRef.current?.on('load', () => {
      mapRef.current?.resize();
    });
  }, [reports]);

  return (
    <>
      <div ref={mapContainerRef} className="h-full w-full" />
      <button
        onClick={handleLocateUser}
        className={`absolute right-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg transition ${isLocated ? 'bg-orange-500 border-orange-500' : 'bg-white border-zinc-200'}`}
      >
        <LocateFixed size={20} className={isLocated ? 'text-white' : 'text-orange-500'} />
      </button>

      <ReportMapModal
        report={previewReport}
        onClose={() => setPreviewReport(null)}
        onOpenDetails={(report) => {
          setPreviewReport(null);

          setTimeout(() => {
            setDetailsReport(report);
          }, 150);
        }}
      />

      <ReportDetailsModal report={detailsReport} onClose={() => setDetailsReport(null)} />
    </>
  );
}
