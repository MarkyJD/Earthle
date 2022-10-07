/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useState, useContext } from 'react';
import { TResults, TUser } from '../../typings';
import getTodaysLocation from '../assets/challengeLocations/locations';
import GameContext from '../contexts/GameContext';
import AuthContext from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  debugDate?: Date;
}

export default function GameProvider({ children, debugDate }: Props) {
  const { updateCookie } = useContext(AuthContext);
  const [results, setResults] = useState<TResults>();
  const [todaysLocation, setTodaysLocation] =
    useState<google.maps.LatLngLiteral | null>();
  const [trueLocation, setTrueLocation] = useState<google.maps.LatLngLiteral>();

  const handleGuess = (
    location: google.maps.LatLngLiteral,
    distance: number,
    playername: string
  ) => {
    // console.log(`I guessed ${location.lat}, ${location.lng}`);

    if (trueLocation) {
      setResults({
        trueLocation,
        guess: location,
        distance,
      });
    }

    let country = 'none';

    if (Intl) {
      // eslint-disable-next-line prefer-destructuring
      country = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0];
    }

    const userCookie: TUser = {
      guest: true,
      userCookie: {
        name: playername,
        score: distance,
        uid: playername,
        timestamp: new Date().toDateString(),
        country,
      },
    };
    updateCookie(userCookie);
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
    const date = debugDate || new Date();

    async function fetchLocation() {
      const latLng = await getTodaysLocation(date);
      setTodaysLocation(latLng);
    }

    fetchLocation();
  }, [debugDate]);

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
