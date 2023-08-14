/* eslint-disable react/jsx-no-constructed-context-values */
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthContext from '../contexts/AuthContext';
import useCookie from '../hooks/useCookie';
import { app, db, provider } from '../firebase/firebase';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookie, updateCookie] = useCookie();
  const auth = getAuth(app);
  const [authUser, loading, error] = useAuthState(auth);

  return (
    <AuthContext.Provider
      value={{
        cookie,
        updateCookie,
        app,
        db,
        provider,
        authUser,
        signInWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
