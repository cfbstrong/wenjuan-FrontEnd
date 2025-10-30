import React, { FC } from "react";
import { Radio, Typography, Space } from "antd";
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from "./interface";

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = (props) => {
  const { title, value, vertical, options } = {
    ...QuestionRadioDefaultProps,
    ...props,
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space size="middle" direction={vertical ? "vertical" : "horizontal"}>
          {options &&
            options.map((item, index) => {
              const { value, label } = item;
              return <Radio key={value}>{label}</Radio>;
            })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
