"use client";

import React, { useState } from "react";

export default function Footer() {
  // État pour gérer l’email de la newsletter
  const [email, setEmail] = useState("");
  // Message de feedback pour l’utilisateur (erreur ou succès)
  const [message, setMessage] = useState("");

  // Gestion de la soumission du formulaire newsletter
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifie si l’email est valide
    if (!email || !email.includes("@")) {
      setMessage("Merci de saisir une adresse email valide.");
      return;
    }

    // Message de succès
    setMessage("Merci pour votre inscription !");
    setEmail(""); // Réinitialise le champ
  };

  return (
    <footer className="bg-[#1E1E1E] text-white pt-12 pb-8 px-4 mt-20 border-t border-[#FF8200]/30">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Bloc Newsletter */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-[#FF8200] font-bold text-xl mb-3">Newsletter</h3>
            <p className="mb-5 text-gray-400 leading-relaxed text-sm">
              Inscrivez-vous pour recevoir nos dernières offres et nouveautés.
            </p>

            {/* Formulaire d'inscription */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2"
              noValidate
            >
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full px-4 py-2 text-black flex-grow placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8200] transition"
                required
              />
              <button
                type="submit"
                className="bg-[#FF8200] rounded-full px-6 py-2 font-semibold hover:bg-orange-600 transition"
              >
                S'inscrire
              </button>
            </form>

            {/* Message de retour (succès ou erreur) */}
            {message && (
              <p className="mt-2 text-green-400 text-sm">{message}</p>
            )}
          </div>
        </div>

        {/* Liens utiles */}
        <div className="pl-14">
          <h3 className="text-[#FF8200] font-bold text-xl mb-3">Liens utiles</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="/" className="hover:text-[#FF8200] transition underline-offset-2">
                Accueil
              </a>
            </li>
            <li>
              <a href="/all" className="hover:text-[#FF8200] transition underline-offset-2">
                Tous les jeux
              </a>
            </li>
            <li>
              <a href="/moncompte" className="hover:text-[#FF8200] transition underline-offset-2">
                Mon compte
              </a>
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-[#FF8200] font-bold text-xl mb-3">Suivez-nous</h3>
          <ul className="flex gap-6 text-2xl text-gray-300 mt-2">
            <li>
              <a
                href="https://twitter.com/GameStartOfficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (anciennement Twitter)"
                className="hover:text-[#FF8200] transition"
              >
                X
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/GameStartOfficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#FF8200] transition"
              >
                f
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/GameStartOfficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#FF8200] transition"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Mentions légales + lien vers ton portfolio */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-[#FF8200] font-bold text-xl mb-3">Mentions légales</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">
              &copy; {new Date().getFullYear()} GameStart. Tous droits réservés.
            </p>
          </div>
          <div>
            <a
              href="https://rdst1707.github.io/PORTFOLIO/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF8200] underline font-semibold hover:text-orange-600 transition text-sm"
            >
              Rayan — Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
