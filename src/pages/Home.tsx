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
import { checkNameIsAvailable } from '../services/firestore';

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
  const [error, setError] = useState('');
  const isValidName = name.length >= 3 && name.length <= 10;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check name hasn't been used today
    const isAvailable = await checkNameIsAvailable(name);

    if (!isAvailable) {
      setError(`"${name}" has already been used today! Try another name`);
      return;
    }

    // TODOs

    // - Check name isn't vulgar

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

            <div className="absolute bg-white/40 dark:bg-black/50 text-stone-900 dark:text-stone-100 text-xl py-5 md:py-10 font-customSerif z-20 inset-0 w-full flex items-center justify-center ">
              <div className="space-y-3 flex items-center text-base md:text-lg flex-col w-full md:w-3/4 px-5 md:px-0 mx-auto">
                <h2 className="text-xl md:text-3xl  font-disp text-sky-800 dark:text-sky-500">
                  {`Hi ${cookie.userCookie.name}, you've already guessed today!`}
                </h2>

                <h2 className="text-2xl md:text-5xl font-disp text-emerald-800 dark:text-emerald-500">
                  <span className="text-stone-700 dark:text-stone-500 text-xl">
                    {"Today's score: "}
                  </span>
                  {cookie.userCookie.score > 1
                    ? `${round(cookie.userCookie.score, 4)} `
                    : `${round(cookie.userCookie.score * 1000)} `}
                  <span className="text-xl md:text-2xl text-emerald-800 dark:text-emerald-700">
                    {cookie.userCookie.score > 1 ? 'km' : 'm'}
                  </span>
                </h2>

                {/* Conditionally render this if logged in or not */}
                <p className="font-customSans text-stone-700 dark:text-stone-300 text-base">
                  See how you compare to other players on the leaderboard
                  <hr className="border-emerald-500/50 py-1 border-t mt-1" />
                </p>
                <div className="flex items-center justify-center w-full">
                  <Link to="/leaderboards">
                    <button
                      type="button"
                      className=" font-display transition px-3 py-2 border dark:border-emerald-500 border-emerald-800 text-emerald-800 rounded-md dark:text-emerald-500  hover:bg-emerald-500 hover:text-stone-700"
                    >
                      Leaderboards
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


          <div className="absolute inset-0 mx-auto text-stone-900 dark:text-stone-100 bg-white/40 dark:bg-black/50 px-5 flex flex-col justify-center py-10">
            <Welcome
              title="Worlder"
              description="Your goal is to guess the location of the Street View image on the map. The lower your score, the better!"
              cta="To begin playin, enter a name below and hit play!"

            />
            {error !== '' && (
              <p className="text-center text-shadow bg-red-700/50 px-2 py-1 text-sm rounded w-max mx-auto shadow shadow-red-700/50 text-red-200">
                {error}
              </p>
            )}
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
