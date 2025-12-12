import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getComponentStatService } from "../../../services/stat";
// import StatComponent from "../../../components/QuestionComponents/QuestionCheckbox/StatComponent";
// import StatComponent from "../../../components/QuestionComponents/QuestionRadio/StatComponent";
import { getComponentConfByType } from "../../../components/QuestionComponents";
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

    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {};

    if (!StatComponent) {
      return <div>该组件无统计数据</div>;
    } else {
      return <StatComponent stat={data && data.stat} />;
    }

    // return <div>{JSON.stringify(data && data.stat)}</div>;
    // return <StatComponent stat={data && data.stat} />;
    //根据组件的type渲染对应的统计组件
  }

  return (
    <div>
      <Title level={3}>图表统计</Title>
      {genStatElem()}
    </div>
  );
};

export default ChartStat;
