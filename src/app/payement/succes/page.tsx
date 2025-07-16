"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { acheterJeux } from "@/store/slices/creditSlice";
import { clearCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";

export default function SuccessPage() {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart?.panier ?? []); // 🛠️ protection ici

 useEffect(() => {
  if (cart.length > 0) {
    dispatch(acheterJeux(cart)); // ajoute tous les jeux achetés dans la bibliothèque
    dispatch(clearCart());       // vide le panier
  }
}, [cart, dispatch]);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1e1e1e] text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-green-500">Paiement réussi !</h1>
      <p className="mb-6 text-center max-w-md">
        Merci pour ta commande. Les codes des jeux achetés seront envoyés sur ton email.
      </p>
      <Link href="/" className="mt-4 text-orange-400 underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}
