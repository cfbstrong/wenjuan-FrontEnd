import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import QuestionCard from "../../components/QuestionCard";
import styles from "./List.module.scss";

const rawQuestionList = [
  {
    _id: "q1",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
  },
  {
    _id: "q2",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
  },
  {
    _id: "q3",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
  },
  {
    _id: "q4",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
  },
  {
    _id: "q5",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
  },
];

const List: FC = () => {
  // 设置页面标题
  useTitle("问卷星-问卷列表");

  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>我的问卷</div>
        <div className={styles.right}>
          <input type="text" name="" id="" />
        </div>
      </div>

      <div className="content">
        <div>
          {questionList.map((q) => {
            return <QuestionCard key={q._id} {...q} />;
          })}
        </div>
      </div>

      <div className="footer">footer</div>
    </>
  );
};

export default List;
