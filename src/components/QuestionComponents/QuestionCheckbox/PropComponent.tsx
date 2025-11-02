import React, { FC } from "react";
import { QuestionCheckboxPropsType } from "./interface";
import { Form, Input, Checkbox, Space, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

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

      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map((item, index) => {
                const { key, name } = item;
                return (
                  <Space key={index}>
                    <Form.Item valuePropName="checked" name={[name, "checked"]}>
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item name={[name, "label"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <MinusCircleOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => remove(name)}
                      />
                    </Form.Item>
                  </Space>
                );
              })}

              {/* 按钮，添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ value: "", label: "" })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="vertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
