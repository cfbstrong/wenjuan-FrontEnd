// 每个组件都有专属设置的右侧配置面板
import React, { FC, useEffect } from "react";
import { Form, Input } from "antd";

import { QuestionInputPropsType } from "./interface";

const { TextArea } = Input;

//label：用于显示表单控件的标签文本，帮助用户理解控件的用途。
//name：用于标识表单控件的名称，主要用于表单提交、校验和状态管理。
const PropComponent: FC<QuestionInputPropsType> = (props) => {
  const { title, placeholder } = props;
  // console.log("props22", props);

  //important
  //表单的 initialValues 只在表单初始化时生效，而不是在组件重新渲染时。
  // 换句话说，initialValues 只会在表单第一次渲染时设置初始值，之后即使 props 发生变化，表单的值也不会自动更新。
  //在你的代码中，initialValues 被设置为 { title, placeholder }，这会在表单第一次渲染时生效。
  // 但是，当 props 发生变化时，initialValues 不会再次生效，因此表单的值不会更新。

  const [form] = Form.useForm();
  useEffect(() => {
    // 当 props 发生变化时，更新表单的值
    form.setFieldsValue({
      title,
      placeholder,
    });
  }, [title, placeholder]);

  return (
    <Form
      form={form}
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
