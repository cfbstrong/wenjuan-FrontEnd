import React, { FC } from "react";
import { getQuestionService } from "../../../services/question";
import { useEffect } from "react";

const Edit: FC = () => {
  useEffect(() => {
    async function getQuestion(id: string) {
      const data = await getQuestionService(id);
      console.log(data);
    }
    getQuestion("1");
  }, []);

  return <div>Edit</div>;
};

export default Edit;
