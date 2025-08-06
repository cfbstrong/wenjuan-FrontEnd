import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { Button, Space, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { removeToken } from "../utils/user-token";

const UserInfo: FC = () => {
  const { data } = useRequest(getUserInfoService);
  const { nickname, username } = data || {};

  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    message.success("退出成功");
    navigate("/login");
  };

  //important
  const UserInfo = (
    <>
      <Space>
        <UserOutlined style={{ fontSize: "20px", color: "#e8e8e8" }} />
        <span style={{ color: "#e8e8e8" }}>{nickname}</span>
        <Button type="link" onClick={handleLogout}>
          退出
        </Button>
      </Space>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <>{username ? UserInfo : Login}</>;
};

export default UserInfo;
