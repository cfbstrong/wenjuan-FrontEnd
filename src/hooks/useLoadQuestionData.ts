import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { resetComponents } from "../store/componentsReducer/index";
import { useDispatch } from "react-redux";

export const useLoadQuestionData = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  // const [questionData, setQuestionData] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function getQuestion() {
  //     const questionData = await getQuestionService(id);
  //     setQuestionData(questionData);
  //     setLoading(false);
  //   }
  //   getQuestion();
  // }, []);

  //直接用useRequest
  // const load = async () => {
  //   const data = await getQuestionService(id);
  //   return data;
  // };
  //important: 如果getQuestionService需要参数，则需要额外写一个函数传入useRequest;如果不需要参数，则可以直接传入getQuestionService函数
  // const { data, error, loading } = useRequest(load);
  // return { data, loading };

  const { data, loading, error, run } = useRequest(
    async () => {
      // console.log(id);
      //todo
      const data = await getQuestionService(id);
      if (!data) return;
      return data;
    },
    {
      manual: true,
    }
  );

  //id变化，重新请求数据
  useEffect(() => {
    run();
  }, [id]);

  //将数据放入redux中
  useEffect(() => {
    const { componentList = [] } = data || {};
    dispatch(resetComponents({ componentList, selectedId: "" }));
  }, [data]);

  return { loading, error };
};
