import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import creditReducer from "./slices/creditSlice";
import libraryReducer from "./slices/librarySlice"; // <- importe

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    credit: creditReducer,
    library: libraryReducer, // <- ajoute ici
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
