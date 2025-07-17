// src/hooks/useGames.ts
import { useEffect, useState } from 'react'

export default function useGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch('/api/games') // modifie selon ton backend
        const data = await res.json()
        setGames(data)
      } catch (err) {
        console.error('Erreur lors du chargement des jeux', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  return { games, loading }
}
