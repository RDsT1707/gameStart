"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

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

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get<Game[]>("/api/games")
      .then((res) => {
        const gamesWithPrice = res.data.map((game) => {
          let price;
          const rand = Math.random();
          if (rand < 0.2) {
            price = Math.floor(Math.random() * 10); // 0€ à 9€
          } else if (rand < 0.6) {
            price = Math.floor(Math.random() * 21) + 10; // 10€ à 30€
          } else {
            price = Math.floor(Math.random() * 21) + 30; // 30€ à 50€
          }
          const discountPrice = Math.round(price * 0.7);
          const popularity = Math.floor(Math.random() * 1000);
          return { ...game, price, discountPrice, popularity };
        });
        setGames(gamesWithPrice);
      })
      .catch(() => setError("Erreur lors du chargement des jeux."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8 text-center">Chargement...</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;

  // Trier par popularité décroissante
  const gamesMostPlayed = [...games]
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, 10);

  const gamesDiscount = games.filter(
    (g) => g.discountPrice !== undefined && g.discountPrice <= 30
  );
  const gamesCheap = games.filter((g) => g.price < 10);

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

  // Composant pour une carte de jeu
  const GameCard = ({
    game,
    showDiscount = false,
    showPopularity = false,
  }: {
    game: Game;
    showDiscount?: boolean;
    showPopularity?: boolean;
  }) => (
    <Link
      href={`/products/${game.id}`}
      className="group relative block min-w-[180px] rounded-lg shadow-md hover:shadow-xl transition p-3 bg-[#1E1E1E]"
      style={{ boxShadow: "0 2px 8px 0 rgba(200, 200, 200, 0.28)" }} // Ajout du box-shadow gris clair
    >
      <img
        src={game.thumbnail || "/placeholder.png"}
        alt={game.title}
        className="rounded w-full h-32 object-cover"
      />
      <p className="mt-2 font-semibold truncate text-white">{game.title}</p>
      {showPopularity && (
        <p className="text-gray-400 text-xs">Joueurs: {game.popularity}</p>
      )}
      {showDiscount ? (
        <p>
          <span className="line-through text-gray-400 mr-2">{game.price} €</span>
          <span className="text-[#FF8200] font-bold">{game.discountPrice} €</span>
        </p>
      ) : (
        <p className="text-[#FF8200] font-bold">{game.price} €</p>
      )}

      {/* Overlay infos / bouton au hover */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-3 rounded-b-lg
        transform translate-y-full opacity-0
        transition-all duration-300
        pointer-events-none
        group-hover:translate-y-0 group-hover:opacity-100
        group-hover:pointer-events-auto"
      >
        <p>Plateforme : {game.platform}</p>
        <p>Genre : {game.genre}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(game);
          }}
          className="mt-2 w-full rounded py-1 font-semibold bg-[#FF8200] text-[#1E1E1E] shadow-md hover:bg-orange-600 transition pointer-events-auto"
        >
          Ajouter au panier
        </button>
      </div>
    </Link>
  );

  return (
    <>
      {/* Style custom scrollbar */}
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #FF8200 #1E1E1E;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 10px;
          background: #1E1E1E;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF8200;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1E1E1E;
        }
      `}</style>
      <div
        className="min-h-screen w-full"
        style={{
          background: "#1E1E1E",
          minHeight: "100vh",
          padding: "2rem 0",
        }}
      >
        <div className="container mx-auto space-y-12">
          {/* Section jeux les plus joués */}
          <section>
            <h2 className="text-3xl font-bold mb-4 mt-8" style={{ color: "#FF8200" }}>
              Jeux populiare
            </h2>
            <div
              className="flex gap-4 pb-2 custom-scrollbar"
              style={{ overflowX: "auto", overflowY: "hidden" }}
            >
              {gamesMostPlayed.map((game) => (
                <GameCard key={game.id} game={game} showDiscount showPopularity />
              ))}
            </div>
          </section>

          {/* Sections jeux à saisir */}
          <section>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#FF8200" }}>
              Jeux à saisi
            </h2>
            <div
              className="flex gap-4 pb-2 custom-scrollbar"
              style={{ overflowX: "auto", overflowY: "hidden" }}
            >
              {gamesDiscount.slice(0, 10).map((game) => (
                <GameCard key={game.id} game={game} showDiscount />
              ))}
            </div>
          </section>

          {/* Jeux à moins de 10€ */}
          <section>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#FF8200" }}>
              Jeux à moins de 10€
            </h2>
            <div
              className="flex gap-4 pb-2 custom-scrollbar"
              style={{ overflowX: "auto", overflowY: "hidden" }}
            >
              {gamesCheap.slice(0, 10).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );}