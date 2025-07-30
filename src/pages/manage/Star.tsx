import React, { FC } from "react";
import { useState } from "react";
import styles from "./common.module.scss";
import ListSearch from "../../components/ListSearch";
import { useTitle } from "ahooks";
import { Typography, Empty, Spin, Pagination } from "antd";
import QuestionCard from "../../components/QuestionCard";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

const { Title } = Typography;

const rawQuestionList = [
  {
    _id: "q1",
    title: "What is React?",
    isPublished: false,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q2",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q3",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
];

const Star: FC = (props) => {
  // 设置页面标题
  useTitle("问卷星-星标问卷");

  const {
    data = {},
    loading,
    error,
  } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  // const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className="content">
        <div>
          {loading === false && list.length === 0 ? <Empty /> : null}
          {loading && (
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
          )}
          {!loading &&
            list.length > 0 &&
            list.map((q: any) => {
              return <QuestionCard key={q._id} {...q} />;
            })}
        </div>
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
