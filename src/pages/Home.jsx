import { Link } from 'react-router-dom';

const categories = [
  { name: "Maison", emoji: "🏠" },
  { name: "Jardin", emoji: "🌿" },
  { name: "Noël", emoji: "🎄" },
  { name: "Fête des Mères", emoji: "💐" },
  { name: "Fête des Pères", emoji: "👔" },
  { name: "Fêtes des Grands-Parents", emoji: "👵" },
  { name: "Zen", emoji: "🧘" },
  { name: "Divers", emoji: "✨" },
];

export default function Home() {
  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-900">Gravure & Moi</h1>
        <p className="text-lg text-gray-600 mt-3">Personnalisation par gravure laser</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.name}
            to={`/category/${cat.name}`}
            className="bg-white rounded-3xl shadow hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="h-52 flex items-center justify-center text-7xl bg-gradient-to-br from-amber-100 to-amber-200">
              {cat.emoji}
            </div>
            <div className="p-5 text-center">
              <h3 className="font-semibold text-xl">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
