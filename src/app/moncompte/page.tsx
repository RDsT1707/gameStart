"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function MonComptePage() {
  const credit = useSelector((state: RootState) => state.credit.amount);
  const purchasedGames = useSelector(
    (state: RootState) => state.credit.purchasedGames || []
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-orange">Mon compte</h1>

      {/* Section Crédit + Ajout possible plus tard */}
      <div className="bg-[#2c2c2c] p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-white"> Crédit disponible</h2>
        <p className="text-2xl text-green-400 mt-2">{credit} €</p>
        {/* TODO : bouton "Ajouter du crédit" si tu veux plus tard */}
      </div>

      {/* Section Bibliothèque */}
      <div className="bg-[#2c2c2c] p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4"> Bibliothèque de jeux</h2>

        {purchasedGames.length === 0 ? (
          <p className="text-gray-400">Aucun jeu acheté pour le moment.</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {purchasedGames.map((game) => (
              <li key={game.id} className="bg-[#1e1e1e] p-3 rounded shadow">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="font-semibold text-white truncate">{game.title}</p>
                <p className="text-sm text-gray-400">{game.price} €</p>
                <button className="mt-2 text-orange underline text-sm">
                  Télécharger
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Section Historique */}
      <div className="bg-[#2c2c2c] p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4"> Historique des commandes</h2>

        {purchasedGames.length === 0 ? (
          <p className="text-gray-400">Aucune commande passée.</p>
        ) : (
          <ul className="space-y-2">
            {purchasedGames.map((game, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#1e1e1e] p-3 rounded"
              >
                <div>
                  <p className="font-medium text-white">{game.title}</p>
                  <p className="text-sm text-gray-400">Commande #{index + 1}</p>
                </div>
                <button className="text-orange underline text-sm">
                  Voir la facture
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
