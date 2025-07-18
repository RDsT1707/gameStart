"use client"; 
// Obligatoire pour activer les hooks et tout ce qui est côté client dans app/

import "../styles/globals.css";
// Styles globaux (tailwind + custom)

import { Providers } from "@/store/Provider";
// Composant qui englobe les contextes Redux (Provider store etc)

import Header from "./components/Header";
// Header commun sur toutes les pages

import Footer from "./components/Footer";
// Footer commun sur toutes les pages

import { SessionProvider } from "next-auth/react";
// Provider pour gérer la session utilisateur avec next-auth

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#1E1E1E] text-white font-ubuntu">
        {/* SessionProvider pour la gestion des sessions utilisateurs */}
        <SessionProvider>
          {/* Providers Redux et autres contextes */}
          <Providers>
            {/* En-tête du site */}
            <Header />
            
            {/* Zone principale où s’affichent les pages (children) */}
            <main
              className="
                container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]
                pt-[150px]  /* mobile, menu burger grand */
                sm:pt-[120px] /* petits écrans */
                md:pt-20    /* tablette et plus */
              "
            >
              {children}
            </main>

            {/* Pied de page */}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
