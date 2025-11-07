import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import componentsReducer from "./componentsReducer/index";
import { UserStateType } from "./userReducer";
import { ComponentsStateType } from "./componentsReducer";
import PageInfoReducer from "./pageInfoReducer";
import { PageInfoStateType } from "./pageInfoReducer";

export type StateType = {
  //important
  user: UserStateType;
  //important
  components: ComponentsStateType;
  //important
  pageInfo: PageInfoStateType;
};

const store = configureStore({
  reducer: {
    //reducers分模块important
    user: userReducer,
    // 组件列表
    components: componentsReducer,
    //页面信息
    pageInfo: PageInfoReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
