import React, { FC } from "react";
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

  const { questionData, loading } = useLoadQuestionData();

  return (
    <div>
      Edit page
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>{JSON.stringify(questionData)}</div>
      )}
    </div>
  );
};

export default Edit;
