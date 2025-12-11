import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import { Spin, Result, Button } from "antd";
import { useLoadQuestionData } from "../../../hooks/useLoadQuestionData";
import ComponentList from "./ComponentList";
import StatHeader from "./StatHeader";
import styles from "./index.module.scss";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { isPublished, title } = useGetPageInfo();
  useTitle(`问卷统计 - ${title}`);

  const nav = useNavigate();

  //状态提升
  const [selectedComponentId, setSelectedComponentId] = useState<string>(""); //当前选中组件
  const [selectedComponentType, setSelectedComponentType] =
    useState<string>(""); //当前选中组件类型

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin />
      </div>
    );
  }

  if (!isPublished) {
    return (
      <div>
        <Result
          status="warning"
          title="该页面尚未发布"
          extra={
            <Button
              type="primary"
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <ComponentList
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              setSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.center}>
            <PageStat
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              setSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.right}>
            <ChartStat
              selectedComponentId={selectedComponentId}
              selectedComponentType={selectedComponentType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
