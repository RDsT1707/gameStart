"use client"; 
// Obligatoire dans app/ pour activer les hooks côté client

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Pour dispatcher des actions Redux

import { addToCart } from "@/store/slices/cartSlice";
// Action pour ajouter un jeu au panier

// Type du détail d’un jeu qu’on va afficher
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
  // State pour stocker les infos du jeu récupérées
  const [game, setGame] = useState<GameDetail | null>(null);
  const dispatch = useDispatch();

  // À chaque changement d’ID, fetch les données du jeu
  useEffect(() => {
    fetch(`/api/game?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        // Si pas de prix, on génère un prix aléatoire entre 10 et 59
        if (!data.price) {
          data.price = Math.floor(Math.random() * 50) + 10;
        }
        setGame(data);
      });
  }, [params.id]);

  // Affiche un loader simple tant que les données arrivent pas
  if (!game) return <p className="p-8 text-center text-white">Chargement...</p>;

  // Ajoute ce jeu au panier avec l’action Redux
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
      {/* Image du jeu */}
      <img
        src={game.thumbnail}
        alt={game.title}
        className="rounded-lg shadow-md w-full md:w-1/2 object-cover"
        loading="lazy"
      />

      {/* Détails du jeu avec fond orange transparent */}
      <div className="flex flex-col justify-between bg-[#FF8200] bg-opacity-10 p-6 rounded-lg shadow-md w-full md:w-1/2 text-white">
        <div>
          {/* Titre */}
          <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
          {/* Catégorie et plateforme */}
          <p className="uppercase text-sm mb-4 text-gray-300">
            Catégorie : {game.genre} | Plateforme : {game.platform}
          </p>
          {/* Description avec fallback si vide */}
          <p className="text-gray-100">{game.description || "Pas de description disponible."}</p>
        </div>

        {/* Prix et bouton ajouter au panier */}
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
