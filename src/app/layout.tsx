import { AuthProvider } from '@/src/components/auth/AuthProvider';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ReportsProvider } from '../components/report/ReportsProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '%s | Petfinder', default: 'Petfinder' },
  description: 'Find lost and found pets near you'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {' '}
          <ReportsProvider>{children}</ReportsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
