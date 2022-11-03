import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Root from './pages/Root';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Use react-router for client-side routing - https://reactrouter.com/en/main. Here we
      define our top-level routes. Subcomponents can container their own routes to achieve nested
      routes. */}
      <BrowserRouter>
        <Routes>
          <Route element={<Root />} path="/" />
          <Route element={<About />} path="/about" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
