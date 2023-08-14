import { createContext } from 'react';
import { TAuthContext } from '../../typings';

const AuthContext = createContext<TAuthContext>({
  cookie: null,
  updateCookie: () => {},
  app: null,
  db: null,
  provider: null,
  authUser: null,
  signInWithEmailAndPassword: () => {},
  signOut: () => {},
});

export default AuthContext;
