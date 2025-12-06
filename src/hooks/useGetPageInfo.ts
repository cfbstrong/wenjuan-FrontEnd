import { useSelector } from "react-redux";
import { StateType } from "../store/index";
import { PageInfoStateType } from "../store/pageInfoReducer";

const useGetPageInfo = () => {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo);

  const { title, description, js, css, isPublished } =
    pageInfo as PageInfoStateType;
  return { title, description, js, css, isPublished };
};

export default useGetPageInfo;
