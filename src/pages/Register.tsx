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
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item label="确认密码" name="confirmPassword">
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
