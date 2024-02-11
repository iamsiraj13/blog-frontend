import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice";

const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: initialState,
});
