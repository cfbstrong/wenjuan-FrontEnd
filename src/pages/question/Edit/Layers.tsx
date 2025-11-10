import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Layers.module.scss";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
import {
  changeSelectedId,
  changeComponentTitle,
  toogleComponentLocked,
  changeComponentHiddden,
  moveComponent,
} from "../../../store/componentsReducer";
import { message, Input, Button, Space } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";

const Layers: FC = () => {
  //当前正在修改标题的组件Id important!!!
  const [changeTitleId, setChangeTitleId] = useState("");

  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();

  const componentListWithId = componentList.map((component) => {
    return {
      ...component,
      id: component.fe_id,
    };
  });

  function handleOnDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex })); //important 拖拽只是实现了一个动画效果，最后还是需要依赖修改数据，来驱动视图出现渲染，才能实现拖拽排序
  }

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

  //切换隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHiddden({ fe_id, isHidden }));
  }

  //切换锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toogleComponentLocked({ fe_id }));
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleOnDragEnd}>
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
          <SortableItem id={fe_id} key={fe_id}>
            <div className={styles.wrapper}>
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
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ""}
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => changeLocked(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
