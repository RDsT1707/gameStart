"use client"; 
// Obligatoire dans Next.js 13 app directory pour activer les hooks côté client (useState, useContext...)

import React, { createContext, useState, ReactNode } from "react";

// Définition du type d'un article dans le panier
interface CartItem {
  id: number;          // Identifiant unique du produit
  title: string;       // Nom du produit
  price: number;       // Prix unitaire
  quantity: number;    // Quantité ajoutée dans le panier
  thumbnail: string;   // URL de l'image du produit
}

// Type pour le contexte du panier, qui va stocker les infos et les fonctions disponibles
interface CartContextType {
  items: CartItem[];                       // Liste des articles dans le panier
  addToCart: (item: CartItem) => void;    // Fonction pour ajouter un article au panier
  removeFromCart: (id: number) => void;   // Fonction pour retirer un article via son id
  clearCart: () => void;                   // Fonction pour vider complètement le panier
}

// Création du contexte React pour le panier, initialisé à undefined (pas encore prêt)
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Composant fournisseur du contexte, enveloppe toute la partie de l'app qui aura accès au panier
export function CartProvider({ children }: { children: ReactNode }) {
  // État local qui contient la liste des articles du panier
  const [items, setItems] = useState<CartItem[]>([]);

  // Fonction pour ajouter un article au panier
  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // On cherche si l'article est déjà dans le panier
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // Si oui, on augmente juste la quantité
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      // Sinon, on ajoute l'article à la liste
      return [...prev, item];
    });
  };

  // Fonction pour retirer un article du panier via son id
  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Fonction pour vider entièrement le panier
  const clearCart = () => setItems([]);

  // On retourne le provider qui passe le contexte à tous ses enfants
  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
