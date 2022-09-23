import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ROUTES } from './constants';
import Theme from './contexts/Theme';
import useDarkMode from './hooks/useDarkMode';
import Game from './pages/Game';
import Home from './pages/Home';
import Leaderboards from './pages/Leaderboards';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PLAY} element={<Game />} />
      <Route path={ROUTES.LEADERBOARDS} element={<Leaderboards />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  return (
    // @ts-ignore
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Theme.Provider value={{ isDarkMode, toggleDarkMode }}>
      <Router>
        <Layout>
          <App />
        </Layout>
      </Router>
    </Theme.Provider>
  );
}
