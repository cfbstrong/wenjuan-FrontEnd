import React, { FC } from "react";
import { Typography } from "antd";
import {
  QuestionPragraphDefaultProps,
  QuestionPragraphPropsType,
} from "./interface";

const { Paragraph } = Typography;

const Component: FC<QuestionPragraphPropsType> = (props) => {
  const { text, isCenter } = { ...QuestionPragraphDefaultProps, ...props };

  return (
    <Paragraph style={{ textAlign: isCenter ? "center" : "start" }}>
      {text}
    </Paragraph>
  );
};

export default Component;
