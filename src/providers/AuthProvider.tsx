/* eslint-disable react/jsx-no-constructed-context-values */
import AuthContext from '../contexts/AuthContext';
import useCookie from '../hooks/useCookie';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookie, updateCookie] = useCookie();
  return (
    <AuthContext.Provider value={{ cookie, updateCookie }}>
      {children}
    </AuthContext.Provider>
  );
}
