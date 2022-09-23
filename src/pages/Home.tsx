import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Home() {
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
      },
    });
  };

  return (
    <div className="h-full w-full">
      <main className="border-2  border-stone-400 dark:border-stone-500 rounded-md h-full overflow-hidden bg-stone-300 dark:bg-stone-600">
        <div className="bg-black relative h-full w-full">
          <img
            src="src/assets/world.png"
            alt="world"
            className="object-cover h-full w-auto opacity-90"
          />

          <div className="absolute inset-x-0 mx-auto top-20 text-stone-100 bg-black/50 py-10 px-5 flex flex-col">
            <h1 className="text-center text-shadow text-3xl md:text-5xl font-medium mb-5">
              Welcome to{' '}
              <span className="font-customSerif font-bold">Earthle</span>
            </h1>
            <p className="text-lg text-stone-300 mb-10 text-center">
              Earthle is a daily location guessing game where you can compete
              with friends and others around the world.
            </p>
            <hr className="border-emerald-700 mb-10" />
            <p className="text-center text-lg font-hand  mb-5">
              To begin playin, enter a name below and hit play!
            </p>
            <form
              action="play"
              onSubmit={handleSubmit}
              className="flex flex-col items-center max-w-screen-sm mx-auto"
            >
              <label
                htmlFor="name"
                className="font-customSerif font-bold text-2xl mb-5"
              >
                Name:{' '}
              </label>
              <input
                id="name"
                type="text"
                placeholder="Armadeus"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-5  px-3 py-1 text-3xl rounded bg-emerald-100 outline-none border-2 border-emerald-600 focus:outline-emerald-400 shadow font-customSans font-bold text-stone-800"
              />
              <button
                disabled={!isValidName}
                type="submit"
                className={`${
                  !isValidName
                    ? 'cursor-default opacity-50'
                    : 'hover:bg-emerald-800'
                } w-44 px-2 text-white py-2 shadow border-2 border-emerald-900 rounded-md bg-emerald-700 text-xl font-customSans transition`}
              >
                Play
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
