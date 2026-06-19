'use client';

import { motion } from 'framer-motion';

import { Cat, Dog, MapPin } from 'lucide-react';
import PageHeader from '../../layout/PageHeader';
import { TargetPage } from '../../screens/ProfileScreen';

interface Props {
  setPage: (page: TargetPage) => void;
  page: TargetPage;
}

export default function ReportsContent({ setPage, page }: Props) {
  const reports = [
    {
      id: 1,
      name: 'Rocky',
      species: 'dog',
      status: 'lost',
      breed: 'Pastor Alemán',
      location: 'Puerto Rico, Misiones'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'cat',
      status: 'found',
      breed: 'Mestiza',
      location: 'Posadas, Misiones'
    }
  ];

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
                  {report.species === 'dog' ? (
                    <Dog className={report.status === 'lost' ? 'text-orange-600' : 'text-emerald-600'} />
                  ) : (
                    <Cat className={report.status === 'lost' ? 'text-orange-600' : 'text-emerald-600'} />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-bold">{report.name}</p>

                  <p className="text-sm text-zinc-500">{report.breed}</p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin size={12} />
                    {report.location}
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${report.status === 'lost' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}
                >
                  {report.status === 'lost' ? 'Perdido' : 'Encontrado'}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
