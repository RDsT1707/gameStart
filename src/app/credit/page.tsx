"use client";
import { useDispatch } from "react-redux";
import { addCredit } from "@/store/slices/creditSlice";

export default function CreditPage() {
  const dispatch = useDispatch();

  const handleAddCredit = (amount: number) => {
    dispatch(addCredit(amount));
    alert(`+${amount} € ajoutés à ton solde !`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ajouter du crédit</h1>
      <p className="mb-6">Choisis un montant à ajouter :</p>
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
