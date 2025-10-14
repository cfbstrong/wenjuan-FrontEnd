//更新下一个selectedId的函数
import { ComponentInfoType } from "./index";
export function getNextSelectedId(
  componentList: ComponentInfoType[],
  fe_id: string
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  let newSelectedId = "";

  //找到当前被选中组件的index
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) {
    newSelectedId = "";
  }

  if (visibleComponentList.length <= 1) {
    //当前只有一个组件或没有组件
    newSelectedId = "";
  } else {
    if (index === visibleComponentList.length - 1) {
      //当前是最后一个组件
      newSelectedId = visibleComponentList[0].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}
