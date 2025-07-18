"use client"; 
// Obligatoire dans Next.js app router pour utiliser les hooks côté client

import { useSelector, useDispatch } from "react-redux";
// Hooks Redux pour lire le state et envoyer des actions

import type { RootState } from "@/store/store";
// Type global du store Redux

import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
// Actions pour retirer un jeu ou vider le panier

import { useRouter } from "next/navigation";
// Hook Next.js pour naviguer entre pages (non utilisé ici mais prêt)

import Link from "next/link";
// Composant pour liens internes Next.js

import type { Game } from "src/app/types/games";
// Type personnalisé d’un jeu (avec id number)

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Récupère le panier dans le store Redux, typé Game[] ou undefined
  const cart = useSelector((state: RootState) => state.cart.panier) as Game[] | undefined;

  // Calcule le prix total, en sommant les prix (fallback à 0 si prix indéfini)
  const totalPrice = cart?.reduce((acc, game) => acc + (game.price ?? 0), 0) ?? 0;

  // Si panier vide ou non défini, on affiche un message sympa avec un lien retour accueil
  if (!cart || cart.length === 0) {
    return (
      <div className="p-8 text-center bg-[#1E1E1E] min-h-screen text-white flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Ton panier est vide 🛒</p>
        <Link href="/" className="text-[#FF8200] underline font-semibold">
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  // Fonction pour supprimer un jeu du panier en dispatchant son id
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 bg-[#1E1E1E] min-h-screen text-white">
      {/* Titre de la page */}
      <h1 className="text-3xl font-bold mb-4 text-[#FF8200] text-right">Ton panier</h1>

      {/* Liste des jeux dans le panier */}
      <ul className="space-y-4">
        {cart.map((game) => (
          <li
            key={game.id}
            className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-[#292929] hover:shadow-lg transition"
          >
            {/* Image du jeu ou placeholder */}
            <img
              src={game.thumbnail || "/placeholder.png"}
              alt={game.title}
              className="w-20 h-20 object-cover rounded"
            />
            {/* Titre et prix */}
            <div className="flex-1">
              <p className="font-semibold">{game.title}</p>
              <p className="text-[#FF8200] font-bold">
                {(game.price ?? 0).toFixed(2)} €
              </p>
            </div>
            {/* Bouton pour retirer ce jeu */}
            <button
              onClick={() => handleRemove(game.id)}
              className="text-red-600 font-bold text-xl px-2 hover:text-red-800 transition"
              aria-label={`Retirer ${game.title} du panier`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Résumé total et bouton vider le panier */}
      <div className="text-right space-y-2 mt-4">
        <p>
          Total : <span className="font-bold text-[#FF8200]">{totalPrice.toFixed(2)} €</span>
        </p>
        <button
          onClick={() => dispatch(clearCart())}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
}
