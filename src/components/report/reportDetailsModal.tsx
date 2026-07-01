'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Calendar, CheckCircle2, Clock3, MapPin, PawPrint, Share2, X } from 'lucide-react';
import { ReportResponse } from '@/src/types/report';

interface Props {
  report: ReportResponse | null;
  onClose: () => void;
}

export default function ReportDetailsModal({ report, onClose }: Props) {
  if (!report) return null;

  const isLost = report.status === 'lost';

  const createdDate = new Date(report.createdAt).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.y > 120) {
              onClose();
            }
          }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-md overflow-hidden rounded-t-[32px] bg-[#FBF9F7] shadow-2xl"
        >
          <div className="max-h-[92vh] overflow-y-auto">
            <div className="flex justify-center py-3">
              <div className="h-1.5 w-12 rounded-full bg-zinc-300" />
            </div>
            {/* HEADER */}

            <div className="sticky top-0 z-20 border-b border-black/10 bg-white">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h2 className="text-lg font-black text-[#1A1A18]">Report</h2>
                  <p className="text-xs text-[#706F6B]">Complete Info</p>
                </div>

                <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* FOTO */}

            <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="relative h-72 bg-[#FDF0E8]">
              {report.imageUrl ? (
                <img src={report.imageUrl} alt={report.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <PawPrint size={96} className="text-[#E8521A]/30" />
                </div>
              )}

              <div className="absolute left-4 top-4">
                {isLost ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FDF0E8] px-4 py-2 text-sm font-bold text-[#E8521A]">
                    <AlertTriangle size={14} />
                    Lost Pet
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#E0F5EE] px-4 py-2 text-sm font-bold text-[#0F7B5F]">
                    <CheckCircle2 size={14} />
                    Found Pet
                  </span>
                )}
              </div>
            </motion.div>

            {/* CONTENIDO */}

            <section className="space-y-4 p-5">
              <div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2">
                  <h1 className="text-3xl font-black text-[#1A1A18]">{report.name}</h1>

                  <PawPrint size={18} className="text-[#E8521A]" />
                </motion.div>

                <p className="mt-1 text-[#706F6B]">{report.breed}</p>
              </div>

              {/* DATOS */}

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#706F6B]">Species</p>

                  <p className="mt-1 font-bold capitalize">{report.species}</p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#706F6B]">Color</p>

                  <p className="mt-1 font-bold">{report.color}</p>
                </div>
              </motion.div>

              {/* UBICACIÓN */}

              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF0E8]">
                    <MapPin size={18} className="text-[#E8521A]" />
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#706F6B]">Location</p>

                    <p className="mt-1 font-bold text-[#1A1A18]">{report.location.location}</p>
                  </div>
                </div>
              </div>

              {/* FECHAS */}

              <div className="flex gap-3">
                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-black/10 bg-white p-4">
                  <Calendar size={18} className="text-[#E8521A]" />

                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#706F6B]">Reportado</p>

                    <p className="font-bold text-sm">{createdDate}</p>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-black/10 bg-white p-4">
                  <Clock3 size={18} className="text-[#E8521A]" />
                </div>
              </div>
            </section>

            {/* FOOTER */}

            <div className="sticky bottom-0 border-t border-black/10 bg-white p-4">
              <div className="flex gap-2">
                <button className="flex items-center justify-center rounded-2xl border border-black/10 px-4">
                  <Share2 size={18} />
                </button>

                <button
                  className={`flex-1 rounded-2xl py-4 font-bold text-white transition ${isLost ? 'bg-[#E8521A] hover:bg-[#D14917]' : 'bg-[#0F7B5F] hover:bg-[#0B6A52]'}`}
                >
                  {isLost ? 'I saw this pet' : 'Is my Pet'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
