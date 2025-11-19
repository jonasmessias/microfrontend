import { createRoot } from 'react-dom/client';
import Cart from './Cart';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Cart />);
}
