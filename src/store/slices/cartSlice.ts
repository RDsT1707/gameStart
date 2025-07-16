import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panier: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const exists = state.panier.find(item => item.id === action.payload.id);
      if (!exists) {
        state.panier.push(action.payload);
      }
      // Sinon, ne rien faire (tu peux aussi gérer un message d'alerte côté front)
    },
    removeFromCart(state, action) {
      state.panier = state.panier.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.panier = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
