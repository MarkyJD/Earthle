import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import coords from '../assets/challengeLocations/coords.json';
import Welcome from '../components/Home/Welcome';
import DebugDates from '../components/Home/DebugDates';
import NameForm from '../components/Home/NameForm';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Home() {
  const debugMode = import.meta.env.VITE_DEBUG_MODE === 'true';
  const [debugDate, setDebugDate] = useState<Date | null>(() =>
    debugMode ? new Date(coords[0].date) : null
  );
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const isValidName = name.length >= 3 && name.length <= 10;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check name isn't vulgar

    // Create session with name

    // Create user in firebase

    navigate(ROUTES.PLAY, {
      state: {
        name,
        debugDate,
      },
    });
  };

  return (
    <div className="h-full w-full">
      <main className="border-2 overflow-y-auto  border-stone-400 dark:border-stone-500 rounded-md h-full overflow-hidden bg-stone-300 dark:bg-stone-600">
        <div className="bg-black relative h-full w-full">
          <img
            src="src/assets/world.png"
            alt="world"
            className="object-cover h-full w-auto opacity-90"
          />

          <div className="absolute inset-0 mx-auto text-stone-100 bg-black/30 py-10 px-5 flex flex-col justify-center">
            <Welcome
              title="Worlder"
              description="Your goal is to guess the location of the image shown on the map. You will be given a score based on how close your guess is to the actual location."
              cta="To begin playing, enter a name below and hit play! Good luck!"
            />

            <NameForm
              name={name}
              setName={setName}
              isValidName={isValidName}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>

      {/* For testing */}
      {debugMode && (
        <DebugDates debugDate={debugDate} setDebugDate={setDebugDate} />
      )}
    </div>
  );
}
