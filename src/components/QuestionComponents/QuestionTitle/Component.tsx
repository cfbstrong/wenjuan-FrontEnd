import React, { FC } from "react";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
import { Typography } from "antd";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const { title, level, isCenter } = { ...QuestionTitleDefaultProps, ...props };

  function getFontSize(level: 1 | 2 | 3) {
    if (level == 1) {
      return "24px";
    }
    if (level == 2) {
      return "20px";
    }
    if (level == 3) {
      return "16px";
    }
    return "16px";
  }

  return (
    <>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? "center" : "start",
          fontSize: getFontSize(level as 1 | 2 | 3),
        }}
      >
        {title}
      </Title>
    </>
  );
};

export default QuestionTitle;
