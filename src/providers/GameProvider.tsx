/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useState } from 'react';
import getTodaysLocation from '../assets/challengeLocations/locations';
import GameContext from '../contexts/GameContext';

interface TResults {
  trueLocation: google.maps.LatLngLiteral;
  guess: google.maps.LatLngLiteral;
  distance: number;
}

interface Props {
  children: React.ReactNode;
}

export default function GameProvider({ children }: Props) {
  const [results, setResults] = useState<TResults>();
  const [todaysLocation, setTodaysLocation] =
    useState<google.maps.LatLngLiteral | null>();
  const [trueLocation, setTrueLocation] = useState<google.maps.LatLngLiteral>();

  const handleGuess = (
    location: google.maps.LatLngLiteral,
    distance: number
  ) => {
    console.log(`I guessed ${location.lat}, ${location.lng}`);

    if (trueLocation) {
      setResults({
        trueLocation,
        guess: location,
        distance,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTrueLocation = (location: any, isDefault: boolean) => {
    if (isDefault) {
      setTrueLocation(location);
    } else {
      setTrueLocation({ lat: location.lat(), lng: location.lng() });
    }
  };

  useEffect(() => {
    async function fetchLocation() {
      const latLng = await getTodaysLocation(new Date());
      setTodaysLocation(latLng);
    }

    fetchLocation();
  }, []);

  // console.log('todaysLocation:', todaysLocation);
  // console.log('trueLocation:', trueLocation);

  return todaysLocation ? (
    <GameContext.Provider
      // @ts-ignore
      value={{
        todaysLocation,
        trueLocation,
        getTrueLocation,
        handleGuess,
        results,
      }}
    >
      {children}
    </GameContext.Provider>
  ) : null;
}
