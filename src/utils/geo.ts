import type { MockProvider } from '../types/service';

export interface UserLocation {
  lng: number;
  lat: number;
  source: 'gps' | 'fallback';
}

function calcDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

const OFFSETS: { dlng: number; dlat: number }[] = [
  { dlng: 0.008, dlat: 0.005 },
  { dlng: -0.015, dlat: 0.012 },
  { dlng: 0.022, dlat: -0.008 },
  { dlng: -0.006, dlat: -0.015 },
  { dlng: 0.018, dlat: 0.018 },
  { dlng: -0.020, dlat: -0.003 },
  { dlng: -0.010, dlat: 0.010 },
  { dlng: 0.005, dlat: -0.020 },
  { dlng: 0.025, dlat: 0.015 },
  { dlng: -0.022, dlat: -0.012 },
  { dlng: -0.008, dlat: 0.022 },
  { dlng: 0.012, dlat: -0.005 },
];

export function scatterNearby(providers: MockProvider[], centerLng: number, centerLat: number): MockProvider[] {
  return providers.map((p, i) => {
    const o = OFFSETS[i % OFFSETS.length];
    const newLat = centerLat + o.dlat;
    const newLng = centerLng + o.dlng;
    const dist = calcDistance(centerLat, centerLng, newLat, newLng);
    return { ...p, lat: newLat, lng: newLng, distance: dist > 0 ? dist : p.distance };
  });
}

export function getUserLocation(): Promise<UserLocation> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lng: 0, lat: 0, source: 'fallback' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
          source: 'gps',
        });
      },
      () => {
        resolve({ lng: 0, lat: 0, source: 'fallback' });
      },
      { timeout: 10000, maximumAge: 300000 },
    );
  });
}
