import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import componentsReducer from "./componentsReducer/index";
import { UserStateType } from "./userReducer";
import { ComponentsStateType } from "./componentsReducer";

export type StateType = {
  //important
  user: UserStateType;
  //important
  components: ComponentsStateType;
};

const store = configureStore({
  reducer: {
    //reducers分模块important
    user: userReducer,
    // 组件列表
    components: componentsReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
