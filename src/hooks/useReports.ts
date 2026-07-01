import { useEffect, useState } from 'react';

import { getReportsNearMe } from '@/src/lib/api/reports';
import { ReportResponse } from '../types/report';

export function useReports(lat?: number, lng?: number) {
  const [reports, setReports] = useState<ReportResponse[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;

    getReportsNearMe()
      .then((reports) => setReports(reports))
      .finally(() => setLoading(false));
  }, [lat, lng]);

  return {
    reports,
    loading
  };
}
