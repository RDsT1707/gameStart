"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
  publisher: string;
  release_date: string;
  game_url: string;
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Game[]>("https://www.freetogame.com/api/games")
      .then((res) => setGames(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { games, loading };
}
