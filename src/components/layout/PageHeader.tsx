'use client';

import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { TargetPage } from '../screens/ProfileScreen';

interface Props {
  title: string;
  setPage: (page: TargetPage) => void;
  page: TargetPage;
}

export default function PageHeader({ title, setPage, page }: Props) {
  const pathname = usePathname();
  const handleBack = () => {
    if (pathname == '/profile') {
      if (page === 'changePassword' || page === 'changeLocation') {
        setPage('settings');
      } else {
        setPage('hub');
      }
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white w-full">
      <div className="flex max-w-md items-center gap-3 px-5 py-4">
        <button onClick={handleBack}>
          <ArrowLeft />
        </button>

        <h1 className="text-lg font-black">{title}</h1>
      </div>
    </header>
  );
}
