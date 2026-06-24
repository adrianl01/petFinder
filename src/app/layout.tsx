import { AuthProvider } from '@/src/components/auth/AuthProvider';
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <AuthProvider>
          {children}
        </AuthProvider>
    </html>
  )
}