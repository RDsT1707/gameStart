import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Game } from 'src/app/types/games';

interface CreditState {
  amount: number;
  purchasedGames: Game[];
}

const initialState: CreditState = {
  amount: 100,
  purchasedGames: [],
};

const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    addCredit: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },
    purchaseGame: (state, action: PayloadAction<Game>) => {
      // fallback à 0 si price undefined
      const price = action.payload.price ?? 0;
      if (state.amount >= price) {
        state.amount -= price;
        state.purchasedGames.push(action.payload);
      }
    },
    purchaseGames: (state, action: PayloadAction<Game[]>) => {
      const totalPrice = action.payload.reduce((sum, game) => sum + (game.price ?? 0), 0);
      if (state.amount >= totalPrice) {
        state.amount -= totalPrice;
        state.purchasedGames.push(...action.payload);
      }
    },
  },
});

export const { addCredit, purchaseGame, purchaseGames } = creditSlice.actions;
export default creditSlice.reducer;
