import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import About from './pages/About';
import Root from './pages/Root';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route element={<Root />} path="/" />
          <Route element={<About />} path="/about" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
