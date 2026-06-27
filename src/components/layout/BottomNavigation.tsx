'use client';

import { usePathname } from 'next/navigation';

import { Map, User, PawPrint as Dog } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-200 bg-white z-10 max-w-[500px]">
      <div className="mx-auto flex h-16 max-w-md">
        <button
          className={`flex flex-1 flex-col items-center justify-center ${pathname === '/map' ? 'text-orange-500' : 'text-zinc-500'}`}
          onClick={() => {
            window.location.href = '/map';
          }}
        >
          <Map size={22} />
          <span className="mt-1 text-[11px] font-semibold">Map</span>
        </button>

        <button
          className={`flex flex-1 flex-col items-center justify-center ${pathname === '/report' ? 'text-orange-500' : 'text-zinc-500'}`}
          onClick={() => {
            window.location.href = '/report';
          }}
        >
          <Dog size={22} />
          <span className="mt-1 text-[11px] font-semibold">Report</span>
        </button>

        <button
          className={`flex flex-1 flex-col items-center justify-center ${pathname === '/profile' ? 'text-orange-500' : 'text-zinc-500'}`}
          onClick={() => {
            window.location.href = '/profile';
          }}
        >
          <User size={22} />
          <span className="mt-1 text-[11px] font-semibold">Profile</span>
        </button>
      </div>
    </nav>
  );
}
