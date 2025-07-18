import { useEffect, useState } from "react";

// Définition du type Game avec des propriétés optionnelles
interface Game {
  id: number;
  title: string;
  thumbnail?: string;
  genre?: string;
  platform?: string;
  price?: number;
  discountPrice?: number;
  popularity?: number;
}

// Hook custom pour récupérer les jeux depuis /api/games
const useGames = () => {
  // State pour stocker la liste des jeux
  const [games, setGames] = useState<Game[]>([]);
  // State pour indiquer si on est en train de charger
  const [loading, setLoading] = useState(true);
  // State pour gérer une erreur de chargement éventuelle
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // flag pour éviter setState après démontage

    async function fetchGames() {
      try {
        const res = await fetch("/api/games");
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        if (isMounted) setGames(data); // met à jour la liste seulement si monté
      } catch {
        if (isMounted) setError("Erreur lors du chargement des jeux"); // gestion d’erreur
      } finally {
        if (isMounted) setLoading(false); // fin du chargement
      }
    }

    fetchGames();

    // Nettoyage au démontage du composant
    return () => {
      isMounted = false;
    };
  }, []);

  // Retourne les données et les états associés
  return { games, loading, error };
};

export default useGames;
