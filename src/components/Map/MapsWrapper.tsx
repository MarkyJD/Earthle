import { useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import ChallengeMap from './ChallengeMap';
import GuessMap from './GuessMap';

// const CENTER = { lat: -34.397, lng: 150.644 };
const CENTER = { lat: 43.31613189259254, lng: -91.80256027484972 };
const ZOOM = 3;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const renderGuessMap = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Failed...</p>;
    case Status.SUCCESS:
      return <GuessMap center={CENTER} zoom={ZOOM} />;
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

export default function MapsWrapper() {
  const [makeGuess, setMakeGuess] = useState(false);
  return (
    <div className="h-full w-full relative rounded overflow-hidden shadow">
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY || ''} render={renderChallengeMap} />
      {makeGuess && (
        <div className="z-20 rounded-md overflow-hidden shadow-md w-5/6 h-3/4 absolute md:w-3/4 md:h-1/2 bottom-28 inset-x-0 mx-auto">
          <Wrapper apiKey={GOOGLE_MAPS_API_KEY || ''} render={renderGuessMap} />
        </div>
      )}
      <button
        onClick={() => setMakeGuess(!makeGuess)}
        className="z-10 absolute bottom-8 inset-x-0 mx-auto left w-14 h-14 rounded-full bg-green-600"
        type="button"
      >
        hi
      </button>
    </div>
  );
}
