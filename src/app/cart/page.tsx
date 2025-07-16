"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link"; // <-- ajouté ici

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.panier);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!cart || cart.length === 0) {
  return (
    <div className="p-8 text-center">
      <p className="text-xl">Ton panier est vide 🛒</p>
      <Link href="/" className="text-orange-600 underline">
        Retour à l’accueil
      </Link>
    </div>
  );
}


  // Calcul du jeu offert (le moins cher)
  const sortedCart = [...cart].sort((a, b) => a.price - b.price);
  const totalPrice = cart.reduce((acc, game) => acc + game.price, 0);
  const discount = cart.length >= 5 ? sortedCart[0].price : 0;
  const finalPrice = totalPrice - discount;

  const handleValidation = () => {
    dispatch(clearCart());
    router.push("/payement/succes");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Ton panier</h1>

      <ul className="space-y-4">
        {cart.map((game) => (
          <li
            key={game.id}
            className="flex items-center gap-4 p-4 border rounded"
          >
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{game.title}</p>
              <p className="text-gray-600">{game.price} €</p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(game.id))}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="text-right space-y-2">
        <p>Sous-total : {totalPrice} €</p>
        {discount > 0 && (
          <p className="text-green-600 font-semibold">Remise 4+1 : -{discount} €</p>
        )}
        <p className="text-xl font-bold">Total : {finalPrice} €</p>
        <div className="flex justify-end gap-4">
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
