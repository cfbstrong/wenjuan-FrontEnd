import React, { FC } from "react";
import {
  QuestionTextareaDefaultProps,
  QuestionTextareaPropsType,
} from "./interface";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

const Component: FC<QuestionTextareaPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <TextArea placeholder={placeholder} />
    </div>
  );
};

export default Component;
