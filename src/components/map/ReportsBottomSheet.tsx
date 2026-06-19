import { calculateDistance } from '@/src/lib/calculateDistance';
import { ReportResponse} from '@/src/types/report';
import { Cat, Dog, Filter, MapPin, PawPrint } from 'lucide-react';
import { getUserLocation } from '@/src/lib/storage/location';

interface ReportsBottomSheetProps {
  filteredReports: ReportResponse[];
}

export default function ReportsBottomSheet({ filteredReports }: ReportsBottomSheetProps) {
  const userLocation = getUserLocation();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-md rounded-t-[32px] bg-[#FBF9F7] shadow-2xl">
        <div className="flex justify-center py-3">
          <div className="h-1.5 w-16 rounded-full bg-zinc-300" />
        </div>

        <div className="px-5 pb-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">Near reports</h2>

              <p className="text-sm text-zinc-500">{filteredReports.length} results</p>
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
              <Filter size={16} />
              Filtros
            </button>
          </div>

          <div className="max-h-[320px] space-y-3 overflow-y-auto">
            {filteredReports.map((report) => (
              <button key={report.id} className="w-full rounded-3xl border border-black/10 bg-white p-4 text-left">
                <div className="flex gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${report.status === 'lost' ? 'bg-[#FDF0E8]' : 'bg-[#E0F5EE]'}`}>
                    {report.species === 'dog' ? (
                      <Dog className={report.status === 'lost' ? 'text-[#E8521A]' : 'text-[#0F7B5F]'} />
                    ) : (
                      <Cat className={report.status === 'lost' ? 'text-[#E8521A]' : 'text-[#0F7B5F]'} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black">{report.name}</h3>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${report.status === 'lost' ? 'bg-[#FDF0E8] text-[#E8521A]' : 'bg-[#E0F5EE] text-[#0F7B5F]'}`}
                      >
                        {report.status === 'lost' ? 'Lost' : 'Found'}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-500">{report.breed}</p>

                    <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
                      <MapPin size={14} />
                      {report.location.location}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm font-bold text-[#E8521A]">
                      <PawPrint size={14} />
                      {userLocation
                        ? `${calculateDistance(userLocation.latitude, userLocation.longitude, report.location.latitude, report.location.longitude)} km of distance`
                        : 'Unavailable location'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
