import React, { FC } from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import { Typography, Space } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { HOME_PATHNAME } from "../router/index";

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷星</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
