import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

export type PageInfoStateType = {
  title: string;
  description: string;
  js?: string;
  css?: string;
};

const INIT_STATE: PageInfoStateType = {
  title: "",
  description: "",
  js: "",
  css: "",
};

export const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    //初始化以及重置页面信息
    resetPageInfo: (
      state: PageInfoStateType,
      action: PayloadAction<PageInfoStateType>
    ) => {
      return action.payload;
    },

    //修改页面标题
    changeTitle: produce(
      (draft: PageInfoStateType, action: PayloadAction<string>) => {
        draft.title = action.payload;
      }
    ),
  },
});

export const { resetPageInfo, changeTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
