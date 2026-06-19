export interface UserLocation {
  latitude: number;
  longitude: number;
}

export function getUserLocation(): UserLocation | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem('userLocation');

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveUserLocation(location: UserLocation) {
  localStorage.setItem('userLocation', JSON.stringify(location));
}
