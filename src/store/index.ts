import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    //reducers分模块important
    user: userReducer,
  },
});

export default store;
