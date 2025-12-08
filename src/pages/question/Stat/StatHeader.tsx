import React, { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./StatHeader.module.scss";
import {
  Space,
  Button,
  Typography,
  Input,
  Tooltip,
  InputRef,
  message,
  Popover,
} from "antd";
import { QRCodeSVG } from "qrcode.react";
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../hooks/useGetPageInfo";

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();
  const inputRef = useRef<InputRef>(null);

  function genLinkAndQRCodeElem() {
    //未发布不渲染这个组件
    if (!isPublished) {
      return null;
    }

    function copy() {
      //拷贝链接 important --> Popover的使用
      if (!inputRef.current) {
        return;
      }
      inputRef.current.select(); //选中input中的 内容
      document.execCommand("copy"); //拷贝 选中 内容
      message.success("拷贝成功");
    }

    const url = `http://loaclhost:3000/question/${id}`; //需要参考C端的链接规则

    return (
      <div>
        <Space>
          <Input value={url} style={{ width: 300 }} ref={inputRef} />
          <Tooltip title="拷贝链接">
            <Button icon={<CopyOutlined />} onClick={() => copy()}></Button>
          </Tooltip>
          <Popover
            placement="bottom"
            content={<QRCodeSVG value={url} size={150} />}
          >
            <Button icon={<QrcodeOutlined />}></Button>
          </Popover>
        </Space>
      </div>
    );
  }

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.center}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
