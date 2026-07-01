'use client';

import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { MapPin } from 'lucide-react';
import PageHeader from '../../layout/PageHeader';
import { TargetPage } from '../../screens/ProfileScreen';
import { useMyReports, ReportsProvider } from '../../report/ReportsProvider';
import LoadingOverlay from '../../LoadingOverlay';
import { useState } from 'react';
import { deleteReport, updateReport } from '@/src/lib/api/reports';
import { useAuth } from '../../auth/AuthProvider';

interface Props {
  setPage: (page: TargetPage) => void;
  page: TargetPage;
}

export default function ReportsContent({ setPage, page }: Props) {
  const { token } = useAuth();
  const refreshReports = useMyReports().refreshReports;
  const { reports, loading } = useMyReports();
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const handleEdit = (reportId: number) => {
    setSelectedReportId(reportId);
    setPage('editReport');
  };
  async function handleDelete(token: string, reportId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this report?. This action cannot be undone.');
    if (!confirmed) return;
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;
    await updateReport(token, reportId, {
      ...report,
      isActive: false
    });

    await refreshReports();
  }

  if (loading) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center w-full">
        <LoadingOverlay text="Loading your reports" />
      </div>
    );
  }

  if (reports.length == 0) {
    return <div className="min-h-screen pb-24 flex items-center justify-center w-full">You haven't created any report yet</div>;
  }

  return (
    <>
      <PageHeader title="My Reports" setPage={setPage} page={page} />
      <div className="min-h-screen pb-24 flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-3 w-full p-5"
        >
          {reports.map((report) => (
            <div key={report.id} className="rounded-3xl border border-zinc-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${report.status === 'lost' ? 'bg-orange-100' : 'bg-emerald-100'}`}>
                  <img src={report.imageUrl} className="h-12 w-12 object-cover rounded-2xl" />
                </div>

                <div className="flex-1">
                  <p className="font-bold">{report.name}</p>

                  <p className="text-sm text-zinc-500">{report.breed}</p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin size={12} />
                    {report.location.location}
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${report.status === 'lost' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}
                >
                  {report.status === 'lost' ? 'Perdido' : 'Encontrado'}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(report.id)} className="flex items-center gap-1 rounded-xl bg-blue-100 px-3 py-2 text-blue-600">
                  <Pencil size={16} />
                  Edit
                </button>

                <button onClick={() => token && handleDelete(token, report.id)} className="flex items-center gap-1 rounded-xl bg-red-100 px-3 py-2 text-red-600">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
