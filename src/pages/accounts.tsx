"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-8 text-center">Chargement...</p>;
  }

  if (!session) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Tu n'es pas connecté.</p>
        <a href="/auth/signin" className="text-blue-700 underline">
          Se connecter
        </a>
      </div>
    );
  }

  // Commandes simulées (exemple)
  const commandes = [
    {
      id: "CMD123",
      date: "2025-07-10",
      total: 59.99,
      status: "Livrée",
    },
    {
      id: "CMD124",
      date: "2025-07-12",
      total: 129.99,
      status: "En cours",
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Mon compte</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Infos personnelles</h2>
        <p>Nom : {session.user?.name}</p>
        <p>Email : {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Se déconnecter
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Mes commandes</h2>
        {commandes.length === 0 ? (
          <p>Aucune commande passée.</p>
        ) : (
          <ul className="space-y-4">
            {commandes.map(({ id, date, total, status }) => (
              <li key={id} className="border p-4 rounded shadow">
                <p>
                  <strong>Commande :</strong> {id}
                </p>
                <p>
                  <strong>Date :</strong> {date}
                </p>
                <p>
                  <strong>Total :</strong> {total.toFixed(2)} €
                </p>
                <p>
                  <strong>Status :</strong> {status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
