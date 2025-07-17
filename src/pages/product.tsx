"use client";

import React from "react";
import { useDispatch } from "react-redux";
import useGames from "@/hooks/useGames";
import { addToCart } from "@/store/slices/cartSlice";
import type { Game } from "src/app/types/games";

export default function ProductsPage() {
  const { games, loading, error } = useGames();
  const dispatch = useDispatch();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  // On remplace price undefined par 0 pour éviter les erreurs TS
  const safeGames = games.map((game) => ({
    ...game,
    price: game.price ?? 0,
  }));

  return (
    <div>
      {safeGames.map((game: Game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
          <p>{game.price} €</p>
          <button onClick={() => dispatch(addToCart(game))}>
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}
