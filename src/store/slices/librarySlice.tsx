// src/store/slices/librarySlice.tsx

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
      const exists = state.purchasedGames.find(game => game.id === action.payload.id);
      if (!exists) {
        state.purchasedGames.push(action.payload);
      }
    },
    removeGameFromLibrary: (state, action: PayloadAction<string>) => {
      state.purchasedGames = state.purchasedGames.filter(game => game.id !== action.payload);
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
