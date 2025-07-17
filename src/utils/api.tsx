import { useState, useEffect } from "react";
import { Game } from "src/app/types/games";

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/games");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: Game[] = await response.json();

        // On ajoute un prix aléatoire à chaque jeu (entre 0 et 49)
        const gamesWithPrice = data.map((game) => ({
          ...game,
          price: Math.floor(Math.random() * 50),
        }));

        setGames(gamesWithPrice);
      } catch (error) {
        console.error("Erreur de chargement des jeux :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
          <p>{game.price} €</p>
        </div>
      ))}
    </div>
  );
}
