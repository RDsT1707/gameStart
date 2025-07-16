"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice"; // adapte le chemin si besoin
import Link from "next/link";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  platform: string;
  price: number;
  discountPrice?: number;
  popularity?: number;
}

export default function AllGamesPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        // Ici tu peux faire le calcul du prix / discount comme dans ton homepage
        const gamesWithPrice = data.map((game: Game) => {
          let price;
          const rand = Math.random();
          if (rand < 0.2) {
            price = Math.floor(Math.random() * 10);
          } else if (rand < 0.6) {
            price = Math.floor(Math.random() * 21) + 10;
          } else {
            price = Math.floor(Math.random() * 21) + 30;
          }
          const discountPrice = Math.round(price * 0.7);
          const popularity = Math.floor(Math.random() * 1000);
          return { ...game, price, discountPrice, popularity };
        });

        setGames(gamesWithPrice);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des jeux.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredGames(games);
      return;
    }
    setFilteredGames(
      games.filter((game) => game.title.toLowerCase().includes(searchTerm))
    );
  }, [searchTerm, games]);

  const handleAddToCart = (game: Game) => {
    dispatch(
      addToCart({
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
        price: game.discountPrice ?? game.price,
      })
    );
  };

  if (loading) return <p className="p-8 text-center">Chargement...</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#FF8200]">
        Résultats pour :{" "}
        <span className="text-white">{searchTerm || "Tous les jeux"}</span>
      </h1>

      {filteredGames.length === 0 && (
        <p className="text-center text-white">Aucun jeu trouvé.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-[#1E1E1E] border-2 border-[#FF8200] rounded-lg shadow-md p-4 flex flex-col"
          >
            <Link href={`/products/${game.id}`} className="mb-4">
              <img
                src={game.thumbnail || "/placeholder.png"}
                alt={game.title}
                className="rounded-md w-full h-40 object-cover border-b-2 border-[#FF8200]"
              />
              <h2 className="mt-2 font-semibold text-white truncate">{game.title}</h2>
            </Link>

            <div className="mt-auto">
              <p className="text-[#FF8200] font-bold text-lg">
                {game.discountPrice ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">
                      {game.price} €
                    </span>
                    {game.discountPrice} €
                  </>
                ) : (
                  `${game.price} €`
                )}
              </p>

              <button
                onClick={() => handleAddToCart(game)}
                className="mt-3 w-full py-2 rounded bg-[#FF8200] text-[#1E1E1E] font-semibold hover:bg-orange-600 transition"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
