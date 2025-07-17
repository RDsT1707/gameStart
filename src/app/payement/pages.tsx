"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Game } from "src/app/types/games"; // id est number ici

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // panier typé Game[], id est number
  const cart = useSelector((state: RootState) => state.cart.panier) as Game[] | undefined;

  // Total price avec fallback 0 si price undefined
  const totalPrice = cart?.reduce((acc, game) => acc + (game.price ?? 0), 0) ?? 0;

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

  // Suppression dans le panier : id est number
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 bg-[#1E1E1E] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-[#FF8200] text-right">Ton panier</h1>

      <ul className="space-y-4">
        {cart.map((game) => (
          <li
            key={game.id}
            className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-[#292929] hover:shadow-lg transition"
          >
            <img
              src={game.thumbnail || "/placeholder.png"}
              alt={game.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{game.title}</p>
              <p className="text-[#FF8200] font-bold">
                {/* Si price undefined, affiche 0.00 */}
                {(game.price ?? 0).toFixed(2)} €
              </p>
            </div>
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

      {/* Tu peux ajouter un bouton vider le panier, total etc ici */}

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
