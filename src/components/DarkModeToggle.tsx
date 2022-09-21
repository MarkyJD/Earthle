/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import Theme from '../contexts/Theme';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useContext(Theme);
  return (
    <div
      role="button"
      className="text-3xl text-amber-500 dark:text-sky-700 p-1 w-full h-full flex justify-center items-center"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <p className="flex items-center space-x-3">
          <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">
            Theme
          </span>
          <BiMoon />
        </p>
      ) : (
        <p className="flex items-center space-x-3">
          <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">
            Theme
          </span>
          <BiSun />
        </p>
      )}
    </div>
  );
}
