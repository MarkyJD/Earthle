export const ROUTES = {
  HOME: '/',
  LEADERBOARDS: '/leaderboards',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PLAY: '/play',
};

export const GUESS_MAP_FIELDS = {
  CENTER: { lat: 0, lng: 0 },
  ZOOM: 2,
  // GREEN_ICON: 'https://maps.google.com/mapfiles/marker_green.png',
  // BLUE_ICON: 'https://maps.google.com/mapfiles/marker_blue.png',
  GREEN_ICON: 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png',
  BLUE_ICON:
    'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png',
};

export const CHALLENGE_MAP_FIELDS = {
  // Eiffel Tower
  DEFAULT_LOCATION: {
    lat: 48.85783227207914,
    lng: 2.295226175151347,
  },
  RADIUS: 100000,
};
