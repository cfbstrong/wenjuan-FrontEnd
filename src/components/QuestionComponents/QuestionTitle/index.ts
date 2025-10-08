export * from "./interface";
import { QuestionTitleDefaultProps } from "./interface";
import Component from "./Component";

// Title
//             {
//               fe_id: Random.id(),
//               type: "questionTitle", //组件类型 <a/> <div/> <input/>
//               title: "标题",
//               props: {
//                 title: "一行标题",
//                 level: 1,
//                 isCenter: false,
//               },
//             },
export default {
  type: "questionTitle",
  title: "标题",
  props: QuestionTitleDefaultProps,
  //组件本身
  Component,
};
