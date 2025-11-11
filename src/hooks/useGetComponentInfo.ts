import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

const useGetComponentInfo = () => {
  const componentInfo = useSelector<StateType>((state) => {
    //因为这里需要判断state的类型，因此引发了一系列适配这个属性的小技巧操作 important -> useSelector<StateType>
    return state.components.present; //important！！ undo需要加上present 参考https://cn.redux.js.org/usage/implementing-undo-history/
  });

  // important
  const { componentList, selectedId, copiedComponent } =
    componentInfo as ComponentsStateType;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);

  return { componentList, selectedId, selectedComponent, copiedComponent };
};

export default useGetComponentInfo;
