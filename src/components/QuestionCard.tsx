import React, { FC, useState } from "react";
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
import {
  updateQuestionService,
  duplicateQuestionService,
} from "../services/question";
import { useRequest } from "ahooks";

type PropsType = {
  _id: string;
  isStar: boolean;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
};

const QuestionCard: FC<PropsType> = (props) => {
  const [isStared, setIsStared] = useState(props.isStar);
  const [isDeleted, setIsDeleted] = useState(false);

  const { confirm } = Modal;
  const navigate = useNavigate();

  const handleCopyCancel = () => {
    message.info("Copy canceled");
  };

  const handleDelete = () => {
    console.log("delete");
    confirm({
      title: "是否删除该问卷？",
      icon: <DeleteOutlined />,
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        handleDeleteService();
      },
      onCancel() {
        message.info("Delete Canceled");
      },
    });
  };

  const {
    data,
    loading,
    run: handleStared,
  } = useRequest(
    async () => {
      const data = await updateQuestionService(props._id, {
        isStar: !isStared,
      });
      return data;
    },
    {
      manual: true,
      onSuccess: (data) => {
        setIsStared(!isStared);
        message.success("更新成功");
      },
    }
  );

  const { loading: loadingCopy, run: handleCopy } = useRequest(
    async () => {
      const data = await duplicateQuestionService(props._id);
      return data;
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success("复制成功");
        navigate(`/question/edit/${data.id}`);
      },
    }
  );

  const { loading: loadingDetele, run: handleDeleteService } = useRequest(
    async () => {
      const data = await updateQuestionService(props._id, { isDeleted: true });
      return data;
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success("删除成功");
        setIsDeleted(true);
      },
    }
  );

  //判断是否渲染
  if (isDeleted) return <></>;

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
                {isStared ? (
                  <StarOutlined style={{ color: "orange" }} />
                ) : (
                  <></>
                )}
                {props.title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {props.isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>答卷：{props.answerCount}</span>
              <span>{props.createdAt}</span>
            </Space>
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
                onClick={handleStared}
                disabled={loading}
              >
                {isStared ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确定复制该问卷？"
                onConfirm={handleCopy}
                onCancel={handleCopyCancel}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  size="small"
                  disabled={loadingCopy}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={handleDelete}
                disabled={loadingDetele}
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
