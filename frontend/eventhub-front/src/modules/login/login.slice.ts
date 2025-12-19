import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction} from "@reduxjs/toolkit";
import type { User } from "../../types/User";

export type LoginState = {
  user: User | null;
  isLoggedIn: boolean;
};

const initialState: LoginState = {
  user: null,
  isLoggedIn: false
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
});

export const { loginSuccess, logout, updateUser } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
