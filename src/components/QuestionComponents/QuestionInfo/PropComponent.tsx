import React, { FC, useEffect } from "react";
import { Input, Form } from "antd";
import { QuestionInfoPropsType } from "./interface";

const { TextArea } = Input;

const PropComponent: FC<QuestionInfoPropsType> = (props) => {
  const [form] = Form.useForm();

  const { title, description, onChange, isLocked } = props;
  //   console.log(title, description);
  useEffect(() => {
    form.setFieldsValue({
      title,
      description,
    });
  }, [title, description]);

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, description }}
      form={form}
      disabled={isLocked}
      onValuesChange={handleChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: "请输入问卷标题" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="问卷描述" name="description">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
