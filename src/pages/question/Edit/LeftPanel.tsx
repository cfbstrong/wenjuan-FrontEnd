import React, { FC } from "react";
import { Tabs } from "antd";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";

import ComponentLib from "./ComponentLib";
import Layers from "./Layers";

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
    children: <ComponentLib />,
  },
  {
    key: "layers", //图层
    label: (
      <div>
        <BarsOutlined />
        <span>图层</span>
      </div>
    ),
    children: <Layers />,
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
