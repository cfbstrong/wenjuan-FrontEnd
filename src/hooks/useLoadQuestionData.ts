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
    //important : 异步网络请求适合用useEffect，同时设置依赖项[data]
    //一开始由于网络请求需要时间所以没有数据，后面拿到数据之后，需要再次设置redux中的数据
    const { componentList = [] } = data || {};

    let selectedId = "";

    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; //当画布上有组件显示的时候，默认选中第一个
    }

    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    );
  }, [data]);

  return { loading, error };
};
