import {createRoot} from 'react-dom/client';
import App from './components/App';
import '@chanzuckerberg/eds/lib/tokens/css/variables.css';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(<App />);
