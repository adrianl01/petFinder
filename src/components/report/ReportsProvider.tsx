'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getMyReports } from '@/src/lib/api/reports';
import { useAuth } from '../auth/AuthProvider';
import { ReportResponse } from '@/src/types/report';

interface ReportsContextType {
  reports: ReportResponse[];
  loading: boolean;
  refreshReports: () => Promise<void>;
}

const ReportsContext = createContext<ReportsContextType | null>(null);

export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [loading, setLoading] = useState(true);

  async function refreshReports() {
    if (!token) {
      setReports([]);
      return;
    }

    setLoading(true);

    try {
      const data = await getMyReports(token);

      setReports(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshReports();
  }, [token]);

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        refreshReports
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useMyReports() {
  const context = useContext(ReportsContext);

  if (!context) {
    throw new Error('useReports must be used inside ReportsProvider');
  }

  return context;
}
