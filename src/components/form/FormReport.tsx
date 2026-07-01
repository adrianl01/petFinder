import { Send } from 'lucide-react';
import Input from '@/src/components/ui/Input';
import ImageUploader from '@/src/components/report/ImageUploader';
import SpeciesSelector from '@/src/components/report/SpeciesSelector';
import PetMapPicker from '@/src/components/report/PetMapPicker';
import { useEffect, useState } from 'react';
import { createReport, getReportById, updateReport } from '@/src/lib/api/reports';
import { useAuth } from '../auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { ReportResponse } from '@/src/types/report';

interface ReportFormProps {
  setIsLoading: (arg0: boolean) => void;
  mode: 'create' | 'edit';
  report?: ReportResponse;
}

export default function ReportForm({ setIsLoading, mode, report }: ReportFormProps) {
  const { token } = useAuth();
  const router = useRouter();
  const [species, setSpecies] = useState('dog');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [form, setForm] = useState({ name: '', breed: '', color: '', phoneNumber: '', location: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!report) return;
    if (mode === 'edit') {
      setForm({
        name: report.name,
        breed: report.breed,
        color: report.color,
        phoneNumber: report.phoneNumber,
        location: report.location.location
      });
      setCoords({ latitude: report.location.latitude, longitude: report.location.longitude });
      setSpecies(report.species);
    }
  }, [report]);

  const handleSubmit = async () => {
    if (!token) {
      alert('You have to be logged in to create a report');
      return;
    }

    if (!form.name || !form.breed || !form.color || !form.phoneNumber || !form.location) {
      alert('Complete all the fields');
      return;
    }

    try {
      setIsLoading(true);
      if (mode === 'create') {
        await createReport(token, {
          name: form.name,
          species,
          breed: form.breed,
          color: form.color,
          status: 'lost',
          location: {
            longitude: coords?.longitude || 0,
            latitude: coords?.latitude || 0,
            location: form.location
          },
          image: selectedFile ?? undefined,
          phoneNumber: form.phoneNumber,
          isActive: true
        });
        alert('Report posted successfully');
      } else if (mode === 'edit' && report) {
        await updateReport(token, report.id, {
          name: form.name,
          species,
          breed: form.breed,
          color: form.color,
          status: 'lost',
          location: {
            longitude: coords?.longitude || 0,
            latitude: coords?.latitude || 0,
            location: form.location
          },
          image: selectedFile ?? undefined,
          phoneNumber: form.phoneNumber,
          isActive: true
        });
        router.replace('/profile');
      }
    } catch (error) {
      console.error(error);
      alert(`Couldn't post your report`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-md space-y-5 p-5 pb-40">
        <ImageUploader onFileSelect={setSelectedFile} />

        <Input
          label="Name of the pet"
          placeholder="Rocky"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: e.target.value
            }))
          }
        />

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Species</label>

          <SpeciesSelector selected={species} onSelect={setSpecies} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Breed"
            placeholder="Bulldog"
            value={form.breed}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                breed: e.target.value
              }))
            }
          />

          <Input
            label="Color"
            placeholder="Black"
            value={form.color}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                color: e.target.value
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Last location sight</label>

          <PetMapPicker onLocationSelect={setCoords} />
        </div>

        <Input
          label="Reference"
          placeholder="Park, avenue, place..."
          value={form.location}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              location: e.target.value
            }))
          }
        />

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Description</label>

          <textarea
            rows={5}
            placeholder="Details that helps you identify your pet..."
            className="w-full resize-none rounded-2xl border border-zinc-200 bg-white p-4 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Contact</label>

          <Input
            label="phoneNumber"
            placeholder="+54 9 11 ..."
            type=""
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                phoneNumber: e.target.value
              }))
            }
          />
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 border-t border-zinc-200 bg-white z-10 max-w-[500px]">
        <div className="mx-auto max-w-md p-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600"
            onClick={handleSubmit}
          >
            <Send size={18} />
            Post report
          </button>
        </div>
      </div>
    </>
  );
}
