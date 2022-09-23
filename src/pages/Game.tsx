import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MapsWrapper from '../components/Map/MapsWrapper';
import { ROUTES } from '../constants';
import getTodaysLocation from '../assets/challengeLocations/locations';

export default function Game() {
  const [name, setName] = useState('');
  const [todaysLocation, setTodaysLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const playername = location?.state ? location.state.name : null;

  // Check if player has entered a name, if not redirect to home
  useEffect(() => {
    if (!playername) {
      navigate(ROUTES.HOME);
    } else {
      setName(playername);
    }
  }, [playername, navigate]);

  useEffect(() => {
    async function fetchLocation() {
      const latLng = await getTodaysLocation(new Date('2022-10-01'));
      console.log(latLng);
      setTodaysLocation(latLng);
    }

    fetchLocation();
  }, []);

  // Only render the game if the player has entered a name. This prevents unnecessary google api calls
  return name && todaysLocation ? (
    <MapsWrapper challengeLocation={todaysLocation} />
  ) : null;
}
