import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";

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
        <div>
          <div className={styles.title}>{props.title}</div>
          <div></div>
        </div>

        <div>
          <div>title</div>
          <div>button</div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
