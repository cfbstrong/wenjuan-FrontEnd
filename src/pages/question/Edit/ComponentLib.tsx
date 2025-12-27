import React, { FC, useCallback } from "react";
import {
  ComponentGroupList,
  ComponentConfType,
} from "../../../components/QuestionComponents";
import { addComponent } from "../../../store/componentsReducer";
import styles from "./ComponentLib.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";

import { nanoid } from "nanoid";

import { Typography } from "antd";

const { Title } = Typography;

function getComponent(c: ComponentConfType, dispatch: AppDispatch) {
  const { type, Component, props, title } = c;

  //使用useCallback包裹，避免每次渲染都创建新的函数
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(), //前端自定义的fe_id，因为无法生成满足mongodb的_id
        title,
        type,
        props,
      })
    );
  }, []);

  // function handleClick() {
  //   dispatch(
  //     addComponent({
  //       fe_id: nanoid(), //前端自定义的fe_id，因为无法生成满足mongodb的_id
  //       title,
  //       type,
  //       props,
  //     })
  //   );
  // }

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        handleClick();
      }}
    >
      {/*  div 以内包括div已经禁用了鼠标行为，无法onClick */}
      <div key={type} className={styles.component}>
        <Component {...props} />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles["componentLib-wrapper"]}>
      {ComponentGroupList.map((group, index) => {
        return (
          <div key={group.groupId}>
            <Title
              level={4}
              //important
              style={{ marginTop: index === 0 ? "12px" : "24px" }}
            >
              {group.groupName}
            </Title>
            {group.componentList.map((componentConf) => {
              return getComponent(componentConf, dispatch);
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLib;
