import React, { FC } from "react";

import { Typography } from "antd";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStat: FC<PropsType> = (props) => {
  const { selectedComponentId, selectedComponentType } = props;
  return (
    <div>
      <Title level={3}>图表统计</Title>
    </div>
  );
};

export default ChartStat;
