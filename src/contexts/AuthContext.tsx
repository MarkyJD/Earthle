import { createContext } from 'react';
import { TAuthContext } from '../../typings';

const AuthContext = createContext<TAuthContext>({
  cookie: null,
  updateCookie: () => {},
});

export default AuthContext;
