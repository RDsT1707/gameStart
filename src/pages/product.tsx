import React from "react";
import { useDispatch } from "react-redux";
import { addGame } from "@/store/slices/cartSlice";

// Remplace par ton vrai hook ou logique d'import des jeux
function useGames() {
  // Simule des données pour l'exemple
  const [loading, setLoading] = React.useState(false);
  const games = [
    { id: 1, title: "FIFA 25", thumbnail: "/fifa25.jpg", price: 49.99 },
    { id: 2, title: "Zelda", thumbnail: "/zelda.jpg", price: 39.99 },
    // ...
  ];
  return { games, loading };
}

export default function ProductsPage() {
  const { games, loading } = useGames();
  const dispatch = useDispatch();

  if (loading) return <p className="p-8 text-center">Chargement...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#FF8200] text-right">
        Boutique de jeux vidéo
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-[#1E1E1E] rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col items-center"
            style={{ boxShadow: "0 2px 8px 0 rgba(200,200,200,0.10)" }}
          >
            <img
              src={game.thumbnail}
              alt={game.title}
              className="mb-3 rounded w-full h-32 object-cover"
            />
            <h2 className="font-semibold text-white mb-2 text-center">
              {game.title}
            </h2>
            <p className="text-[#FF8200] font-bold mb-2">{game.price} €</p>
            <button
              onClick={() => dispatch(addGame(game))}
              className="bg-[#FF8200] text-[#1E1E1E] px-4 py-2 rounded font-semibold hover:bg-orange-600 transition w-full"
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
