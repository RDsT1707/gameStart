// src/store/slices/creditSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  // ajoute ici d’autres propriétés si besoin
}

interface CreditState {
  balance: number;
  purchasedGames: Game[];
}

const initialState: CreditState = {
  balance: 0,
  purchasedGames: [],
};

const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    useCredit(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    addCredit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
    },
    addPurchasedGame(state, action: PayloadAction<Game>) {
      state.purchasedGames.push(action.payload);
    },
    acheterJeux(state, action: PayloadAction<Game[]>) {  // <=== nouvelle action
      state.purchasedGames.push(...action.payload);
    },
  },
});

export const { useCredit, addCredit, addPurchasedGame, acheterJeux } = creditSlice.actions;
export default creditSlice.reducer;
