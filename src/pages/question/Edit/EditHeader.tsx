import React, { FC, useState } from "react";
import styles from "./EditHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, Typography, Space, Input, message } from "antd";
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRequest, useKeyPress, useDebounceEffect } from "ahooks";

import { changeTitle } from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { updateQuestionService } from "../../../services/question";

import EditToolbar from "./EditToolbar";
import { wait } from "@testing-library/user-event/dist/utils";

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

//保存按钮 组件
const SaveButton: FC = () => {
  const { componentList } = useGetComponentInfo();
  const { title, js, css, description } = useGetPageInfo();

  const { id } = useParams();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        title,
        js,
        css,
        description,
        componentList,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("保存成功");
      },
    }
  );

  //保存快捷键
  useKeyPress(["ctrl.s", "meta.s"], (e: KeyboardEvent) => {
    // 阻止默认事件，弹出保存窗口 important!
    e.preventDefault();
    if (!loading) {
      save();
    }
  });

  //监听内容变化，自动保存
  //但不能内容一改变就保存，不能太频繁，所以用防抖(useDebounceEffect)
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, title, js, css, description],
    {
      wait: 1000,
    }
  );

  return (
    <Button
      onClick={() => save()}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
      type="text"
    >
      保存
    </Button>
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
            {/* <Button>保存</Button> */}
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
