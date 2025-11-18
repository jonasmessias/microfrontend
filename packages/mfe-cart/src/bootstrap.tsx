import { createRoot } from 'react-dom/client';
import Cart from './Cart';
import './index.css'; // Import Tailwind CSS for standalone mode

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Cart />);
}
