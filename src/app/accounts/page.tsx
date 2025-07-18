"use client"; // Indique que ce composant est un "Client Component" (nécessaire pour utiliser les hooks comme useSession)

import React from "react";
import { useSession, signOut } from "next-auth/react"; // Permet d'accéder à la session utilisateur + déconnexion

export default function AccountPage() {
  const { data: session, status } = useSession(); // Récupère les infos de session (utilisateur connecté ou pas)

  // Pendant que la session se charge, on affiche un petit message
  if (status === "loading") {
    return <p className="p-8 text-center">Chargement...</p>;
  }

  // Si l'utilisateur n'est pas connecté, on l'invite à se connecter
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

  // Données fictives pour simuler des commandes passées
  const commandes = [
    { id: "CMD123", date: "2025-07-10", total: 59.99, status: "Livrée" },
    { id: "CMD124", date: "2025-07-12", total: 129.99, status: "En cours" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* Titre principal de la page */}
      <h1 className="text-3xl font-bold mb-6">Mon compte</h1>

      {/* Section infos utilisateur */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Infos personnelles</h2>
        <p>Nom : {session.user?.name}</p> {/* Affiche le nom récupéré de la session */}
        <p>Email : {session.user?.email}</p> {/* Et l'email aussi */}

        {/* Bouton de déconnexion */}
        <button
          onClick={() => signOut()} // Quand on clique, on appelle signOut() de NextAuth
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Se déconnecter
        </button>
      </div>

      {/* Section commandes */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Mes commandes</h2>

        {/* Si aucune commande, on le dit clairement */}
        {commandes.length === 0 ? (
          <p>Aucune commande passée.</p>
        ) : (
          // Sinon, on affiche la liste des commandes
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
                  <strong>Total :</strong> {total.toFixed(2)} € {/* Affiche le prix avec 2 décimales */}
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
