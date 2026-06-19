"use client";
import FeedScreen from '../components/screens/FeedScreen';
import SplashScreen from '../components/screens/SplashScreen';
import { getUserLocation } from '../lib/storage/location';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const userLocation = getUserLocation();

  if (userLocation !== null) return <FeedScreen />;
  return <SplashScreen />;
}
