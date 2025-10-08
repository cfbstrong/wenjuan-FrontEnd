import React, { FC } from "react";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { getQuestionService } from "../../../services/question";
import { useEffect } from "react";

import { useLoadQuestionData } from "../../../hooks/useLoadQuestionData";

const Edit: FC = () => {
  // useEffect(() => {
  //   //important 异步函数要多写一个函数在useEffect中，不能直接写异步函数
  //   async function getQuestion(id: string) {
  //     const data = await getQuestionService(id);
  //     const { title, id } = data;
  //   }
  //   getQuestion("1");
  // }, []);

  const { loading } = useLoadQuestionData();

  return (
    <div className={styles.container}>
      {/* Edit page
      {loading ? <div>Loading...</div> : <div>{JSON.stringify(data)}</div>} */}

      <div style={{ height: "40px" }}>Header</div>
      <div className={styles.content}>
        <div className={styles.left}>left</div>
        <div className={styles.center}>
          <div className={styles["canvas-wapper"]}>
            <EditCanvas loading={loading} />
          </div>
        </div>
        <div className={styles.right}>right</div>
      </div>
    </div>
  );
};

export default Edit;
