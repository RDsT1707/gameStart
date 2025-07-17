import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  platform: string;
  // Ajoute d’autres propriétés si besoin
}

interface LibraryState {
  purchasedGames: Game[];
}

const initialState: LibraryState = {
  purchasedGames: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addPurchasedGame(state, action: PayloadAction<Game>) {
      // Ajoute uniquement si pas déjà acheté
      const exists = state.purchasedGames.find(game => game.id === action.payload.id);
      if (!exists) {
        state.purchasedGames.push(action.payload);
      }
    },
    removePurchasedGame(state, action: PayloadAction<number>) {
      state.purchasedGames = state.purchasedGames.filter(game => game.id !== action.payload);
    },
    clearLibrary(state) {
      state.purchasedGames = [];
    },
  },
});

export const { addPurchasedGame, removePurchasedGame, clearLibrary } = librarySlice.actions;
export default librarySlice.reducer;
