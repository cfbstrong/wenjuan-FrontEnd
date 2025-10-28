import React, { FC } from "react";
import { Typography } from "antd";
import {
  QuestionPragraphDefaultProps,
  QuestionPragraphPropsType,
} from "./interface";

const { Paragraph } = Typography;

const Component: FC<QuestionPragraphPropsType> = (props) => {
  const { text, isCenter } = { ...QuestionPragraphDefaultProps, ...props };

  const textList = text?.split("\n"); //['hello', "ccc", "123"] //处理换行 important

  return (
    <Paragraph style={{ textAlign: isCenter ? "center" : "start" }}>
      {textList.map((text, index) => {
        return (
          <span key={index}>
            {text}
            <br />
          </span>
        );
      })}
    </Paragraph>
  );
};

export default Component;
