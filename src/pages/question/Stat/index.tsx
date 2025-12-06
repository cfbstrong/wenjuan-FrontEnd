import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import { Spin, Result, Button } from "antd";
import { useLoadQuestionData } from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "../../../hooks/useGetPageInfo";

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { isPublished, title } = useGetPageInfo();
  useTitle(`问卷统计 - ${title}`);

  const nav = useNavigate();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin />
      </div>
    );
  }

  if (!isPublished) {
    return (
      <div>
        <Result
          status="warning"
          title="该页面尚未发布"
          extra={
            <Button
              type="primary"
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      stat page
      {/* <p>{loading ? <p>Loading...</p> : JSON.stringify(data)}</p> */}
    </div>
  );
};

export default Stat;
