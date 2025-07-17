"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { deductCredit } from "@/store/slices/creditSlice";
import { addGame } from "@/store/slices/userSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const creditBalance = useSelector((state: RootState) => state.credit.balance);
  const cartItems = useSelector((state: RootState) => state.cart.panier);
  const totalPrice = cartItems.reduce((acc: number, game: any) => acc + game.price, 0);

  const handlePayWithCredit = () => {
    if (creditBalance >= totalPrice && cartItems.length > 0) {
      dispatch(deductCredit(totalPrice));
      cartItems.forEach((game: any) => {
        dispatch(addGame(game));
      });
      dispatch(clearCart());
      router.push("/payement/succes");
    } else if (cartItems.length === 0) {
      alert("Votre panier est vide.");
    } else {
      alert("Solde insuffisant, recharge ton crédit.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#FF8200]">Paiement par crédit</h1>
      <p className="mb-4">Solde actuel : <span className="font-bold">{creditBalance} €</span></p>
      <p className="mb-4">Montant à payer : <span className="font-bold">{totalPrice} €</span></p>
      <button
        onClick={handlePayWithCredit}
        className="bg-[#FF8200] text-[#1E1E1E] px-6 py-2 rounded font-semibold hover:bg-orange-600 transition"
        disabled={cartItems.length === 0}
      >
        Payer avec mon crédit
      </button>
      {cartItems.length === 0 && (
        <p className="mt-4 text-red-400">Votre panier est vide.</p>
      )}
    </div>
  );
};

export default PaymentPage;
