import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "src/app/types/games";

interface CartState {
  panier: Game[];
}

const initialState: CartState = {
  panier: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Game>) {
      const exists = state.panier.find(item => item.id === action.payload.id);
      if (!exists) {
        state.panier.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.panier = state.panier.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.panier = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
