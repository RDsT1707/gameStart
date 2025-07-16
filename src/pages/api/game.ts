import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ message: "ID de jeu manquant ou invalide" });
    return;
  }

  try {
    const response = await fetch(`https://www.freetogame.com/api/game?id=${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du jeu");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Erreur côté serveur", error });
  }
}
