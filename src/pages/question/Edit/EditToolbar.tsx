import React, { FC } from "react";
import { Space, Button, Tooltip } from "antd";
import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import {
  deleteSelectedComponent,
  changeComponentHiddden,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId } = useGetComponentInfo();

  //删除画布中组件
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }

  //隐藏画布中组件
  function handleHidden() {
    dispatch(changeComponentHiddden({ fe_id: selectedId, isHidden: true }));
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
    </Space>
  );
};

export default EditToolbar;
