'use client';
import { getUser } from '@/src/lib/api/user';
import { User } from '@/src/types/user';
import { useEffect, useState } from 'react';
import { Lock, LogOut, PawPrint } from 'lucide-react';

import ProfileMenuItem from '@/src/components/profile/ProfileMenuItem';
import BottomNavigation from '@/src/components/layout/BottomNavigation';
import ProfileContent from '../profile/content/ProfileContent';
import ReportsContent from '../profile/content/ReportsContent';
import SettingsContent from '../profile/content/SettingsContent';

import { getToken } from '@/src/lib/storage/token';

export type TargetPage = 'profile' | 'reports' | 'settings' | 'hub' | 'changePassword' | 'changeLocation';

const Mockuser = {
  id: 1,
  fullName: 'Pedro Sosa Ferro',
  email: 'ga.leiva.1601@gmail.com',
  location: {
    latitude: 51,
    longitude: 24,
    address: 'Puerto Rico, Misiones'
  },
  createdAt: new Date(2026, 4, 5),
  updatedAt: new Date(2026, 4, 5)
};

export default function ProfileScreen() {
  const token = getToken();
  const [page, setPage] = useState<TargetPage>('hub');
  const [user, setUser] = useState<User>();
 
  useEffect(() => {
    if (!token) return;
    async function fetchUser() {
      const data = (await getUser()) as User;
      setUser(data);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <>
      <main className="min-h-screen pb-24 flex flex-col items-center justify-center w-full">
        {page === 'hub' && (
          <div className="flex flex-col w-full">
            {user && <ProfileContent {...user} />}
            <section className="space-y-3 w-full p-5">
              {token && (
                <>
                  <ProfileMenuItem icon={PawPrint} title="Mis reportes" subtitle="3 mascotas publicadas" color="orange" targetPage="reports" setPage={setPage} />
                  <ProfileMenuItem icon={Lock} title="Configuración" subtitle="Seguridad de tu cuenta" color="emerald" targetPage="settings" setPage={setPage} />

                  <div className="pt-4">
                    <ProfileMenuItem icon={LogOut} title="Cerrar sesión" color="red" targetPage="hub" setPage={setPage} />
                  </div>
                </>
              )}
            </section>
          </div>
        )}

        {page === 'reports' && <ReportsContent setPage={setPage} page={page} />}
        {(page === 'settings' || page === 'changePassword' || page === 'changeLocation') && <SettingsContent setPage={setPage} page={page} />}

        <BottomNavigation />
      </main>
    </>
  );
}
