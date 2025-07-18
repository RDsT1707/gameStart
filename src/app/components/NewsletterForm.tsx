'use client'; // Active le mode client de Next.js pour pouvoir utiliser les hooks et gérer les événements

import React from "react";

export default function NewsletterForm() {
  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    alert("Merci pour ton inscription !"); // Message de confirmation
    // Ici, tu pourrais aussi envoyer les données à une API si besoin
  };

  return (
    // Formulaire avec un input email et un bouton
    <form onSubmit={handleSubmit} className="flex gap-2">
      {/* Champ de saisie pour l'email */}
      <input
        type="email"
        placeholder="Ton email"
        required // Obligatoire pour valider le formulaire
        className="border px-3 py-2 rounded w-60" // Style Tailwind pour un input simple
      />

      {/* Bouton pour envoyer le formulaire */}
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        S’inscrire
      </button>
    </form>
  );
}
