import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./slices/cartSlice";
import creditReducer from "./slices/creditSlice";

export const store = configureStore({
  reducer: {
     credit: creditReducer, // slice credit
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
