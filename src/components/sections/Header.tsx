import { BiCog, BiTable } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import HowToPlayModal from '../HowToPlayModal';
import logo from '../../assets/logo.png';
import DarkModeToggle from '../DarkModeToggle';
import Dropdown from '../Dropdown';
import LoginButton from '../LoginButton';
import { ROUTES } from '../../constants';

interface Props {
  className?: string;
}

export default function Header({ className }: Props) {
  const navigate = useNavigate();
  return (
    <header className={className}>
      <div className="h-full w-full flex items-center justify-between">
        <Link to="/">
          <h1 className="flex items-center text-3xl font-bold text-shadow-sm font-disp text-emerald-700">
            Earthle
          </h1>
        </Link>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="text-3xl p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded"
            onClick={() => navigate(ROUTES.LEADERBOARDS)}
          >
            <BiTable />
          </button>
          <HowToPlayModal />
          <Dropdown Icon={BiCog}>
            <DarkModeToggle />
            <LoginButton />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  className: '',
};
