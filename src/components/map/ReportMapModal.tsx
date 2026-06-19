'use client';

import {
  MapPin,
  PawPrint,
  X,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

import { ReportResponse } from '@/src/types/report';

interface Props {
  report: ReportResponse | null;
  onClose: () => void;
  onOpenDetails?: (report: ReportResponse) => void;
}

export default function ReportMapModal({
  report,
  onClose,
  onOpenDetails
}: Props) {
  if (!report) return null;

  const isLost = report.status === 'lost';

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md p-4">
        <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-2xl">
          <div className="p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <PawPrint
                    size={16}
                    className="text-orange-500"
                  />

                  <h3 className="text-xl font-black">
                    {report.name}
                  </h3>
                </div>

                <p className="text-sm text-zinc-500">
                  {report.breed}
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mb-4">
              {isLost ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-600">
                  <AlertTriangle size={14} />
                  Lost
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-bold text-green-700">
                  <CheckCircle2 size={14} />
                  Found
                </span>
              )}
            </div>

            <div className="mb-5 flex items-start gap-3 rounded-2xl bg-stone-50 p-4">
              <MapPin
                size={18}
                className="mt-0.5 text-orange-500"
              />

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                  Location
                </p>

                <p className="font-semibold">
                  {report.location.location}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onOpenDetails?.(report)
              }
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600"
            >
              View complete report

              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}