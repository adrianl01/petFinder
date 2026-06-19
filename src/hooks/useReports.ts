import { useEffect, useState } from 'react';

import { getReportsNearMe } from '@/src/lib/api/reports';

export function useReports(lat?: number, lng?: number) {
  const [reports, setReports] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;

    getReportsNearMe()
      .then((reports) => setReports(reports as any[]))
      .finally(() => setLoading(false));
  }, [lat, lng]);

  return {
    reports,
    loading
  };
}
