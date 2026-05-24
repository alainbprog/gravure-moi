import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-amber-950 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-3xl">🔨</span>
          <div>
            <span className="text-2xl font-bold tracking-tight">Gravure & Moi</span>
            <p className="text-xs text-amber-400 -mt-1">L'empreinte des volcans</p>
          </div>
        </Link>

        <Link to="/panier" className="flex items-center gap-3 hover:text-amber-300 transition">
          <ShoppingCart size={26} />
          {itemCount > 0 && (
            <span className="bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
