import React, { FC } from "react";
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from "./interface";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Component: FC<QuestionInfoPropsType> = (props) => {
  const { title, description } = { ...QuestionInfoDefaultProps, ...props };

  const decTextList = description?.split("\n");

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {decTextList?.map((decText, index) => {
          return (
            <span key={index}>
              {decText}
              <br />
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};

export default Component;
