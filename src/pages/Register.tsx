import React, { FC } from "react";
import { Space, Typography, Button, Form, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";

const { Title } = Typography;

const Login: FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
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

export default Login;
