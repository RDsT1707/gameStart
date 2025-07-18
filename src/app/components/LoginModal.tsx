"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginModal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Si l'utilisateur est connecté
  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm text-white">
          Bienvenue, <span className="font-semibold">{session.user?.name}</span>
        </p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition text-sm"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded transition text-sm"
      >
        Se connecter
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-[#1E1E1E] p-6 rounded-lg w-80 text-center text-white shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-orange-400">Connexion</h2>

            <button
              onClick={() => signIn("google")}
              className="w-full bg-white text-black py-2 rounded mb-3 font-medium hover:bg-gray-200 transition"
            >
              Continuer avec Google
            </button>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fermer la fenêtre de connexion"
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}
