import React, { FC, useState } from "react";
import styles from "./EditHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Typography, Space, Input } from "antd";
import { LeftOutlined, EditOutlined } from "@ant-design/icons";

import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { changeTitle } from "../../../store/pageInfoReducer";

import EditToolbar from "./EditToolbar";

const { Title } = Typography;

//显示和修改标题 组件
const TitleElem: FC = () => {
  const [eidtState, setEditState] = useState(false);

  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    dispatch(changeTitle(value));
  }

  if (eidtState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    );
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => setEditState(true)}
      ></Button>
    </Space>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
