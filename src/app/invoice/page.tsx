"use client"; 
// Active les hooks et interactions côté client dans Next.js

import { useSelector, useDispatch } from "react-redux";
// Hooks pour accéder au store Redux et dispatcher des actions

import type { RootState } from "@/store/store";
// Type TypeScript pour le state global Redux

import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
// Actions Redux pour retirer un produit ou vider le panier

import { useRouter } from "next/navigation";
// Hook Next.js pour naviguer programmétiqument entre les pages

import Link from "next/link";
// Composant Next.js pour les liens internes (SPA)

import type { Game } from "src/app/types/games"; 
// Type custom pour un jeu, avec id, title, price, thumbnail, etc.

export default function CartPage() {
  // Récupération du panier depuis le store Redux
  // Casting en unknown puis Game[] pour éviter certains problèmes TS
  const cart = useSelector((state: RootState) => state.cart.panier) as unknown as Game[];

  // Pour envoyer les actions Redux (remove, clear)
  const dispatch = useDispatch();

  // Pour naviguer entre les pages
  const router = useRouter();

  // Si le panier est vide, on affiche un message sympa avec un lien vers l'accueil
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

  // Tri le panier par prix croissant (utile pour la remise 4+1)
  const sortedCart = [...cart].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

  // Calcule la somme totale des prix
  const totalPrice = cart.reduce((acc, game) => acc + (game.price ?? 0), 0);

  // Remise si 5 jeux ou plus : on offre le moins cher (4+1)
  const discount = cart.length >= 5 ? sortedCart[0].price ?? 0 : 0;

  // Prix final après déduction de la remise
  const finalPrice = totalPrice - discount;

  // Fonction appelée quand l'utilisateur valide la commande
  const handleValidation = () => {
    dispatch(clearCart());         // Vide le panier dans le store
    router.push("/payement/succes"); // Redirige vers la page de succès paiement
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
            {/* Image du jeu */}
            <img
              src={game.thumbnail ?? "/placeholder.png"}
              alt={game.title}
              className="w-20 h-20 object-cover rounded"
            />
            {/* Titre et prix */}
            <div className="flex-1">
              <p className="font-semibold">{game.title}</p>
              <p className="text-[#FF8200] font-bold">{game.price?.toFixed(2)} €</p>
            </div>
            {/* Bouton pour retirer le jeu du panier */}
            <button
              onClick={() => dispatch(removeFromCart(game.id))}
              className="text-red-600 font-bold text-xl px-2 hover:text-red-800 transition"
              aria-label={`Retirer ${game.title} du panier`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Récapitulatif prix et actions */}
      <div className="text-right space-y-2">
        <p>
          Sous-total : <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
        </p>
        {/* Affiche la remise seulement si applicable */}
        {discount > 0 && (
          <p className="text-green-500 font-semibold">Remise 4+1 : -{discount.toFixed(2)} €</p>
        )}
        <p className="text-xl font-bold">
          Total : <span className="text-[#FF8200]">{finalPrice.toFixed(2)} €</span>
        </p>

        {/* Boutons vider ou valider le panier */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Vider le panier
          </button>
          <button
            onClick={handleValidation}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Valider la commande
          </button>
        </div>
      </div>
    </div>
  );
}
