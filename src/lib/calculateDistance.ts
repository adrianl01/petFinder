export function calculateDistance(userLat: number, userLng: number, reportLat: number, reportLng: number): number {
  const R = 6371;

  const dLat = toRadians(reportLat - userLat);

  const dLng = toRadians(reportLng - userLng);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(userLat)) * Math.cos(toRadians(reportLat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((R * c).toFixed(1));
}

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
