import React, { FC } from "react";
import {
  QuestionCheckboxDefaultProps,
  QuestionCheckboxPropsType,
} from "./interface";
import { Checkbox, Typography, Space } from "antd";

const { Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, vertical, list } = {
    ...QuestionCheckboxDefaultProps,
    ...props,
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space size="middle" direction={vertical ? "vertical" : "horizontal"}>
        {list &&
          list.map((item, index) => {
            const { value, label, checked } = item;
            return (
              <Checkbox checked={checked} key={value}>
                {label}
              </Checkbox>
            );
          })}
      </Space>
    </div>
  );
};

export default Component;
