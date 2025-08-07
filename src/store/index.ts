import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { UserStateType } from "./userReducer";

export type StateType = {
  //important
  user: UserStateType;
};

const store = configureStore({
  reducer: {
    //reducers分模块important
    user: userReducer,
  },
});

export default store;
