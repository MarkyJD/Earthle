import { useState, useContext, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { BiCheck, BiMapAlt, BiX } from 'react-icons/bi';
import ChallengeMap from './ChallengeMap';
import GuessMap from './GuessMap';
import { GUESS_MAP_FIELDS } from '../../constants';
import GameContext from '../../contexts/GameContext';
import { round } from '../../helpers';

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
    handleGuess(guess, haversineDistance(guess, trueLocation));
    setGuessSubmitted(true);
    setPath([trueLocation, guess]);
  };

  return (
    <div className="h-full w-full border-2 border-stone-400 dark:border-stone-500 relative rounded-md overflow-hidden shadow-md">
      {/* Challenge map (Street View) */}
      <Wrapper apiKey={apiKey} render={render}>
        <ChallengeMap location={todaysLocation} />
      </Wrapper>

      {results && (
        <div className="absolute bg-black/70 text-stone-100 text-xl py-20 font-customSerif z-20 top-0 w-full flex justify-center items-center">
          <div className="space-y-3 flex flex-col w-3/4 mx-auto">
            <h2>
              Name:{' '}
              <span className="text-3xl font-disp text-emerald-500">
                {playername}
              </span>
            </h2>
            <h2>
              Distance:{' '}
              <span className="text-3xl font-disp text-emerald-500">
                {`${results.distance} `}
                <span className="text-xl text-emerald-700">km</span>
              </span>
            </h2>
            <h2>
              Rounded Distance:{' '}
              <span className="text-3xl font-disp text-emerald-500">
                {`${round(results.distance, 4)} `}
                <span className="text-xl text-emerald-700">km</span>
              </span>
            </h2>
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
