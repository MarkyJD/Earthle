import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MapsWrapper from '../components/Map/MapsWrapper';
import { ROUTES } from '../constants';
import GameProvider from '../providers/GameProvider';

export default function Game() {
  const [name, setName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const playername = location?.state ? location.state.name : null;
  const debugDate = location?.state ? location.state.debugDate : null;

  // Check if player has entered a name, if not redirect to home
  useEffect(() => {
    if (!playername) {
      navigate(ROUTES.HOME);
    } else {
      setName(playername);
    }
  }, [playername, navigate]);

  // Only render the game if the player has entered a name. This prevents unnecessary google api calls
  return name ? (
    <GameProvider debugDate={debugDate}>
      <MapsWrapper playername={playername} />
    </GameProvider>
  ) : null;
}
