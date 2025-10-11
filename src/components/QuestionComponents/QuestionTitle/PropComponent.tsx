import React, { FC, useEffect } from "react";
import { QuestionTitlePropsType } from "./interface";

import { Form, Input, Checkbox, Select } from "antd";

const { Option } = Select;

//name="agreement"：指定了表单项的名称，用于表单校验和状态管理。
//valuePropName="checked"：明确指定 <Checkbox> 组件的值属性为 checked。
// 这意味着当表单提交时，agreement 的值将是 checked 的布尔值（true 或 false）。

const PropComponent: FC<QuestionTitlePropsType> = (props) => {
  const { title, level, isCenter, onChange } = props;

  const [form] = Form.useForm();
  useEffect(() => {
    // 当 props 发生变化时，更新表单的值
    form.setFieldsValue({
      title,
      level,
      isCenter,
    });
  }, [title, level, isCenter]);

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      onValuesChange={() => handleValueChange()}
      layout="vertical"
      initialValues={{
        title,
        level,
        isCenter,
      }}
    >
      <Form.Item label="标题内容" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="层级" name="level">
        <Select>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
