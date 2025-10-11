import React, { FC } from "react";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { getQuestionService } from "../../../services/question";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";
import { useLoadQuestionData } from "../../../hooks/useLoadQuestionData";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const Edit: FC = () => {
  // useEffect(() => {
  //important 异步函数要多写一个函数在useEffect中，不能直接写异步函数
  //   async function getQuestion(id: string) {
  //     const data = await getQuestionService(id);
  //     const { title, id } = data;
  //   }
  //   getQuestion("1");
  // }, []);

  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  function clearSelected() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className={styles.container}>
      {/* Edit page
      {loading ? <div>Loading...</div> : <div>{JSON.stringify(data)}</div>} */}

      <div style={{ height: "40px" }}>Header</div>
      <div className={styles.content}>
        <div className={styles.left}>
          <LeftPanel />
        </div>
        <div
          className={styles.center}
          onClick={() => {
            clearSelected();
          }}
        >
          <div className={styles["canvas-wapper"]}>
            <EditCanvas loading={loading} />
          </div>
        </div>
        <div className={styles.right}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default Edit;
