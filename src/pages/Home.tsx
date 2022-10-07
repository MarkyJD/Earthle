import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiListOl } from 'react-icons/bi';
import { ROUTES } from '../constants';
import coords from '../assets/challengeLocations/coords.json';
import Welcome from '../components/Home/Welcome';
import DebugDates from '../components/Home/DebugDates';
import NameForm from '../components/Home/NameForm';
import AuthContext from '../contexts/AuthContext';
import { round } from '../helpers';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Home() {
  const { cookie } = useContext(AuthContext);

  const hasUserAlreadyGuessedToday =
    cookie?.userCookie?.timestamp === new Date().toDateString();

  const debugMode = import.meta.env.VITE_DEBUG_MODE === 'true';
  const [debugDate, setDebugDate] = useState<Date | null>(() =>
    debugMode ? new Date(coords[0].date) : null
  );
  const navigate = useNavigate();
  const [name, setName] = useState(cookie?.userCookie?.name || '');
  const isValidName = name.length >= 3 && name.length <= 10;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODOs

    // - Check name isn't vulgar
    // - Check firebase and make sure name isn't already taken
    // If any of the above fail, show error message and don't navigate

    navigate(ROUTES.PLAY, {
      state: {
        name,
        debugDate,
      },
    });
  };

  if (hasUserAlreadyGuessedToday && cookie && !debugMode) {
    return (
      <div className="h-full w-full">
        <main className="border-2 overflow-y-auto  border-stone-400 dark:border-stone-500 rounded-md h-full overflow-hidden bg-stone-300 dark:bg-stone-600">
          <div className="bg-black relative h-full w-full">
            <img
              src="src/assets/world.png"
              alt="world"
              className="object-cover h-full w-auto opacity-90"
            />

            <div className="absolute bg-black/70 text-stone-100 text-xl py-5 md:py-10 font-customSerif z-20 top-20 w-full flex justify-center items-center">
              <div className="space-y-3 flex items-center text-base md:text-lg flex-col w-full md:w-3/4 px-5 md:px-0 mx-auto">
                <h2 className="text-xl md:text-3xl  font-disp text-sky-500">
                  {`Hi ${cookie.userCookie.name}, you've already guessed today!`}
                </h2>

                <h2 className="text-2xl md:text-5xl font-disp text-emerald-500">
                  <span className="text-stone-500 text-xl">
                    {"Today's score: "}
                  </span>
                  {cookie.userCookie.score > 1
                    ? `${round(cookie.userCookie.score, 4)} `
                    : `${round(cookie.userCookie.score * 1000)} `}
                  <span className="text-xl md:text-2xl  text-emerald-700">
                    {cookie.userCookie.score > 1 ? 'km' : 'm'}
                  </span>
                </h2>
                {/* Conditionally render this if logged in or not */}
                <p className="font-customSans text-stone-300 text-base">
                  <Link to="/login">
                    <span className="font-semibold underline">Login</span>
                  </Link>{' '}
                  to see your ranking on the leaderboards
                </p>
                <div className="flex items-center justify-center space-x-3 w-full">
                  <Link to="/leaderboards">
                    <button
                      type="button"
                      className="transition text-3xl text-stone-100 hover:text-emerald-500"
                    >
                      <BiListOl />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <main className="border-2 overflow-y-auto  border-stone-400 dark:border-stone-500 rounded-md h-full overflow-hidden bg-stone-300 dark:bg-stone-600">
        <div className="bg-black relative h-full w-full">
          <img
            src="src/assets/world.png"
            alt="world"
            className="object-cover h-full w-auto opacity-90"
          />

          <div className="absolute inset-x-0 mx-auto top-20 text-stone-100 bg-black/50 py-10 px-5 flex flex-col">
            <Welcome
              title="Earthle"
              description="Earthle is a daily location guessing game where you can compete
              with friends and others around the world."
              cta="To begin playin, enter a name below and hit play!"
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
