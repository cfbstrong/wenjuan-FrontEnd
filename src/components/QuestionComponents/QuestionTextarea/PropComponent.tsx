import React, { FC, useEffect } from "react";
import { QuestionTextareaPropsType } from "./interface";
import { Form, Input } from "antd";

const { TextArea } = Input;
const PropComponent: FC<QuestionTextareaPropsType> = (props) => {
  const { title, placeholder, onChange, isLocked } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      disabled={isLocked}
      onValuesChange={handleChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
