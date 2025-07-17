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
      if (state.amount >= action.payload.price) {
        state.amount -= action.payload.price;
        state.purchasedGames.push(action.payload);
      }
    },
  },
});

export const { addCredit, purchaseGame } = creditSlice.actions;
export default creditSlice.reducer;
