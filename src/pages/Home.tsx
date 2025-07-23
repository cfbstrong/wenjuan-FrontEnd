import React, { FC } from "react";
import styles from "./Home.module.scss";
import { MANAGE_INDEX_PATHNAME } from "../router";
import { Typography, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Flex gap="middle" vertical>
        <div className={styles.title}>
          <Title>问卷调查 | 在线投票</Title>
          <Paragraph>
            已累计创建问卷 1090 份，发布问卷 100 份，收到答卷 10000 份
          </Paragraph>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              navigate(MANAGE_INDEX_PATHNAME);
            }}
          >
            开始使用
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default Home;
