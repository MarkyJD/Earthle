import { useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { BiCheck, BiMapAlt, BiX } from 'react-icons/bi';
import ChallengeMap from './ChallengeMap';
import GuessMap from './GuessMap';
import { GUESS_MAP_FIELDS } from '../../constants';

const CENTER = { lat: 43.31613189259254, lng: -91.80256027484972 };
const ZOOM = 3;
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'error';

interface Props {
  challengeLocation: google.maps.LatLngLiteral;
}

export default function MapsWrapper({ challengeLocation }: Props) {
  const [guess, setGuess] = useState<google.maps.LatLngLiteral>();
  const [makeGuess, setMakeGuess] = useState(false);

  const renderGuessMap = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <p>Loading...</p>;
      case Status.FAILURE:
        return <p>Failed...</p>;
      case Status.SUCCESS:
        return (
          <GuessMap
            center={GUESS_MAP_FIELDS.CENTER}
            zoom={GUESS_MAP_FIELDS.ZOOM}
          />
        );
      default:
        return <p>Error</p>;
    }
  };

  const renderChallengeMap = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <p>Loading...</p>;
      case Status.FAILURE:
        return <p>Failed...</p>;
      case Status.SUCCESS:
        return <ChallengeMap location={CENTER} />;
      default:
        return <p>Error</p>;
    }
  };

  return (
    <div className="h-full w-full border-2 border-stone-400 dark:border-stone-500 relative rounded-md overflow-hidden shadow-md">
      {/* Challenge map (Street View) */}
      <Wrapper apiKey={apiKey} render={renderChallengeMap} />

      <div
        className={`${
          !makeGuess ? 'hidden' : 'block'
        } z-10 rounded-md overflow-hidden shadow-md w-5/6 h-3/4 absolute md:w-3/4 md:h-1/2 bottom-28 inset-x-0 mx-auto`}
      >
        {/* Guess map (world map) */}
        <Wrapper apiKey={apiKey} render={renderGuessMap} />
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
        disabled={!guess}
        onClick={() => {}}
        type="button"
        className={`button-green ${makeGuess && 'translate-x-16'} transition ${
          !guess && 'opacity-50 hover:bg-emerald-700'
        } `}
      >
        <BiCheck />
      </button>
    </div>
  );
}
