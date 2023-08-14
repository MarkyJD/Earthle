export interface TLeaderboardData {
  name: string;
  score: number;
  createdAt: firebase.firestore.serverTimestamp;
  date: string;
  uid: string;
  country: string;
}

export interface TLocation {
  date: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface TResults {
  trueLocation: google.maps.LatLngLiteral;
  guess: google.maps.LatLngLiteral;
  distance: number;
}

export interface TUser {
  authUser?: {
    uid: string;
    email: string;
    displayName: string;
  };
  guest: boolean;
  userCookie: {
    uid: string;
    name: string;
    country: string;
    timestamp: string;
    score: number;
  };
}

export interface TAuthContext {
  cookie: TUser | null;
  updateCookie: (cookie: TUser) => void;
  app: firebase.app.App | null;
  db: firebase.firestore.Firestore | null;
  provider: firebase.auth.GoogleAuthProvider | null;
  authUser: firebase.User | null;
  signInWithEmailAndPassword: Firebase.auth.Auth['signInWithEmailAndPassword'];
  signOut: Firebase.auth.Auth['signOut'];
}
