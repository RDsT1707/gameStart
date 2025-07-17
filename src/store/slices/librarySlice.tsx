import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from 'src/app/types/games';

interface LibraryState {
  purchasedGames: Game[];
}

const initialState: LibraryState = {
  purchasedGames: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addGameToLibrary: (state, action: PayloadAction<Game>) => {
      const gameExists = state.purchasedGames.some(game => game.id === action.payload.id);
      if (!gameExists) {
        state.purchasedGames.push(action.payload);
      }
    },
   removeGameFromLibrary: (state, action: PayloadAction<string>) => {
  const idToRemove = Number(action.payload);
  state.purchasedGames = state.purchasedGames.filter(game => game.id !== idToRemove);

    },
    clearLibrary: (state) => {
      state.purchasedGames = [];
    },
  },
});

export const {
  addGameToLibrary,
  removeGameFromLibrary,
  clearLibrary,
} = librarySlice.actions;

export default librarySlice.reducer;
