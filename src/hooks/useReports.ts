import { useEffect, useState } from "react";

import { getReportsNear } from "@/src/lib/api/reports";

export function useReports(
  lat?: number,
  lng?: number
) {
  const [reports, setReports] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (
      lat === undefined ||
      lng === undefined
    )
      return;

    getReportsNear(
      lat,
      lng
    )
      .then((reports) => setReports(reports as any[]))
      .finally(() =>
        setLoading(false)
      );
  }, [lat, lng]);

  return {
    reports,
    loading,
  };
}