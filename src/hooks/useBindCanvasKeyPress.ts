//绑定快捷键
import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent,
} from "../store/componentsReducer";

function isActiveElementValid() {
  const activeElem = document.activeElement;
  if (activeElem === document.body) {
    return true; //光标没有focus在input上
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
}

export default useBindCanvasKeyPress;
