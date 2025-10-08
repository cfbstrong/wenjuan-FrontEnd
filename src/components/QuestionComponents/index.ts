import QuesionInputConf, {
  QuestionInputPropsType,
} from "../QuestionComponents/QuestionInput";
import QuesionTitleConf, {
  QuestionTitlePropsType,
} from "../QuestionComponents/QuestionTitle";

//统一管理QuestionComponents中各个组件的props type
export type ComponentPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType;

//统一管理QuestionComponents中各个组件的所有信息
const ComponetConfList = [QuesionInputConf, QuesionTitleConf];

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
export const getComponentConfByType = (type: string) => {
  //通过type找到对应的组件，并返回componentConf    important

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
