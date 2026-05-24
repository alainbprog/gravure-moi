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
    price: 34.90 + (i * 4),
    image: exampleImages[category] || "https://picsum.photos/id/201/800/600",
    category: category
  }));

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-4xl font-bold text-amber-900 mb-8">{category}</h1>

      {isMaison && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Sous-catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Chambre Fille", "Chambre Garçon", "Chambre Parents", "Salon", "Cuisine", "WC"].map(sub => (
              <div key={sub} className="bg-white p-4 rounded-2xl text-center font-medium shadow-sm">
                {sub}
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">Objets à graver</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover" 
            />
            
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-1">{product.name}</h3>
              <p className="text-2xl font-bold text-amber-700 mb-6">{product.price.toFixed(2)} €</p>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => openCustomization(product)}
                  className="py-4 border border-amber-700 text-amber-700 rounded-2xl font-medium hover:bg-amber-50"
                >
                  Personnaliser
                </button>
                <button 
                  onClick={() => addToCart({ ...product, customText: "Texte par défaut" })}
                  className="py-4 bg-amber-700 text-white rounded-2xl font-medium hover:bg-amber-800"
                >
                  Ajouter
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
