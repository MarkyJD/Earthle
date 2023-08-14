/* eslint-disable no-else-return */
import { useState, useContext, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { BiCheck, BiListOl, BiMapAlt, BiSave, BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import ChallengeMap from './ChallengeMap';
import GuessMap from './GuessMap';
import { GUESS_MAP_FIELDS } from '../../constants';
import GameContext from '../../contexts/GameContext';
import { round } from '../../helpers';
import { TResults } from '../../../typings';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'error';

// eslint-disable-next-line react/function-component-definition
const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default function MapsWrapper({ playername }: { playername: string }) {
  // @ts-ignore
  const { todaysLocation, trueLocation, handleGuess, results } =
    useContext(GameContext);
  const [guess, setGuess] = useState<google.maps.LatLngLiteral>();
  const [makeGuess, setMakeGuess] = useState(false);
  const [guessSubmitted, setGuessSubmitted] = useState(false);
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [flightPath, setFlightPath] = useState<google.maps.Polyline>();
  function haversineDistance(
    mk1: google.maps.LatLngLiteral,
    mk2: google.maps.LatLngLiteral
  ) {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(mk2.lat - mk1.lat);
    const dLon = toRad(mk2.lng - mk1.lng);
    const lat1 = toRad(mk1.lat);
    const lat2 = toRad(mk2.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  const center = GUESS_MAP_FIELDS.CENTER;
  const zoom = GUESS_MAP_FIELDS.ZOOM;

  const onClick = (event: google.maps.MapMouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setGuess(event.latLng!.toJSON());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    console.log(event.latLng!.toJSON());
  };

  const render = (status: Status) => {
    return <h2>{status}</h2>;
  };

  const submitGuess = () => {
    if (!guess) {
      return;
    }
    handleGuess(guess, haversineDistance(guess, trueLocation), playername);
    setGuessSubmitted(true);
    setPath([trueLocation, guess]);
  };

  function getMessage(res: TResults, name: string): string {
    const d = res.distance;

    if (d > 10000) {
      return `...disappointing, ${name}`;
    } else if (d > 5000) {
      return `...not great ${name}`;
    } else if (d > 2000) {
      return `Well ${name}, it could be worse`;
    } else if (d > 1000) {
      return `Not bad ${name}, not bad at all`;
    } else if (d > 500) {
      return `"Alright, Alright, Alright - Matthew McConaughey" - ${name}`;
    } else if (d > 100) {
      return `Oh ${name}, you're a real smart cookie`;
    } else if (d > 50) {
      return `${name}, vedy vedy close indeed`;
    } else if (d > 10) {
      return `Who are you, Shooter Mc${name}?`;
    } else if (d > 1) {
      return `Lord ${name}, King of the Guessers`;
    } else if (d > 0.5) {
      return `You're a wizard, ${name}`;
    } else if (d > 0.1) {
      return `Bloody hell ${name}, this is getting ridiculous`;
    } else if (d > 0.05) {
      return `wtf ${name}, this is absurd`;
    } else {
      return `ALL HAIL ${name.toUpperCase()}, THE GOLDEN GOD!!!`;
    }
  }

  return (
    <div className="h-full w-full border-2 border-stone-400 dark:border-stone-500 relative rounded-md overflow-hidden shadow-md">
      {/* Challenge map (Street View) */}
      <Wrapper apiKey={apiKey} render={render}>
        <ChallengeMap location={todaysLocation} />
      </Wrapper>

      {results && (
        <div className="absolute bg-black/70 text-stone-100 text-xl py-5 md:py-10 font-customSerif z-20 top-0 w-full flex justify-center items-center">
          <div className="space-y-3 flex items-center text-base md:text-lg flex-col w-full md:w-3/4 px-5 md:px-0 mx-auto">
            <h2 className="text-xl md:text-3xl  font-disp text-sky-500">
              {getMessage(results, playername)}
            </h2>

            <h2 className="text-2xl md:text-5xl font-disp text-emerald-500">
              {results.distance > 1
                ? `${round(results.distance, 4)} `
                : `${round(results.distance * 1000)} `}
              <span className="text-xl md:text-2xl  text-emerald-700">
                {results.distance > 1 ? 'km' : 'm'}
              </span>
            </h2>
            {/* Conditionally render this if logged in or not */}
            <p className="font-customSans text-stone-300 text-base">
              See how you compare to other players on the leaderboard
              <hr className="border-emerald-500/50 py-1 border-t mt-1" />
            </p>
            <div className="flex items-center justify-center w-full">
              <Link to="/leaderboards">
                <button
                  type="button"
                  className=" font-display transition px-3 py-2 border border-emerald-500 rounded-md text-emerald-500  hover:bg-emerald-500 hover:text-stone-700"
                >
                  Leaderboards
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${!makeGuess ? 'hidden' : 'block'} ${
          guessSubmitted
            ? 'md:w-11/12 md:h-5/6 w-11/12 h-3/4'
            : 'w-11/12 h-1/2 md:h-1/2 md:w-3/4'
        } z-10 transition-all duration-500 rounded-md overflow-hidden shadow-md absolute md:w-3/4 md:h-1/2 bottom-28 inset-x-0 mx-auto`}
      >
        {/* Guess map (world map) */}
        <Wrapper apiKey={apiKey} render={render}>
          <GuessMap
            path={path}
            guessSubmitted={guessSubmitted}
            center={center}
            zoom={zoom}
            onClick={onClick}
            flightPath={flightPath}
            setFlightPath={setFlightPath}
          >
            <Marker position={guess} icon={GUESS_MAP_FIELDS.BLUE_ICON} />
            {/* Show correct position when guessed */}
            {guessSubmitted && (
              <Marker
                position={trueLocation}
                icon={GUESS_MAP_FIELDS.GREEN_ICON}
              />
            )}
          </GuessMap>
        </Wrapper>
      </div>

      {/* Open and Close map buttons */}
      <button
        onClick={() => setMakeGuess(!makeGuess)}
        className={`${makeGuess ? 'button-red' : 'button-blue'}`}
        type="button"
      >
        {!makeGuess && <BiMapAlt />}
        {makeGuess && <BiX />}
      </button>

      {/* Submit guess */}
      <button
        disabled={!guess || guessSubmitted}
        onClick={() => submitGuess()}
        type="button"
        className={`button-green ${makeGuess && 'translate-x-16'} transition ${
          (!guess || guessSubmitted) && 'opacity-50 hover:bg-emerald-700'
        } `}
      >
        <BiCheck />
      </button>
    </div>
  );
}
