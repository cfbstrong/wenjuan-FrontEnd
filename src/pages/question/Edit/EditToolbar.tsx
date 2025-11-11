import React, { FC } from "react";
import { Space, Button, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import {
  deleteSelectedComponent,
  changeComponentHiddden,
  toogleComponentLocked,
  copySelectedComponent,
  pasteSelectedComponent,
  moveComponent,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {}; //加个{}防止报错 important
  const selectedComponentIndex = componentList.findIndex(
    (c) => c.fe_id === selectedId
  );
  const isFirst = selectedComponentIndex <= 0;
  const isLast = selectedComponentIndex >= componentList.length - 1;

  //绑定快捷键
  useBindCanvasKeyPress();

  //删除画布中组件
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }

  //隐藏画布中组件
  function handleHidden() {
    dispatch(changeComponentHiddden({ fe_id: selectedId, isHidden: true }));
  }

  //锁定/解锁组件
  function handleLock() {
    dispatch(toogleComponentLocked({ fe_id: selectedId }));
  }

  //复制组件
  function handleCopy() {
    dispatch(copySelectedComponent());
  }

  //粘贴组件
  function handlePaste() {
    dispatch(pasteSelectedComponent());
  }

  //上移组件
  function moveUp() {
    if (isFirst) return;
    dispatch(
      moveComponent({
        oldIndex: selectedComponentIndex,
        newIndex: selectedComponentIndex - 1,
      })
    );
  }

  //下移组件
  function moveDown() {
    if (isLast) return;
    dispatch(
      moveComponent({
        oldIndex: selectedComponentIndex,
        newIndex: selectedComponentIndex + 1,
      })
    );
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete()}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={() => handleHidden()}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          type={isLocked ? "primary" : "default"}
          icon={<LockOutlined />}
          onClick={() => handleLock()}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={() => handleCopy()}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          disabled={copiedComponent === null ? true : false}
          icon={<BlockOutlined />}
          onClick={() => handlePaste()}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          disabled={isFirst}
          icon={<UpOutlined />}
          onClick={() => moveUp()}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          disabled={isLast}
          icon={<DownOutlined />}
          onClick={() => moveDown()}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
