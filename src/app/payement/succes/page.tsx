"use client"; 
// Nécessaire pour utiliser les hooks côté client dans Next.js app router

import React, { useEffect } from "react";
import Link from "next/link";
// Composant Next.js pour navigation interne

import { useDispatch, useSelector } from "react-redux";
// Hooks pour dispatcher des actions et lire le state Redux

import { clearCart } from "@/store/slices/cartSlice";
// Action pour vider le panier

import { RootState } from "@/store/store";
// Type du state global Redux

export default function SuccessPage() {
  const dispatch = useDispatch();

  // Récupère le contenu actuel du panier dans le store Redux
  const cart = useSelector((state: RootState) => state.cart?.panier ?? []);

  // Effet qui vide le panier dès que la page est chargée, mais uniquement si le panier n'est pas déjà vide
  useEffect(() => {
    if (cart.length > 0) {
      dispatch(clearCart());
    }
  }, [cart, dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1e1e1e] text-white p-8">
      {/* Titre vert pour le succès */}
      <h1 className="text-4xl font-bold mb-6 text-green-500">Paiement réussi !</h1>

      {/* Message de remerciement */}
      <p className="mb-6 text-center max-w-md">
        Merci pour ta commande. Les codes des jeux achetés seront envoyés sur ton email.
      </p>

      {/* Lien pour revenir à l'accueil */}
      <Link href="/" className="mt-4 text-orange-400 underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}
