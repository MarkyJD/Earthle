import { useContext } from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';
import Theme from '../../contexts/Theme';

interface Props {
  className?: string;
}

export default function Header({ className }: Props) {
  const { isDarkMode, toggleDarkMode } = useContext(Theme);
  return (
    <header className={className}>
      <div className="h-full w-full flex items-center justify-between">
        <h1 className="text-3xl text-shadow-sm font-display text-sky-600 dark:text-sky-600">
          Earthle
        </h1>
        <button
          className="transition text-3xl text-amber-500 dark:text-sky-700 p-1 rounded hover:bg-stone-300 dark:hover:bg-stone-600"
          type="button"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <BiMoon /> : <BiSun />}
        </button>
      </div>
    </header>
  );
}

Header.defaultProps = {
  className: '',
};
