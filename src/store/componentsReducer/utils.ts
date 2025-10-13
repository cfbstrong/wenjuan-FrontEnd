//更新下一个selectedId的函数
import { ComponentInfoType } from "./index";
export function getNextSelectedId(
  componentList: ComponentInfoType[],
  fe_id: string
) {
  let newSelectedId = "";

  //找到当前被选中组件的index
  const index = componentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) {
    newSelectedId = "";
  }

  if (componentList.length <= 1) {
    //当前只有一个组件或没有组件
    newSelectedId = "";
  } else {
    if (index === componentList.length - 1) {
      //当前是最后一个组件
      newSelectedId = componentList[0].fe_id;
    } else {
      newSelectedId = componentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}
