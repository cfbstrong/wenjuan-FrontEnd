import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";
import cloneDeep from "lodash.clonedeep";
import { nanoid } from "nanoid";

import { getNextSelectedId } from "./utils";

//每一个组件的类型 important 适配后端返回数据的类型
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  //important 为了适配这个属性，有小技巧，为每个组件建立了index.ts文件，并统一在QuestionComponent文件的index.ts中汇总
  props: ComponentPropsType;
};

//reducer的state类型 important
export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const initialState: ComponentsStateType = {
  selectedId: "", //表明当前哪个组件被选中了，根据ID给这个组件添加被选中的样式边框，并且在redux中共享给left板/right板，让left/right显示对应的属性和可配置项
  componentList: [],
  //还有其他扩展
  copiedComponent: null,
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

    //添加组件  点击组件库，添加组件到画布中
    addComponent: produce(
      (
        state: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>
      ) => {
        const index = state.componentList.findIndex((c) => {
          return c.fe_id === state.selectedId;
        });
        if (index < 0) {
          //当前如果没有选择组件，则加入到最后
          state.componentList.push(action.payload);
        } else {
          //如果选中组件，则加入到选中组件的后面
          state.componentList.splice(index + 1, 0, action.payload);
        }
      }
    ),

    //修改props
    changeComponentProps: produce(
      (
        state: ComponentsStateType,
        action: PayloadAction<ComponentPropsType>
      ) => {
        const selectedComponent = state.componentList.find(
          (c) => c.fe_id === state.selectedId
        );
        if (!selectedComponent) return;
        selectedComponent.props = action.payload;
      }
    ),

    //删除选中组件
    deleteSelectedComponent: produce((state: ComponentsStateType) => {
      const index = state.componentList.findIndex(
        (c) => c.fe_id === state.selectedId
      );

      //计算下一个应该被选中组件的selectedId
      const newSelectedId = getNextSelectedId(
        state.componentList,
        state.selectedId
      );

      state.componentList.splice(index, 1);
      state.selectedId = newSelectedId;
    }),

    //隐藏/显示组件
    changeComponentHiddden: produce(
      (
        state: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const curComponent = state.componentList.find(
          (c) => c.fe_id === action.payload.fe_id
        );
        if (curComponent) {
          curComponent.isHidden = action.payload.isHidden;
        }

        //重新计算selectedId
        const newSelectedId = getNextSelectedId(
          state.componentList,
          action.payload.fe_id
        );
        state.selectedId = newSelectedId;
      }
    ),

    //锁定/解锁组件
    toogleComponentLocked: produce(
      (
        state: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        const curComponent = state.componentList.find(
          (c) => c.fe_id === action.payload.fe_id
        );
        if (curComponent) {
          curComponent.isLocked = !curComponent.isLocked;
        }
      }
    ),

    //复制组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const selectedComponent = draft.componentList.find(
        (c) => c.fe_id === draft.selectedId
      );
      if (!selectedComponent) return;
      draft.copiedComponent = cloneDeep(selectedComponent); //深克隆
      //修改fe_id,important
      draft.copiedComponent.fe_id = nanoid();
    }),

    //粘贴组件
    pasteSelectedComponent: produce((draft: ComponentsStateType) => {
      if (!draft.copiedComponent) return;
      const index = draft.componentList.findIndex(
        (c) => c.fe_id === draft.selectedId
      );
      if (index < 0) {
        //没有选中组件，添加到最后
        draft.componentList.push(draft.copiedComponent);
      } else {
        draft.componentList.splice(index + 1, 0, draft.copiedComponent);
      }
    }),
  },
});

export default componentsSlice.reducer;
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
  changeComponentHiddden,
  toogleComponentLocked,
  copySelectedComponent,
  pasteSelectedComponent,
} = componentsSlice.actions;
