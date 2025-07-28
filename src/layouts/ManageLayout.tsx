import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { createQuestionService } from "../services/question";
import { Button, Flex, Divider, message } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import styles from "./ManageLayout.module.scss";

const ManageLayout: FC = () => {
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // const handleCreateQuestion = async () => {
  //   setLoading(true);
  //   const { id } = await createQuestionService();
  //   if (id) {
  //     navigate(`/question/edit/${id}`);
  //     message.success("创建成功");
  //   }
  //   setLoading(false);
  // };

  //用useRequest代替
  const {
    data,
    loading,
    run: handleCreateQuestion,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: (data) => {
      navigate(`/question/edit/${data.id}`);
      message.success("创建成功");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Flex gap="middle" vertical>
          <Button
            size="large"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleCreateQuestion}
            disabled={loading}
          >
            创建问卷
          </Button>
          {/* 分割 */}
          <Divider style={{ borderBlockStart: "none" }} />

          {/* important */}
          <Button
            type={location.pathname === "/manage/list" ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              navigate("/manage/list");
            }}
          >
            我的问卷
          </Button>
          <Button
            type={location.pathname === "/manage/star" ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              navigate("/manage/star");
            }}
          >
            星标问卷
          </Button>
          <Button
            type={location.pathname === "/manage/trash" ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              navigate("/manage/trash");
            }}
          >
            回收站
          </Button>
        </Flex>
      </div>

      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
