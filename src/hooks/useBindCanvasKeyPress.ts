//绑定快捷键
import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent,
  selectPrevComponent,
  selectNextComponent,
} from "../store/componentsReducer";
import { ActionCreators as UndoActionCreators } from "redux-undo";

function isActiveElementValid() {
  const activeElem = document.activeElement;
  if (activeElem === document.body) {
    return true; //光标没有focus在input上  删输入框的字和删画布中的组件需要区分开
  }
  if (activeElem?.matches('div[role="button"]')) {
    return true;
  }
  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  //删除组件快捷键
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    dispatch(deleteSelectedComponent());
  });

  //复制组件快捷键
  useKeyPress(["ctrl.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  //粘贴组件快捷键
  useKeyPress(["ctrl.v"], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteSelectedComponent());
  });

  //选中上一个组件
  useKeyPress(["uparrow"], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  //选中下一个组件
  useKeyPress(["downarrow"], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });

  //撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true, //严格匹配
    }
  );

  //重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;
