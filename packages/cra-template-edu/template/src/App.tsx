import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import About from './pages/About';
import Root from './pages/Root';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route element={<Root />} path="/" />
        <Route element={<About />} path="/about" />
      </Routes>
    </BrowserRouter>
  );
}
