import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Layers.module.scss";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  changeSelectedId,
  changeComponentTitle,
} from "../../../store/componentsReducer";
import { message, Input, Button, Space } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";

const Layers: FC = () => {
  //当前正在修改标题的组件Id important!!!
  const [changeTitleId, setChangeTitleId] = useState("");

  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();

  function handleClick(fe_id: string) {
    const curComponent = componentList.find((item) => item.fe_id === fe_id);
    // 判断是否隐藏
    if (curComponent && curComponent.isHidden) {
      message.warning("不能选中隐藏的组件");
      return;
    }

    //此条件说明没被选中，则选中   1、选中 2、修改标题
    if (selectedId !== fe_id) {
      dispatch(changeSelectedId(fe_id));
      return;
    }

    //此条件说明已经被选中，则修改标题
    if (selectedId === fe_id) {
      setChangeTitleId(fe_id);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();

    dispatch(changeComponentTitle({ fe_id: selectedId, title: value }));
  }

  return (
    <div>
      {componentList.map((component, index) => {
        const { title, fe_id, isHidden, isLocked } = component;

        // 样式计算
        const selectedStyle = styles.selected;
        const titleStyle = styles.title;
        const finalStyle = classNames({
          [titleStyle]: true,
          [selectedStyle]: selectedId === fe_id,
        });

        return (
          <div className={styles.wrapper} key={index}>
            <div onClick={() => handleClick(fe_id)} className={finalStyle}>
              {/* 切换标题和输入框 */}
              {changeTitleId === fe_id ? (
                <Input
                  value={title}
                  onPressEnter={() => setChangeTitleId("")}
                  onBlur={() => setChangeTitleId("")}
                  onChange={handleChange}
                />
              ) : (
                title
              )}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? styles.btn : ""}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? "primary" : "text"}
                ></Button>
                <Button
                  size="small"
                  shape="circle"
                  className={!isLocked ? styles.btn : ""}
                  icon={<LockOutlined />}
                  type={isLocked ? "primary" : "text"}
                ></Button>
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Layers;
