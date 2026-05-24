import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-24 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Votre panier est vide</h2>
        <p className="text-gray-600">Commencez à personnaliser des objets !</p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-4xl font-bold mb-8">Votre Panier</h1>

      <div className="space-y-8">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 shadow flex flex-col md:flex-row gap-6">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full md:w-48 h-48 object-cover rounded-2xl" 
            />

            <div className="flex-1">
              <h3 className="font-semibold text-xl">{item.name}</h3>
              <p className="text-amber-700">{item.category}</p>

              {item.customText && (
                <div className="mt-3 p-3 bg-amber-50 rounded-2xl">
                  <p className="text-sm text-amber-800">Gravure :</p>
                  <p className="italic">"{item.customText}"</p>
                </div>
              )}

              {item.customImage && (
                <div className="mt-4">
                  <p className="text-sm text-amber-800 mb-2">Image gravée :</p>
                  <img src={item.customImage} alt="gravure" className="h-24 object-contain border rounded-xl" />
                </div>
              )}

              <div className="flex items-center gap-4 mt-6">
                <button 
                  onClick={() => changeQuantity(item.id, Math.max(1, item.quantity - 1))} 
                  className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="font-medium w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => changeQuantity(item.id, item.quantity + 1)} 
                  className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right flex flex-col justify-between">
              <p className="text-2xl font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm mt-4"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white p-8 rounded-3xl shadow">
        <div className="flex justify-between items-center text-3xl font-bold mb-8">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-xl font-semibold">
          Passer à la commande (paiement)
        </button>
      </div>
    </div>
  );
}
