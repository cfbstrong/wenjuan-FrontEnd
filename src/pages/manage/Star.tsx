import React, { FC } from "react";
import { useState } from "react";
import styles from "./common.module.scss";
import ListSearch from "../../components/ListSearch";
import { useTitle } from "ahooks";
import { Typography, Empty } from "antd";
import QuestionCard from "../../components/QuestionCard";

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

  const [questionList, setQuestionList] = useState(rawQuestionList);

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
          {questionList.length === 0 ? <Empty /> : null}
          {questionList.length > 0 &&
            questionList.map((q) => {
              return <QuestionCard key={q._id} {...q} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Star;
