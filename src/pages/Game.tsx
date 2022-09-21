import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MapsWrapper from '../components/Map/MapsWrapper';

export default function Game() {
  const [name, setName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const playername = location?.state ? location.state.name : null;

  // Check if player has entered a name, if not redirect to home
  useEffect(() => {
    if (!playername) {
      navigate('/');
    } else {
      setName(playername);
    }
  }, [playername, navigate]);

  // Only render the game if the player has entered a name. This prevents unnecessary google api calls
  return name ? <MapsWrapper /> : null;
}
