"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Link from "next/link";

interface Game {
  id: number;
  title: string;
  thumbnail?: string;
  price: number;
}

export default function Bibliotheque() {
  const purchasedGames = useSelector(
    (state: RootState) => state.cart.panier as Game[]
  );

  if (!purchasedGames || purchasedGames.length === 0)
    return (
      <div className="container mx-auto p-8 bg-[#1E1E1E] min-h-screen text-white flex items-center justify-center">
        <p className="text-center text-white text-xl">Votre bibliothèque est vide.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-8 bg-[#1E1E1E] min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-[#FF8200] text-right">Ma Bibliothèque</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {purchasedGames.map((game) => (
          <Link
            key={game.id}
            href={`/products/${game.id}`}
            className="block bg-[#292929] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={game.thumbnail || "/placeholder.png"}
              alt={game.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg truncate">{game.title}</h2>
              <p className="text-[#FF8200] font-bold">{game.price} €</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
