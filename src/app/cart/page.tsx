"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Game } from "src/app/types/games"; // Corrigé le path

export default function CartPage() {
  // Récupère les jeux du panier depuis le store Redux
  const cart = useSelector((state: RootState) => state.cart.panier) as Game[];
  const dispatch = useDispatch();
  const router = useRouter();

  // Si le panier est vide
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

  // Trie les jeux par prix croissant (utile pour appliquer la promo)
  const sortedCart = [...cart].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

  // Calcule le prix total
  const totalPrice = cart.reduce((acc, game) => acc + (game.price ?? 0), 0);

  // Applique une réduction (le jeu le moins cher offert) si 5 jeux ou plus
  const discount = cart.length >= 5 ? sortedCart[0].price ?? 0 : 0;

  // Prix final après remise éventuelle
  const finalPrice = totalPrice - discount;

  // Quand on valide la commande
  const handleValidation = () => {
    dispatch(clearCart()); // vide le panier
    router.push("/payement/succes"); // redirige vers la page de succès
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 bg-[#1E1E1E] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-[#FF8200] text-right">Ton panier</h1>

      {/* Liste des jeux dans le panier */}
      <ul className="space-y-4">
        {cart.map((game) => (
          <li
            key={game.id}
            className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-[#292929] hover:shadow-lg transition"
          >
            <img
              src={game.thumbnail ?? "/placeholder.png"}
              alt={game.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{game.title}</p>
              <p className="text-[#FF8200] font-bold">
                {game.price?.toFixed(2)} €
              </p>
            </div>
            {/* Bouton pour retirer un jeu du panier */}
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

      {/* Récapitulatif des prix */}
      <div className="text-right space-y-2">
        <p>
          Sous-total :{" "}
          <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
        </p>
        {discount > 0 && (
          <p className="text-green-500 font-semibold">
            Remise 4+1 : -{discount.toFixed(2)} €
          </p>
        )}
        <p className="text-xl font-bold">
          Total :{" "}
          <span className="text-[#FF8200]">{finalPrice.toFixed(2)} €</span>
        </p>

        {/* Actions : vider ou valider le panier */}
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
