import React, { FC, useEffect, useState } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";

import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

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
    children: <PageSetting />,
  },
];

const RightPanel: FC = () => {
  // activeKey 动态切换显示的tab面板
  const [activeKey, setActiveKey] = useState("prop");

  const { selectedId } = useGetComponentInfo();

  function handleTabClick(key: string) {
    setActiveKey(key);
  }

  useEffect(() => {
    if (selectedId) {
      //说明当前选中了组件
      setActiveKey("prop");
    } else {
      setActiveKey("setting");
    }
  }, [selectedId]);

  return (
    <Tabs activeKey={activeKey} items={items} onTabClick={handleTabClick} />
  );
};

export default RightPanel;
