import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styles from "./Layers.module.scss";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { changeSelectedId } from "../../../store/componentsReducer";
import { message } from "antd";

const Layers: FC = () => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();

  function handleClick(fe_id: string) {
    const curComponent = componentList.find((item) => item.fe_id === fe_id);
    if (curComponent && curComponent.isHidden) {
      message.warning("不能选中隐藏的组件");
    } else {
      dispatch(changeSelectedId(fe_id));
    }
  }

  return (
    <div>
      {componentList.map((component, index) => {
        const { title, fe_id } = component;

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
              {title}
            </div>
            <div className={styles.btn}>按钮</div>
          </div>
        );
      })}
    </div>
  );
};

export default Layers;
