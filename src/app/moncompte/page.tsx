'use client'; 
// Obligatoire dans app/ pour activer les hooks côté client

import React from 'react';
import { useSelector } from 'react-redux';
// Hook pour lire des données dans le store Redux

import type { RootState } from "@/store/store";
// Type TypeScript du state global Redux

import type { Game } from 'src/app/types/games';
// Type personnalisé pour un jeu

export default function MonComptePage() {
  // Récupère le crédit disponible dans le store Redux
  const credit = useSelector((state: RootState) => state.credit.amount);

  // Récupère la liste des jeux achetés (ou tableau vide si aucun)
  const purchasedGames = useSelector(
    (state: RootState) => state.credit.purchasedGames
  ) ?? [];

  return (
    <div className="p-4">
      {/* Titre principal */}
      <h1 className="text-2xl font-bold mb-4">Mon compte</h1>

      {/* Affichage du crédit dispo */}
      <p className="text-lg">
        Crédit disponible : <span className="font-semibold">{credit} €</span>
      </p>

      {/* Section jeux achetés */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Jeux achetés :</h2>

      {/* Si aucun jeu acheté, on affiche un message */}
      {purchasedGames.length === 0 ? (
        <p>Aucun jeu acheté pour l’instant.</p>
      ) : (
        // Sinon on liste les jeux avec titre et prix
        <ul className="list-disc list-inside space-y-2">
          {purchasedGames.map((game: Game) => (
            <li key={game.id}>
              {game.title} - {game.price} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
