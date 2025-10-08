import React, { FC, useEffect } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";

// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component";
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component";

import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { ComponentInfoType } from "../../../store/componentsReducer";

type PropsType = {
  loading: boolean;
};

function getComponent(c: ComponentInfoType) {
  const { type, props } = c;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) return null; //类型保护，防止undefined问题 important
  return <componentConf.Component {...props} />;
}

const EditCanvas: FC<PropsType> = (props) => {
  const { loading } = props;
  const componentList = useGetComponentInfo();
  // console.log(componentList);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      {componentList.map((component) => {
        const { fe_id } = component;
        return (
          <div key={fe_id} className={styles["component-wapper"]}>
            <div className={styles.component}>{getComponent(component)}</div>
          </div>
        );
      })}
      {/* <div className={styles["component-wapper"]}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
      <div className={styles["component-wapper"]}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;
