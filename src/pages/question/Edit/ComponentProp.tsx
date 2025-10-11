import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo();

  if (!selectedComponent) return null;

  const { type, props } = selectedComponent;

  const componentConf = getComponentConfByType(type);

  if (!componentConf) return null;

  const { PropComponent } = componentConf;

  return (
    <div>
      <PropComponent {...props} />
    </div>
  );
};

export default ComponentProp;
