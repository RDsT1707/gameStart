import React from "react";
import { useGames } from "@/hooks/useGames";
import { useDispatch } from "react-redux";
import { addGame } from "@/store/slices/cartSlice";

export default function ProductsPage() {
  const { games, loading } = useGames();
  const dispatch = useDispatch();

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Boutique de jeux vidéo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="border rounded shadow p-4">
            <img src={game.thumbnail} alt={game.title} className="mb-2 rounded" />
            <h2 className="font-semibold">{game.title}</h2>
            <button
              onClick={() => dispatch(addGame({ ...game, price: 0 }))} // prix à gérer ou simuler
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
