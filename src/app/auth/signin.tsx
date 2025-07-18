"use client"; // Indique que ce composant est un composant client (Next.js 13+)

import { signIn, useSession } from "next-auth/react"; // Import de la fonction pour se connecter et pour récupérer la session utilisateur
import { useRouter } from "next/navigation"; // Import du hook pour rediriger vers une autre page
import React, { useEffect } from "react"; // Import de React et du hook useEffect

export default function SignIn() {
  const { data: session } = useSession(); // Récupère les infos de session (si l'utilisateur est connecté ou non)
  const router = useRouter(); // Initialise le router pour faire des redirections

  useEffect(() => {
    // Ce bloc s'exécute à chaque fois que la session change
    if (session) {
      router.push("/accounts"); // Si l'utilisateur est connecté, on le redirige vers la page des comptes
    }
  }, [session, router]); // Les dépendances du useEffect (ce qui déclenche le useEffect)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Conteneur centré avec un peu de padding, prend toute la hauteur de l'écran */}
      
      <h1 className="text-3xl font-bold mb-8">Connexion à GameStart</h1>
      {/* Titre principal de la page */}

      <button
        onClick={() => signIn("google")} // Lance la connexion via Google
        className="bg-red-600 text-white px-6 py-2 rounded mb-4 hover:bg-red-700"
      >
        Se connecter avec Google
      </button>

      <button
        onClick={() => signIn("facebook")} // Lance la connexion via Facebook
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Se connecter avec Facebook
      </button>
    </div>
  );
}
