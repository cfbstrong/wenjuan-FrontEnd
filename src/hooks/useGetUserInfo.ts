import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../store/index";
import { UserStateType } from "../store/userReducer";

// 定义一个useGetUserInfo函数，用于获取用户信息
const useGetUserInfo = () => {
  // 使用useSelector从state中获取用户名和昵称
  const { username, nickname } = useSelector<StateType>(
    (state) => state.user
  ) as UserStateType;

  return { username, nickname };
};

export default useGetUserInfo;
