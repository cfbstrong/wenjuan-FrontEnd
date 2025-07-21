import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Logo from "../components/Logo";
import styles from "./MainLayout.module.scss";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>登录</div>
        </Header>
        <Content className={styles.main}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>
          问卷星 &copy;2023 - present. Created by fengbin
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
