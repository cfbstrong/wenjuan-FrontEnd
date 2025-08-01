import React, { FC, useState } from "react";
import { useTitle, useRequest } from "ahooks";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import styles from "./common.module.scss";
import { Typography, Spin } from "antd";
import { getQuestionListService } from "../../services/question";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
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
  {
    _id: "q4",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q5",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: false,
  },
];
const { Title } = Typography;

const List: FC = () => {
  // 设置页面标题
  useTitle("问卷星-问卷列表");

  // const [questionList, setQuestionList] = useState(rawQuestionList);

  //useRequest
  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;

  // const handleStar = (_id: string) => {
  //   const newQuestionList = questionList.map((item) => {
  //     return item._id === _id ? { ...item, isStar: !item.isStar } : item;
  //   });
  //   setQuestionList(newQuestionList);
  // };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className="content">
        <div>
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

      <div className="footer">footer</div>
    </>
  );
};

export default List;
