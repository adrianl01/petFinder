'use client';
import { useAuth } from '@/src/components/auth/AuthProvider';
import AuthScreen from '@/src/components/screens/AuthScreen';
import ReportScreen from '@/src/components/screens/ReportScreen';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Report' };

export default function Report() {
  const { token } = useAuth();

  if (!token) {
    return <AuthScreen />;
  }

  return <ReportScreen />;
}
