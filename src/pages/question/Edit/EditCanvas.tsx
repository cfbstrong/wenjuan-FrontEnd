import React, { FC, useEffect } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
import classNames from "classnames";
import { MouseEvent } from "react";

// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component";
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component";

import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import {
  ComponentInfoType,
  changeSelectedId,
} from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();
  // console.log(componentList);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin />
      </div>
    );
  }
  //事件冒泡（Event Bubbling）是 DOM 事件传播机制的一种方式。
  // 当一个事件发生在一个元素上时，它会先在这个元素上触发，然后逐级向上传播到更高级的节点。
  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  return (
    <div className={styles.canvas}>
      {componentList.map((component) => {
        const { fe_id } = component;

        //根据selectedId来设置被选中样式 important
        const wapperDefaultStyle = styles["component-wapper"];
        const seletedStyle = styles.selected;
        const wapperStyle = classNames({
          [wapperDefaultStyle]: true, //默认样式
          [seletedStyle]: selectedId === fe_id, //被选中样式
        });

        return (
          <div
            key={fe_id}
            className={wapperStyle}
            onClick={(e) => {
              handleClick(e, fe_id);
            }}
          >
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
