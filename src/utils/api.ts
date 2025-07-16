useEffect(() => {
  fetch("/api/games")
    .then((res) => res.json())
    .then((data: Game[]) => {
      const gamesWithPrice = data.map((game) => ({
        ...game,
        price: Math.floor(Math.random() * 50),
      }));
      setGames(gamesWithPrice);
    })
    .catch((err) => console.error("Erreur de chargement des jeux:", err))
    .finally(() => setLoading(false));
}, []);
