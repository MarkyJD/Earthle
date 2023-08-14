import { BiCog, BiTable } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import {
  addDays,
  differenceInSeconds,
  endOfDay,
  formatDistanceToNow,
} from 'date-fns';
import HowToPlayModal from '../HowToPlayModal';
import logo from '../../assets/logo.png';
import DarkModeToggle from '../DarkModeToggle';
import Dropdown from '../Dropdown';
import LoginButton from '../LoginButton';
import { ROUTES } from '../../constants';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

function Countdown() {
  const [countdown, setCountdown] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const targetDate = endOfDay(new Date());
    const intervalId = setInterval(() => {
      const remainingTime = differenceInSeconds(targetDate, new Date());

      const hours = String(Math.floor(remainingTime / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(
        2,
        '0'
      );
      const seconds = String(remainingTime % 60).padStart(2, '0');

      setCountdown({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="font-customSans font-bold text-stone-600 dark:text-stone-300">
      {countdown.hours}:{countdown.minutes}:{countdown.seconds}s
    </p>
  );
}

export default function Header({ className }: Props) {
  const navigate = useNavigate();
  return (
    <header className={className}>
      <div className="h-full w-full flex items-center justify-between">
        <Link to="/">
          <h1 className="text-3xl font-bold text-shadow-sm font-disp text-emerald-700">
            Worlder
          </h1>
        </Link>

        <h2 className="flex flex-wrap text-sm flex-1 justify-center">
          <span className="font-bold mr-2">Next puzzle:</span>
          <Countdown />
        </h2>

        <div className="flex justify-end items-center space-x-3">
          <button
            type="button"
            className="text-3xl p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded"
            onClick={() => navigate(ROUTES.LEADERBOARDS)}
          >
            <BiTable />
          </button>
          {/* <HowToPlayModal /> */}
          <DarkModeToggle />
          {/* <Dropdown Icon={BiCog}>
            <LoginButton />
          </Dropdown> */}
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  className: '',
};
