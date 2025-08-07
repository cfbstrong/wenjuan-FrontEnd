import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { Button, Space, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { removeToken } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";

const UserInfo: FC = () => {
  //不用发送请求获取用户信息了，直接在redux中获取
  // const { data } = useRequest(getUserInfoService);
  // const { nickname, username } = data || {};

  const { nickname, username } = useGetUserInfo();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeToken();
    dispatch(logoutReducer()); //清空redux中的用户信息
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
