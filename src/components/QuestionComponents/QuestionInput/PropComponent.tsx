// 每个组件都有专属设置的右侧配置面板
import React, { FC } from "react";
import { Form, Input } from "antd";

import { QuestionInputPropsType } from "./interface";

const { TextArea } = Input;

//label：用于显示表单控件的标签文本，帮助用户理解控件的用途。
//name：用于标识表单控件的名称，主要用于表单提交、校验和状态管理。
const PropComponent: FC<QuestionInputPropsType> = (props) => {
  const { title, placeholder } = props;

  return (
    <Form
      layout="vertical"
      initialValues={{
        title,
        placeholder,
      }}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
