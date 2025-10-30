import { FC } from "react";

import QuesionInputConf, {
  QuestionInputPropsType,
} from "../QuestionComponents/QuestionInput";
import QuesionTitleConf, {
  QuestionTitlePropsType,
} from "../QuestionComponents/QuestionTitle";
import QuestionParagraphConf, {
  QuestionPragraphPropsType,
} from "../QuestionComponents/QuestionParagraph";
import QuestionInfoConf, {
  QuestionInfoPropsType,
} from "../QuestionComponents/QuestionInfo";
import QuestionTextareaConf, {
  QuestionTextareaPropsType,
} from "../QuestionComponents/QuestionTextarea";
import QuestionRadioConf from "../QuestionComponents/QuestionRadio";

//统一管理QuestionComponents中各个组件的props type
export type ComponentPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionPragraphPropsType
  | QuestionInfoPropsType
  | QuestionTextareaPropsType;

export type ComponentConfType = {
  type: string;
  title: string;
  props: ComponentPropsType;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
};

//统一管理QuestionComponents中各个组件的所有信息 显示在canvas 中间画布中
const ComponetConfList = [
  QuesionInputConf,
  QuesionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
];

// 业务重点：根据组件的type来找到QuestionComponents中对应的组件
// 后端返回的数据格式
// Title组件
//             {
//               id: Random.id(),
//               type: "questionTitle", //组件类型，与后端协商好 <a/> <div/> <input/>
//               title: "标题",
//               props: {
//                 title: "一行标题",
//                 level: 1,
//                 isCenter: false,
//               },
//             },

//组件分组显示在左侧面板：组件库 中
export const ComponentGroupList = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    componentList: [QuesionTitleConf, QuestionParagraphConf, QuestionInfoConf],
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    componentList: [QuesionInputConf, QuestionTextareaConf, QuestionRadioConf],
  },
];

export const getComponentConfByType = (type: string) => {
  //通过type找到对应的组件，并返回componentConf    important
  // 通过后端数据 匹配 前端数据 找到前端的数据格式来开发

  // const componentConf = ComponetConfList.find(
  //   (componentConf) => componentConf.type === type
  // );
  // if (!componentConf) {
  //类型保护 important 根据TS红色报错灵活处理
  //   return;
  // }
  // const { Component } = componentConf;

  return ComponetConfList.find((componentConf) => componentConf.type === type);
};
