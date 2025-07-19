import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { spawn } from "child_process";

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
};

const QuestionCard: FC<PropsType> = (props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <a href="#">{props.title}</a>
          </div>
          <div className={styles.right}>
            {props.isPublished ? (
              <span style={{ color: "green" }}>已发布</span>
            ) : (
              <span>未发布</span>
            )}
            <span>答卷：{props.answerCount}</span>
            <span>{props.createdAt}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.left}>
            <button>编辑问卷</button>
            <button>数据统计</button>
          </div>
          <div className={styles.right}>
            <button>标星</button>
            <button>复制</button>
            <button>删除</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
