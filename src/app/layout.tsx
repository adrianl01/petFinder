import { AuthProvider } from '@/src/components/auth/AuthProvider';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ReportsProvider } from '../components/report/ReportsProvider';

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
