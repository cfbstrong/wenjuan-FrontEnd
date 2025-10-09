import React, { FC } from "react";
import { Tabs } from "antd";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";

import { ComponentGroupList } from "../../../components/QuestionComponents";

//important 可以直接在antd官网里面修改实例代码 观察效果 再来修改代码
const items = [
  {
    key: "componentLib", //组件库
    label: (
      <div>
        <AppstoreAddOutlined />
        <span>组件库</span>
      </div>
    ),
    children: <div>组件库</div>,
  },
  {
    key: "layers", //图层
    label: (
      <div>
        <BarsOutlined />
        <span>图层</span>
      </div>
    ),
    children: <div>图层</div>,
  },
];

const LeftPanel: FC = () => {
  return (
    <div>
      <Tabs defaultActiveKey="componentLib" items={items} />
    </div>
  );
};

export default LeftPanel;
