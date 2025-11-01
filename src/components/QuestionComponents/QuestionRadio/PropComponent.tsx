import React, { FC, useEffect } from "react";
import { QuestionRadioPropsType } from "./interface";
import { Form, Input, Select, Checkbox, Space, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent: FC<QuestionRadioPropsType> = (props) => {
  const { title, value, vertical, options, onChange, isLocked } = props;
  // console.log(options);
  const [form] = Form.useForm();

  function handleChange() {
    //处理bug important
    if (onChange == null) return;
    //触发onChange函数
    const newValues = form.getFieldsValue() as QuestionRadioPropsType;

    if (newValues.options) {
      newValues.options = newValues.options.filter(
        (opt) => !(opt.label === null)
      );
    }

    const { options = [] } = newValues;
    options.forEach((opt) => {
      if (opt.value) return;
      opt.value = nanoid(5); // 补充value，没有value会报错
    });

    onChange(newValues);
  }

  useEffect(() => {
    form.setFieldsValue({ title, options, value, vertical });
  }, [title, value, vertical, options]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, options, value, vertical }}
      onValuesChange={handleChange}
      form={form}
      disabled={isLocked}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map((item, index) => {
                // important: name=['0', 'name'] 表示路径是 names[0].name
                // console.log(item);
                const { key, name } = item;
                return (
                  <Space>
                    <Form.Item name={[name, "label"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      {index > 1 && (
                        <MinusCircleOutlined
                          style={{ cursor: "pointer" }}
                          // remove 方法的参数是一个字符串或数组，表示被删除字段的路径。这个路径与字段的 name 属性相对应
                          onClick={() => remove(name)} //解构出来的name
                        />
                      )}
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
      <Form.Item label="默认选中" name="value">
        <Select>
          {options &&
            options.map((item) => {
              const { value, label } = item;
              return <Select.Option value={value}>{label}</Select.Option>;
            })}
        </Select>
      </Form.Item>
      <Form.Item valuePropName="checked" name="vertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
