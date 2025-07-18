"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoginModal from "./LoginModal";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.panier.length);
  const router = useRouter();

  // Désactiver le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      router.push(`/all?search=${encodeURIComponent(trimmed)}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-[#1E1E1E] text-white shadow-md px-6 py-4 fixed w-full z-50 top-0 left-0">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo + Nav + Burger */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-8">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-extrabold text-[#FF8200] hover:text-orange-400 transition-colors"
          >
            GameStart
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex gap-8 text-base">
            <Link href="/" className="hover:text-[#FF8200] font-semibold transition">Accueil</Link>
            <Link href="/all" className="hover:text-[#FF8200] font-semibold transition">Jeux</Link>
          </nav>

          {/* Burger Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#FF8200] hover:text-orange-400"
            aria-label={menuOpen ? "Fermer menu" : "Ouvrir menu"}
            aria-expanded={menuOpen}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="w-full max-w-md mt-4 md:mt-0 relative">
          <input
            type="text"
            placeholder="Rechercher votre jeu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-4 pr-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FF8200] text-lg"
            aria-label="Lancer la recherche"
          >
            🔍
          </button>
        </form>

        {/* Zone utilisateur desktop */}
        <div className="hidden md:flex items-center gap-6 text-lg md:text-base">
          <LoginModal />
          <Link
            href="/cart"
            className="relative hover:text-[#FF8200] transition flex items-center"
            aria-label="Voir le panier"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/moncompte"
            className="hover:text-[#FF8200] text-sm font-medium"
          >
            Mon compte
          </Link>
        </div>
      </div>

      {/* MENU MOBILE Slide-in */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#1E1E1E] shadow-lg z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col mt-20 px-6 space-y-6 text-lg">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#FF8200] font-semibold">Accueil</Link>
          <Link href="/all" onClick={() => setMenuOpen(false)} className="hover:text-[#FF8200] font-semibold">Jeux</Link>

          <div className="mt-10 border-t border-orange-500 pt-6 flex flex-col gap-4">
            <LoginModal />
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative hover:text-[#FF8200] font-semibold"
              aria-label="Voir le panier"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/moncompte" onClick={() => setMenuOpen(false)} className="hover:text-[#FF8200] font-semibold">
              Mon compte
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay noir quand menu ouvert */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Ligne orange décorative */}
      <div className="mt-6 h-1 bg-[#FF8200] w-full max-w-7xl mx-auto rounded"></div>
    </header>
  );
}
