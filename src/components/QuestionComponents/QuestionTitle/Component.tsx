import React, { FC } from "react";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
import { Typography } from "antd";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const { title, level, isCenter } = { ...QuestionTitleDefaultProps, ...props };
  return (
    <>
      <Title level={level} style={{ textAlign: isCenter ? "center" : "start" }}>
        {title}
      </Title>
    </>
  );
};

export default QuestionTitle;
