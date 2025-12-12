import React, { FC } from "react";
import { Pie, PieChart } from "recharts";
import { QuestionRadioStatPropsType } from "../QuestionRadio";

// const data01 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

const StatComponent: FC<QuestionRadioStatPropsType> = (props) => {
  const { stat } = props;
  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={stat}
        dataKey="count"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        label
      />
    </PieChart>
  );
};

export default StatComponent;
