import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import type { PopconfirmProps } from "antd";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

type PropsType = {
  _id: string;
  isStar: boolean;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  handleStar?: (_id: string) => void;
};

const QuestionCard: FC<PropsType> = (props) => {
  const { confirm } = Modal;
  const navigate = useNavigate();

  const handleCopy = () => {
    console.log("copy");
    message.info("Copy Comfirmed");
  };

  const handleCopyCancel = () => {
    message.info("Copy canceled");
  };

  const handleDelete = () => {
    console.log("delete");
    confirm({
      title: "Are you sure to delete this question?",
      icon: <DeleteOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        message.info("Delete Comfirmed");
      },
      onCancel() {
        message.info("Delete Canceled");
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Link
              to={
                props.isPublished
                  ? `/question/stat/${props._id}`
                  : `/question/edit/${props._id}`
              }
            >
              <Space>
                {props.isStar ? (
                  <StarOutlined style={{ color: "orange" }} />
                ) : (
                  <></>
                )}
                {props.title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            {props.isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{props.answerCount}</span>
            <span>{props.createdAt}</span>
          </div>
        </div>
        <Divider />
        <div className={styles.footer}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                size="small"
                type="text"
                onClick={() => {
                  navigate(`/question/edit/${props._id}`);
                }}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                size="small"
                type="text"
                disabled={!props.isPublished}
                onClick={() => {
                  navigate(`/question/stat/${props._id}`);
                }}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={() => {
                  props.handleStar && props.handleStar(props._id);
                }}
              >
                {props.isStar ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确定复制该问卷？"
                onConfirm={handleCopy}
                onCancel={handleCopyCancel}
                okText="确定"
                cancelText="取消"
              >
                <Button type="text" icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={handleDelete}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
