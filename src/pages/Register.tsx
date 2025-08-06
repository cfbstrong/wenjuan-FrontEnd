import React, { FC } from "react";
import { Space, Typography, Button, Form, Input, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { registerService } from "../services/user";
import { useRequest } from "ahooks";

const { Title } = Typography;

const Register: FC = () => {
  const navigate = useNavigate();

  const { run: register } = useRequest(
    async (username: string, password: string, nickname?: string) => {
      await registerService(username, password, nickname);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("注册成功");
        navigate("/login");
      },
    }
  );

  const onFinish = (values: any) => {
    // console.log("Success:", values);
    const { username, password, nickname } = values;

    register(username, password, nickname); //发送请求
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title>
            <UserAddOutlined />
          </Title>
          <Title>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 400 }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "用户名长度需要在5-20个字符之间",
              },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "用户名只能包含字母和数字",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请输入确认密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  //important
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不一致！"));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space size="large">
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Link to="/login">已有账户，请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
