import { TLocation } from '../../../typings';
import coords from './coords.json';

export default async function getTodaysLocation(
  date: Date
): Promise<google.maps.LatLngLiteral | null> {
  const index = coords.findIndex(
    (location: TLocation) =>
      new Date(location.date).toDateString() === date.toDateString()
  );

  if (index === -1) {
    return null;
  }

  const { location } = coords[index];

  return {
    lat: location.lat,
    lng: location.lng,
  };
}
