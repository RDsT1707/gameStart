'use client'; // à garder si tu es dans app/

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import type { Game } from 'src/app/types/games';

export default function MonComptePage() {
  const credit = useSelector((state: RootState) => state.credit.amount);

  const purchasedGames = useSelector(
    (state: RootState) => state.credit.purchasedGames
  ) ?? [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mon compte</h1>

      <p className="text-lg">
        Crédit disponible : <span className="font-semibold">{credit} €</span>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Jeux achetés :</h2>
      {purchasedGames.length === 0 ? (
        <p>Aucun jeu acheté pour l’instant.</p>
      ) : (
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
