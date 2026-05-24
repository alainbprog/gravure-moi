import { Link } from 'react-router-dom';

const categories = [
  { name: "Maison", emoji: "🏠", color: "amber" },
  { name: "Jardin", emoji: "🌱", color: "emerald" },
  { name: "Noël", emoji: "🎄", color: "red" },
  { name: "Fête des Mères", emoji: "🌸", color: "pink" },
  { name: "Fête des Pères", emoji: "🛠️", color: "blue" },
  { name: "Fêtes des Grands-Parents", emoji: "👴", color: "purple" },
  { name: "Zen", emoji: "☯️", color: "teal" },
  { name: "Divers", emoji: "✨", color: "stone" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-bg h-screen flex items-center justify-center text-white pt-16">
        <div className="text-center max-w-3xl px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            Créez des objets<br />uniques
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-amber-100">
            Gravure laser personnalisée • Qualité artisanale • Livraison rapide
          </p>
          <Link 
            to="/category/Maison"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold px-10 py-4 rounded-2xl transition"
          >
            Découvrir nos collections
          </Link>
        </div>
      </div>

      {/* Catégories */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Nos Collections</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-56 flex items-center justify-center text-8xl bg-gradient-to-br from-amber-50 to-amber-100 group-hover:scale-110 transition-transform">
                {cat.emoji}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
