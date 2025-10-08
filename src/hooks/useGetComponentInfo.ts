import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

const useGetComponentInfo = () => {
  const componentInfo = useSelector<StateType>((state) => {
    //因为这里需要判断state的类型，因此引发了一系列适配这个属性的小技巧操作 important -> useSelector<StateType>
    return state.components;
  });

  // important
  const { componentList, selectedId } = componentInfo as ComponentsStateType;

  return { componentList, selectedId };
};

export default useGetComponentInfo;
