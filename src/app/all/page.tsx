"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

// Définition du type pour un jeu
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
  const [games, setGames] = useState<Game[]>([]);        // Liste des jeux
  const [loading, setLoading] = useState(true);          // Etat de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs
  const dispatch = useDispatch();                         // Pour dispatcher une action Redux

  // Récupération des jeux au chargement de la page
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get<Game[]>("/api/games")
      .then((res) => {
        // On ajoute un prix aléatoire, une remise et une popularité fictive à chaque jeu
        const gamesWithPrice = res.data.map((game) => {
          const price = Math.floor(Math.random() * 31) + 20; // Prix entre 20€ et 50€
          const discountPrice = Math.round(price * 0.7);     // Prix remisé à -30%
          const popularity = Math.floor(Math.random() * 1000); // Score fictif de popularité
          return { ...game, price, discountPrice, popularity };
        });
        setGames(gamesWithPrice);
      })
      .catch(() => setError("Erreur lors du chargement des jeux."))
      .finally(() => setLoading(false));
  }, []);

  // Fonction pour ajouter un jeu au panier
  const handleAddToCart = (game: Game) => {
    dispatch(
      addToCart({
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
        price: game.discountPrice ?? game.price, // On met le prix remisé s’il existe
      })
    );
  };

  // Composant carte pour un jeu
  const GameCard = ({ game }: { game: Game }) => (
    <div
      className="w-full sm:w-[220px] flex flex-col rounded hover:shadow-lg transition p-2"
      style={{
        background: "#1E1E1E",
        color: "#fff",
        border: "2px solid #ff840046",
      }}
    >
      {/* Lien vers la fiche produit du jeu */}
      <Link href={`/products/${game.id}`}>
        <img
          src={game.thumbnail || "/placeholder.png"}
          alt={game.title}
          className="rounded w-full h-36 object-cover border-b-2"
          style={{ borderColor: "#FF8200" }}
        />
        <p className="mt-2 font-semibold truncate">{game.title}</p>

        {/* Affichage du prix avec ou sans remise */}
        {game.discountPrice ? (
          <p>
            <span className="line-through text-gray-400 mr-2">{game.price} €</span>
            <span style={{ color: "#FF8200", fontWeight: "bold" }}>
              {game.discountPrice} €
            </span>
          </p>
        ) : (
          <p style={{ color: "#FF8200", fontWeight: "bold" }}>{game.price} €</p>
        )}
      </Link>

      {/* Bouton d'ajout au panier */}
      <button
        onClick={() => handleAddToCart(game)}
        className="mt-2 rounded py-1 font-semibold transition"
        style={{
          background: "#FF8200",
          color: "#1E1E1E",
        }}
      >
        Ajouter au panier
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      <h1 className="text-4xl font-bold text-orange-500 mb-6 pl-6">Tous les jeux</h1>

      {/* Affichage des états : chargement / erreur / liste */}
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
