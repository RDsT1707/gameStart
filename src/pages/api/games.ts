// src/pages/api/games.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://www.freetogame.com/api/games");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des jeux");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Erreur côté serveur", error });
  }
}
