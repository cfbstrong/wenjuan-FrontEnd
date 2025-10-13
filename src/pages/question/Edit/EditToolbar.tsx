import React, { FC } from "react";
import { Space, Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { deleteSelectedComponent } from "../../../store/componentsReducer";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteSelectedComponent());
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
      <Tooltip title="search">
        <Button shape="circle" icon={<EditOutlined />}></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
