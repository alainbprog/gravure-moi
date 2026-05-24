import { useParams, useState } from 'react';
import { useCart } from '../context/CartContext';
import CustomizationModal from '../components/CustomizationModal';

const exampleImages = {
  "Maison": "https://picsum.photos/id/1015/800/600",
  "Jardin": "https://picsum.photos/id/133/800/600",
  "Noël": "https://picsum.photos/id/201/800/600",
  "Fête des Mères": "https://picsum.photos/id/64/800/600",
  "Fête des Pères": "https://picsum.photos/id/201/800/600",
  "Fêtes des Grands-Parents": "https://picsum.photos/id/669/800/600",
  "Zen": "https://picsum.photos/id/866/800/600",
  "Divers": "https://picsum.photos/id/201/800/600",
};

export default function CategoryPage() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isMaison = category === "Maison";

  const openCustomization = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const products = [1, 2, 3, 4, 5].map(i => ({
    id: `gravure-${category.toLowerCase()}-${i}`,
    name: `Objet personnalisé ${i}`,
    price: 39.90 + (i * 5),
    image: exampleImages[category],
    category
  }));

  return (
    <div className="pt-20 max-w-6xl mx-auto px-6 pb-20">
      <h1 className="text-5xl font-bold text-amber-950 mb-3">{category}</h1>
      <p className="text-lg text-gray-600 mb-12">Personnalisez vos objets par gravure laser</p>

      {isMaison && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Sous-catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Chambre Fille", "Chambre Garçon", "Chambre Parents", "Salon", "Cuisine", "WC"].map(sub => (
              <div key={sub} className="bg-white border border-amber-100 p-5 rounded-2xl text-center font-medium hover:border-amber-300 transition">
                {sub}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="p-7">
              <h3 className="font-semibold text-2xl mb-2">{product.name}</h3>
              <p className="text-3xl font-bold text-amber-700 mb-6">{product.price.toFixed(2)} €</p>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => openCustomization(product)}
                  className="py-4 border-2 border-amber-800 text-amber-800 rounded-2xl font-medium hover:bg-amber-50 transition"
                >
                  Personnaliser
                </button>
                <button 
                  onClick={() => addToCart({ ...product, customText: "Texte personnalisé" })}
                  className="py-4 bg-amber-800 text-white rounded-2xl font-medium hover:bg-amber-900 transition"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomizationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
      />
    </div>
  );
}
