import React, { FC } from "react";
import { useState } from "react";
import styles from "./common.module.scss";
import { useTitle, useRequest } from "ahooks";
import ListSearch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import {
  updateQuestionService,
  deleteQuestionService,
} from "../../services/question";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Spin,
} from "antd";

const { Title } = Typography;
const { confirm } = Modal;

// const rawQuestionList = [
//   {
//     _id: "q1",
//     title: "What is React?",
//     isPublished: false,
//     answerCount: 2,
//     createdAt: "2022-01-01",
//     isStar: true,
//   },
//   {
//     _id: "q2",
//     title: "What is React?",
//     isPublished: true,
//     answerCount: 2,
//     createdAt: "2022-01-01",
//     isStar: true,
//   },
//   {
//     _id: "q3",
//     title: "What is React?",
//     isPublished: true,
//     answerCount: 2,
//     createdAt: "2022-01-01",
//     isStar: true,
//   },
// ];

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

  // const [questionList, setQuestionList] = useState(rawQuestionList);
  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { total = 0, list = [] } = data;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // important 这个数组用来装被选中的key

  //处理假删除的恢复(传递给服务端的是一个id,使用for await of传递数组一个一个的循环处理)
  const { loading: recoverLoading, run: handleRecover } = useRequest(
    async () => {
      for await (const key of selectedRowKeys) {
        //important  key--> _id  q1  q2
        console.log(key);
        await updateQuestionService(key as string, { isDeleted: false });
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("恢复成功");
        refresh(); //手动刷新列表，重新执行useLoadQuestionListData hook 去获取新的列表数据
      },
    }
  );

  //处理真删除(传递给服务端的是一个数组[id,id,id]进行批量删除)
  const { loading: deleteLoading, run: handleDeleteService } = useRequest(
    async () => {
      await deleteQuestionService(selectedRowKeys as string[]);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("删除成功");
        refresh(); //手动刷新列表，重新执行useLoadQuestionListData hook 去获取新的列表数据
      },
    }
  );

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
      // console.log(selectedRowKeys, typeof selectedRowKeys); //这里能拿到被选中的key
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const TableElement = //important
    (
      <>
        <Space style={{ marginBottom: "25px" }}>
          <Button
            type="primary"
            disabled={selectedRowKeys.length === 0 || recoverLoading}
            onClick={handleRecover}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedRowKeys.length === 0 || deleteLoading}
            onClick={handleDeleteService}
          >
            彻底删除
          </Button>
        </Space>
        <Table
          rowSelection={{ type: "checkbox", ...rowSelection }}
          dataSource={list}
          columns={tableColumns}
          rowKey={(q: any) => q._id}
          pagination={false}
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
          {loading === false && list.length === 0 ? <Empty /> : null}
          {loading && (
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
          )}
          {!loading && list.length > 0 && TableElement}
        </div>
      </div>

      <div className={styles.footer} style={{ marginTop: "20px" }}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
