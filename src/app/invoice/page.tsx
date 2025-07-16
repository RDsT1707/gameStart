"use client";

import React from "react";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function InvoicePage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Facture GameStart", 14, 22);
    doc.setFontSize(12);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 14, 32);

    let y = 45;
    cartItems.forEach((item) => {
      doc.text(`${item.title} x${item.quantity}`, 14, y);
      doc.text(`${(item.price * item.quantity).toFixed(2)} €`, 160, y, { align: "right" });
      y += 10;
    });

    doc.text(`Total : ${totalPrice.toFixed(2)} €`, 14, y + 10);
    doc.save("facture-gamestart.pdf");
  };

  if (cartItems.length === 0) {
    return <p className="p-8 text-center">Aucune facture disponible, panier vide.</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Facture</h1>
      <button
        onClick={generatePDF}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
      >
        Télécharger la facture (PDF)
      </button>
    </div>
  );
}
