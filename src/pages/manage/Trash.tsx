import React, { FC } from "react";
import { useState } from "react";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";
import ListSearch from "../../components/ListSearch";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
} from "antd";

const { Title } = Typography;
const { confirm } = Modal;

const rawQuestionList = [
  {
    _id: "q1",
    title: "What is React?",
    isPublished: false,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q2",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q3",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
];

const tableColumns = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "是否发布",
    dataIndex: "isPublished",
    render: (isPublished: boolean) =>
      isPublished ? (
        <Tag color="processing">已发布</Tag>
      ) : (
        <Tag color="red">未发布</Tag>
      ),
  },
  {
    title: "答卷",
    dataIndex: "answerCount",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
  },
];

const Trash: FC = () => {
  // 设置页面标题
  useTitle("问卷星-回收站");

  const [questionList, setQuestionList] = useState(rawQuestionList);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // important 这个数组用来装被选中的key

  const handleDelete = () => {
    confirm({
      title: "确定删除吗？",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可恢复",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        console.log(selectedRowKeys);
        message.success("删除成功");
      },
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      // console.log(selectedRowKeys); //这里能拿到被选中的key
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const TableElement = //important
    (
      <>
        <Space style={{ marginBottom: "25px" }}>
          <Button type="primary" disabled={selectedRowKeys.length === 0}>
            恢复
          </Button>
          <Button
            danger
            disabled={selectedRowKeys.length === 0}
            onClick={handleDelete}
          >
            彻底删除
          </Button>
        </Space>
        <Table
          rowSelection={{ type: "checkbox", ...rowSelection }}
          dataSource={questionList}
          columns={tableColumns}
          rowKey={(q) => q._id}
        />
      </>
    );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className="content">
        <div>
          {questionList.length === 0 ? <Empty /> : null}
          {questionList.length > 0 && TableElement}
        </div>
      </div>
    </>
  );
};

export default Trash;
