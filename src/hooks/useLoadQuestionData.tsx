import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";

export const useLoadQuestionData = () => {
  const { id = "" } = useParams();
  const [questionData, setQuestionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getQuestion(id: string) {
      if (id) {
        const questionData = await getQuestionService(id);
        setQuestionData(questionData);
        setLoading(false);
      }
    }
    getQuestion(id);
  }, []);

  return { questionData, loading };
};
