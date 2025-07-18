"use client"; 
// Nécessaire dans app/ pour activer les hooks côté client

import { useEffect, useState } from "react";
import Link from "next/link";
// Pour la navigation interne Next.js

import { useDispatch } from "react-redux";
// Pour dispatcher des actions Redux

import { addToCart } from "src/store/slices/cartSlice";
// Action pour ajouter un produit au panier

// Définition du type Game avec les props importantes qu'on utilise ici
interface Game {
  id: number;
  title: string;
  thumbnail: string;
  platform: string;
}

export default function ProductsPage() {
  // State local pour stocker la liste des jeux récupérés depuis l'API
  const [games, setGames] = useState<Game[]>([]);
  // State local pour le texte saisi dans la barre de recherche
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // Au chargement du composant, on récupère la liste des jeux via fetch
  useEffect(() => {
    fetch("https://www.freetogame.com/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  // Filtre les jeux selon la recherche (insensible à la casse)
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  // Fonction pour ajouter un jeu au panier avec un prix fixe (20 ici)
  function handleAdd(game: Game) {
    dispatch(
      addToCart({
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
        price: 20,
      })
    );
  }

  return (
    <div className="relative p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Barre de recherche */}
      <div className="mb-6 max-w-md mx-auto sm:mx-0">
        <input
          type="text"
          placeholder="Rechercher un jeu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full py-2 px-4 text-black focus:outline-none focus:ring-2 focus:ring-[#FF8200] transition"
        />
      </div>

      {/* Grille responsive affichant les jeux filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        {filteredGames.map((game) => (
          // Chaque jeu est un lien vers sa page détail
          <Link href={`/products/${game.id}`} key={game.id} passHref>
            <a
              className="bg-[#444] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col"
              aria-label={`Détails du jeu ${game.title}`}
            >
              {/* Image du jeu */}
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="p-3 flex flex-col flex-grow">
                {/* Titre du jeu */}
                <h3 className="font-bold text-center mb-1 truncate">{game.title}</h3>
                {/* Plateforme */}
                <p className="text-sm text-center text-gray-300 truncate">
                  {game.platform}
                </p>
                {/* Badges prix fictifs */}
                <div className="flex justify-center gap-2 mt-2">
                  <span className="bg-[#FF8200] px-2 py-0.5 rounded text-xs whitespace-nowrap">
                    PRIX PLEIN
                  </span>
                  <span className="bg-[#cc6b00] px-2 py-0.5 rounded text-xs whitespace-nowrap">
                    PRIX RÉDUIT
                  </span>
                </div>
                {/* Bouton ajouter au panier */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Empêche la navigation au clic
                    e.stopPropagation(); // Empêche la propagation du clic au lien
                    handleAdd(game);
                  }}
                  className="mt-auto w-full bg-[#FF8200] hover:bg-orange-600 text-[#1E1E1E] py-2 rounded font-semibold transition"
                  aria-label={`Ajouter ${game.title} au panier`}
                >
                  Ajouter au panier
                </button>
              </div>
            </a>
          </Link>
        ))}
      </div>

      {/* Bouton flottant pour accéder au panier, bien visible sur mobile et desktop */}
      <Link href="/cart" passHref>
        <button
          aria-label="Voir le panier"
          className="fixed right-2 bottom-4 sm:top-1/2 sm:right-0 sm:-translate-y-1/2 sm:rotate-90 bg-[#FF8200] text-white font-bold py-2 px-6 rounded-full shadow-lg z-50 transition hover:bg-orange-600"
        >
          PANIER
        </button>
      </Link>
    </div>
  );
}
