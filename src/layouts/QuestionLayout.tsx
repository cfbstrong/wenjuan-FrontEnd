import React, { FC } from "react";
import { Outlet } from "react-router-dom";
const QuestionLayout: FC = () => {
  return (
    <div>
      {/* <div>QuestionLayout</div> */}
      <Outlet />
    </div>
  );
};
export default QuestionLayout;
