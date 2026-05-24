import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-amber-800 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">Gravure & Moi</Link>
        
        <Link to="/panier" className="flex items-center gap-2 hover:text-amber-200 transition">
          <ShoppingCart size={24} />
          <span>Panier</span>
          {itemCount > 0 && (
            <span className="bg-amber-500 text-xs rounded-full px-2 py-1">{itemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
