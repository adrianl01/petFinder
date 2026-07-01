import { Metadata } from 'next';
import MapScreen from '../../components/screens/MapScreen';

export const metadata: Metadata = { title: 'Map' };

export default function Map() {
  return <MapScreen />;
}
