import React, { FC } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";

import ComponentProp from "./ComponentProp";

const items = [
  {
    key: "prop",
    label: (
      <div>
        <FileTextOutlined />
        <span>属性</span>
      </div>
    ),
    children: <ComponentProp />,
  },
  {
    key: "setting",
    label: (
      <div>
        <SettingOutlined />
        <span>页面设置</span>
      </div>
    ),
    children: <div>页面设置</div>,
  },
];

const RightPanel: FC = () => {
  return <Tabs defaultActiveKey="prop" items={items} />;
};

export default RightPanel;
