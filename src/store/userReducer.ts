import { createSlice } from "@reduxjs/toolkit";

export type UserStateType = {
  username: string;
  nickname: string;
};

const userReducer = createSlice({
  name: "user",
  initialState: {
    username: "",
    nickname: "",
  },
  reducers: {
    loginReducer(state, action) {
      return action.payload;
    },
    logoutReducer() {
      return { username: "", nickname: "" };
    },
  },
});

export const { loginReducer, logoutReducer } = userReducer.actions;

export default userReducer.reducer;
