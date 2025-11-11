import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import componentsReducer from "./componentsReducer/index";
import { UserStateType } from "./userReducer";
import { ComponentsStateType } from "./componentsReducer";
import PageInfoReducer from "./pageInfoReducer";
import { PageInfoStateType } from "./pageInfoReducer";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";

export type StateType = {
  //important
  user: UserStateType;
  //important
  components: StateWithHistory<ComponentsStateType>; //!!! important 增加了undo 可以看编辑器的提示 就可以知道StateWithHistory怎么用，需要传一个state进去
  //important
  pageInfo: PageInfoStateType;
};

const store = configureStore({
  reducer: {
    //reducers分模块important
    user: userReducer,

    // 组件列表
    components: undoable(componentsReducer, {
      limit: 20, // set a limit for the size of the history
      filter: excludeAction([
        "components/resetComponents",
        "components/changeSelectedId",
        "components/selectPrevComponent",
        "components/selectNextComponent",
      ]), // exclude certain actions from being added to the history
    }),

    //页面信息
    pageInfo: PageInfoReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
