"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

interface GameDetail {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  platform: string;
  description: string;
  price: number;
}

export default function GameDetailPage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<GameDetail | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/game?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.price) {
          data.price = Math.floor(Math.random() * 50) + 10;
        }
        setGame(data);
      });
  }, [params.id]);

  if (!game) return <p className="p-8 text-center text-white">Chargement...</p>;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
        price: game.price,
      })
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      <img
        src={game.thumbnail}
        alt={game.title}
        className="rounded-lg shadow-md w-full md:w-1/2 object-cover"
        loading="lazy"
      />
      <div className="flex flex-col justify-between bg-[#FF8200] bg-opacity-10 p-6 rounded-lg shadow-md w-full md:w-1/2 text-white">
        <div>
          <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
          <p className="uppercase text-sm mb-4 text-gray-300">
            Catégorie : {game.genre} | Plateforme : {game.platform}
          </p>
          <p className="text-gray-100">{game.description || "Pas de description disponible."}</p>
        </div>
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="text-2xl font-bold">{game.price} €</span>
          <button
            onClick={handleAddToCart}
            className="bg-[#1E1E1E] text-[#FF8200] px-6 py-2 rounded font-bold hover:bg-gray-800 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
