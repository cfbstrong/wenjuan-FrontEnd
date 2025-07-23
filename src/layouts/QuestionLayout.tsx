import React, { FC } from "react";
import { Outlet } from "react-router-dom";
const QuestionLayout: FC = () => {
  return (
    <>
      <div>QuestionLayout</div>
      <Outlet />
    </>
  );
};
export default QuestionLayout;
