import React, { FC, useEffect } from "react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { Form, Input } from "antd";
import { resetPageInfo } from "../../../store/pageInfoReducer";
import { useDispatch } from "react-redux";

const { TextArea } = Input;

const PageSetting: FC = () => {
  const { title, js, css, description } = useGetPageInfo();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, js, css, description });
  }, [title, js, css, description]);

  function handleChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <>
      <Form
        layout="vertical"
        initialValues={{ title, js, css, description }}
        form={form}
        onValuesChange={handleChange}
      >
        <Form.Item
          label="页面标题"
          name="title"
          rules={[{ required: true, message: "请输入页面标题" }]}
        >
          <Input placeholder="请输入页面标题" />
        </Form.Item>
        <Form.Item label="页面描述" name="description">
          <TextArea placeholder="请输入页面描述" />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <TextArea placeholder="请输入样式代码" />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <TextArea placeholder="请输入脚本代码" />
        </Form.Item>
      </Form>
    </>
  );
};

export default PageSetting;
