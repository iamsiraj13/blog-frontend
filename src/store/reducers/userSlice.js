import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;
const userAction = userSlice.actions;

export { userAction, userReducer };
