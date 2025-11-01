import React, { FC } from "react";
import { QuestionCheckboxPropsType } from "./interface";
import { Form, Input, Checkbox } from "antd";

const PropComponent: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, list, vertical, onChange, isLocked } = props;
  const [form] = Form.useForm();

  function handleChange() {
    if (onChange == null) return;

    onChange(form.getFieldsValue());
    console.log(form.getFieldsValue());
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, list, vertical }}
      onValuesChange={handleChange}
      form={form}
      disabled={isLocked}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="vertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
