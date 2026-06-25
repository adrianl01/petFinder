'use client';

import { useEffect, useMemo, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ReportResponse } from '@/src/types/report';
import MapView from '../map/MapView';
import BottomNavigation from '../layout/BottomNavigation';
import { getReportsNearMe } from '@/src/lib/api/reports';
import { getUserLocation, saveUserLocation } from '@/src/lib/storage/location';

export default function MapScreen() {
  const location = getUserLocation();

  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchReports() {
      if (!location) {
        setIsOpen(true);
        return;
      }

      const data = await getReportsNearMe();
      setReports(data);
    }

    fetchReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => report.isActive);
  }, [reports]);

  return (
    <main className="relative h-screen overflow-hidden bg-white pb-16">
      {location && <MapView reports={filteredReports} />}
      <BottomNavigation />
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-zinc-900">Location Required</h2>

            <p className="mt-3 text-sm text-zinc-600">To see pet reports near you, please enable location access. This helps us show lost and found pets in your area.</p>

            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 rounded-xl bg-orange-500 px-4 py-3 font-medium text-white"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    (l) => {
                      saveUserLocation({ latitude: l.coords.latitude, longitude: l.coords.longitude });
                      window.location.reload();
                    },
                    (err) => console.error(err)
                  );
                }}
              >
                Enable Location
              </button>

              <button className="flex-1 rounded-xl border border-zinc-200 px-4 py-3 font-medium text-zinc-700" onClick={() => setIsOpen(false)}>
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
