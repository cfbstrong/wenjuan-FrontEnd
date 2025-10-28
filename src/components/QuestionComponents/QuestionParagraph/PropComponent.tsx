import React, { FC, useEffect } from "react";
import { QuestionPragraphPropsType } from "./interface";

import { Form, Input, Checkbox } from "antd";

const { TextArea } = Input;

const PropComponent: FC<QuestionPragraphPropsType> = (props) => {
  const { text, isCenter, onChange, isLocked } = props;
  const [form] = Form.useForm();

  // console.log(props);//两个一样的组件，props变化后，表单不会跟着变化，需要手动更新表单
  useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter,
    });
  }, [text, isCenter]);

  function hanldValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={hanldValuesChange}
      form={form}
      disabled={isLocked}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
