import React, { FC } from "react";
import styles from "./Login.module.scss";
import { Space, Typography, Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login: FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const { remberUsername, remberPassword } = getUsernameAndPassword(
      "username",
      "password"
    );
    if (remberUsername && remberPassword) {
      form.setFieldsValue({
        password: remberPassword,
        username: remberUsername,
      });
    }
  }, []);

  const setUsernameAndPassword = (username: string, password: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  };

  const getUsernameAndPassword = (username: string, password: string) => {
    const remberUsername = localStorage.getItem("username");
    const remberPassword = localStorage.getItem("password");
    return { remberUsername, remberPassword };
  };

  const removeUsernameAndPassword = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { username, password, remember } = values;

    if (remember) {
      setUsernameAndPassword(username, password);
      //记住密码
    } else {
      //清除记录
      removeUsernameAndPassword();
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title>
            <UserAddOutlined />
          </Title>
          <Title>用户登录</Title>
        </Space>
      </div>

      <div>
        <Form
          form={form}
          initialValues={{ remember: true }}
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

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space size="large">
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to="/register">还没有账户？请注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
