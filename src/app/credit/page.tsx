"use client"; 
// Next.js : active l'exécution côté client (hooks, interactions...)

import { useDispatch } from "react-redux";
// Hook pour envoyer des actions au store Redux

import { addCredit } from "@/store/slices/creditSlice";
// Action Redux qui sert à ajouter du crédit dans le store

export default function CreditPage() {
  // On récupère la fonction dispatch pour envoyer des actions
  const dispatch = useDispatch();

  // Fonction qui sera appelée quand l'utilisateur clique sur un bouton pour ajouter du crédit
  const handleAddCredit = (amount: number) => {
    // On envoie l'action addCredit avec le montant choisi
    dispatch(addCredit(amount));
    // Message d'alerte pour confirmer l'ajout
    alert(`+${amount} € ajoutés à ton solde !`);
  };

  return (
    <div className="p-8">
      {/* Titre de la page */}
      <h1 className="text-2xl font-bold mb-4">Ajouter du crédit</h1>
      {/* Petite instruction */}
      <p className="mb-6">Choisis un montant à ajouter :</p>
      {/* Boutons pour ajouter différents montants */}
      <div className="flex gap-4">
        {[20, 50, 100].map((amount) => (
          <button
            key={amount}
            onClick={() => handleAddCredit(amount)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Ajouter {amount} €
          </button>
        ))}
      </div>
    </div>
  );
}
