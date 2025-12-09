import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import classNames from "classnames";
import styles from "./ComponentList.module.scss";
import { getComponentConfByType } from "../../../components/QuestionComponents";

type PropTypes = {
  selectedComponentId: string;
  // selectedComponentType: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropTypes> = (props) => {
  const { componentList } = useGetComponentInfo();
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((component, index) => {
          const { type, fe_id, props } = component;

          const componentConf = getComponentConfByType(type);
          if (!componentConf) return null;
          const { Component } = componentConf;

          const wrapperDefaultStyle = styles["component-wrapper"];
          const seletedStyle = styles.selected;
          const computedWrapperStyle = classNames({
            [wrapperDefaultStyle]: true,
            [seletedStyle]: fe_id === selectedComponentId,
          });

          return (
            <div
              className={computedWrapperStyle}
              key={fe_id}
              onClick={() => {
                console.log("click component", fe_id);
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
