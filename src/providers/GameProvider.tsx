/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useState } from 'react';
import { TResults } from '../../typings';
import getTodaysLocation from '../assets/challengeLocations/locations';
import GameContext from '../contexts/GameContext';

interface Props {
  children: React.ReactNode;
  debugDate?: Date;
}

export default function GameProvider({ children, debugDate }: Props) {
  const [date, setDate] = useState(debugDate || new Date());
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
      const latLng = await getTodaysLocation(date);
      setTodaysLocation(latLng);
    }

    fetchLocation();
  }, [date]);

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

GameProvider.defaultProps = {
  debugDate: null,
};
