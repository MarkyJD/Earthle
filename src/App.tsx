import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Theme from './contexts/Theme';
import useDarkMode from './hooks/useDarkMode';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
