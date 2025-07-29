import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { useRequest } from "ahooks";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  //important
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get("keyword") || "";
      const pageSize = parseInt(searchParams.get("pageSize") || "") || 10;
      const page = parseInt(searchParams.get("page") || "") || 1;
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        pageSize,
        page,
      });
      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );

  return { data, loading, error };
}

export default useLoadQuestionListData;
