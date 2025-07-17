import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  // ajoute ce que tu veux
}

interface UserState {
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
  purchasedGames: Game[];
}

const initialState: UserState = {
  email: null,
  name: null,
  isLoggedIn: false,
  purchasedGames: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; name: string }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = null;
      state.name = null;
      state.isLoggedIn = false;
      state.purchasedGames = [];
    },
    addGame: (state, action: PayloadAction<Game>) => {
      if (!state.purchasedGames.some(g => g.id === action.payload.id)) {
        state.purchasedGames.push(action.payload);
      }
    },
  },
});

export const { login, logout, addGame } = userSlice.actions;
export default userSlice.reducer;