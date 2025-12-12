import React, { FC, useMemo } from "react";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { QuestionRadioStatPropsType } from "../QuestionRadio";

// const data01 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

function format(count: number, sum: number) {
  return ((count / sum) * 100).toFixed(2);
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatComponent: FC<QuestionRadioStatPropsType> = (props) => {
  const { stat = [] } = props;

  //count 求和 !!!important
  const sum = useMemo(() => {
    let s = 0;
    stat.forEach((item) => {
      s += item.count;
    });
    return s;
  }, [stat]);

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
        isAnimationActive={true}
        label={({ payload }) =>
          `${payload.name}: ${format(payload.count, sum)}%`
        }
      >
        {stat.map((item, index) => {
          const { name, count } = item;
          return <Cell key={name} fill={COLORS[index]} />;
        })}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default StatComponent;
