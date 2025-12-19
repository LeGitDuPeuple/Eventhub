import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { loginReducer } from "../login/login.slice";

const reducers = combineReducers({
  login: loginReducer
});

export const store = configureStore({
  reducer: reducers,
  devTools: true
});

export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
