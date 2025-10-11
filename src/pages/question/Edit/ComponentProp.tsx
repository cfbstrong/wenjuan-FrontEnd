import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";

import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentsReducer";
import { ComponentPropsType } from "../../../components/QuestionComponents";

const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();

  if (!selectedComponent) return null;

  const { type, props } = selectedComponent;

  const componentConf = getComponentConfByType(type);

  if (!componentConf) return null;

  const { PropComponent } = componentConf;

  //为了统一dispatch，避免每个组件都单独写dispatch造成混乱，统一在父组件这里dispatch
  function changeProps(newProps: ComponentPropsType) {
    dispatch(
      changeComponentProps({
        ...props,
        ...newProps,
      })
    );
  }

  return (
    <div>
      <PropComponent {...props} onChange={changeProps} />
    </div>
  );
};

export default ComponentProp;
