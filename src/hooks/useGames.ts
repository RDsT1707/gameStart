import { useEffect, useState } from "react";

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

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchGames() {
      try {
        const res = await fetch("/api/games");
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        if (isMounted) setGames(data);
      } catch {
        if (isMounted) setError("Erreur lors du chargement des jeux");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchGames();
    return () => {
      isMounted = false;
    };
  }, []);

  return { games, loading, error };
};

export default useGames;
