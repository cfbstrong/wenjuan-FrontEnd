import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { Spin, Typography, Table } from "antd";
import { getQuestionStatListService } from "../../../services/stat";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const { Title } = Typography;

type PropTypes = {
  selectedComponentId: string;
  // selectedComponentType: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const PageStat: FC<PropTypes> = (props) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { id = "" } = useParams();
  const { componentList } = useGetComponentInfo();

  const { data, loading } = useRequest(
    async () => {
      const data = await getQuestionStatListService(id, {
        page: 1,
        pageSize: 10,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  if (loading) {
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  //   const columns = [
  //     {
  //       title: "姓名",
  //       dataIndex: "name",
  //       key: "name",
  //     },
  //     {
  //       title: "年龄",
  //       dataIndex: "age",
  //       key: "age",
  //     },
  //     {
  //       title: "住址",
  //       dataIndex: "address",
  //       key: "address",
  //     },
  //   ];
  // !!!important
  const columns = componentList.map((component) => {
    const { title, props, fe_id, type } = component;
    return {
      title: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <span
            style={{
              color: selectedComponentId === fe_id ? "#1890ff" : "inherit",
            }}
          >
            {props!.title || title}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  const dataSource = data?.list.map((item: any) => {
    return {
      ...item,
      key: item._id,
    };
  });

  return (
    <div>
      <Title level={3} style={{ marginBottom: "30px" }}>
        答卷数量：{data && data.total}
      </Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      ></Table>
    </div>
  );
};

export default PageStat;
