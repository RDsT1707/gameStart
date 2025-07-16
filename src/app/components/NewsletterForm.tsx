'use client'; // Obligatoire pour activer les hooks et événements côté client

import React from "react";

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour ton inscription !");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        placeholder="Ton email"
        required
        className="border px-3 py-2 rounded w-60"
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        S’inscrire
      </button>
    </form>
  );
}
