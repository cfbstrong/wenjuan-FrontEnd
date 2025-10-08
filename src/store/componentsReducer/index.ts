import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";

//每一个组件的类型
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  //important 为了适配这个属性，有小技巧，为每个组件建立了index.ts文件，并统一在QuestionComponent文件的index.ts中汇总
  props: ComponentPropsType;
};

//reducer的state类型 important
export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const initialState: ComponentsStateType = {
  selectedId: "", //表明当前哪个组件被选中了，根据ID给这个组件添加被选中的样式边框，并且在redux中共享给left板/right板，让left/right显示对应的属性和可配置项
  componentList: [],
  //还有其他扩展
};

//PayloadAction<Payload = void, Meta = any>用于指定 Payload 的类型
const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    //重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload;
    },
    // 数据不可变性：在 React 中，数据不可变性（Immutability）是指一旦创建了某个数据结构（如对象或数组），就不能直接修改它。
    // 相反，任何对数据的修改都应该通过：创建一个新的数据结构来实现。
    // 这种设计模式在 React 和 Redux 等库中非常重要，因为它有助于简化状态管理、优化性能、避免意外的副作用，并且使得代码更容易理解和维护。
    // immer 是一个库，允许你以可变的方式编写代码，但最终会生成不可变的结果。

    //全局共享selectedId
    // changeSelectedId: (
    //   state: ComponentsStateType,
    //   action: PayloadAction<string>
    // ) => {},
    //immer写法
    changeSelectedId: produce(
      (state: ComponentsStateType, action: PayloadAction<string>) => {
        state.selectedId = action.payload;
      }
    ),
  },
});

export default componentsSlice.reducer;
export const { resetComponents, changeSelectedId } = componentsSlice.actions;
