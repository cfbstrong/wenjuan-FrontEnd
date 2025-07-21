import React, { FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Flex, Divider } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./ManageLayout.module.scss";

const ManageLayout: FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Flex gap="middle" vertical>
          <Button size="large" icon={<PlusOutlined />} type="primary">
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
