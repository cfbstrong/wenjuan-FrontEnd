import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getComponentStatService } from "../../../services/stat";
import StatComponent from "../../../components/QuestionComponents/QuestionCheckbox/StatComponent";
// import StatComponent from "../../../components/QuestionComponents/QuestionRadio/StatComponent";
import { useRequest } from "ahooks";
import { Typography } from "antd";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStat: FC<PropsType> = (props) => {
  const { id = "" } = useParams();
  const { selectedComponentId, selectedComponentType } = props;

  const { data, loading, run } = useRequest(
    async () => {
      const data = await getComponentStatService(id, selectedComponentId);
      return data;
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    // console.log("selectedComponentId", selectedComponentId);
    run();
  }, [id, selectedComponentId]);

  function genStatElem() {
    if (!selectedComponentId) {
      return <div>未选中组件</div>;
    }
    // return <div>{JSON.stringify(data && data.stat)}</div>;
    return <StatComponent stat={data && data.stat} />;
  }

  return (
    <div>
      <Title level={3}>图表统计</Title>
      {genStatElem()}
    </div>
  );
};

export default ChartStat;
