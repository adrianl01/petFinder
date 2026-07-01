'use client';

import { useState } from 'react';

import BottomNavigation from '../layout/BottomNavigation';

import LoadingOverlay from '../LoadingOverlay';
import ReportForm from '../form/FormReport';

export default function ReportScreen() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <LoadingOverlay text="Posting report..." />}
      <main className="min-h-screen bg-stone-50">
        <ReportForm setIsLoading={setIsLoading} mode='create' />
        <BottomNavigation />
      </main>
    </>
  );
}
