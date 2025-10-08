//  componentList: [
// Title
//             {
//               id: Random.id(),
//               type: "questionTitle", //组件类型 <a/> <div/> <input/>
//               title: "标题",
//               props: {
//                 title: "一行标题",
//                 level: 1,
//                 isCenter: false,
//               },
//             },
// Input
//             {
//               id: Random.id(),
//               type: "questionInput", //不能重复，前后端统一好
//               title: "输入框1",
//               props: {
//                 title: "你的电话", //目前是默认，一旦前端修改了属性，就会发送请求保存到服务器上，后面服务器返回的就是客户自定义的内容了
//                 placeholder: "请输入电话...",
//               },
//             },
//            Input
//             {
//               id: Random.id(),
//               type: "questionInput", //不能重复，前后端统一好
//               title: "输入框2",
//               props: {
//                 title: "你的姓名", //目前是默认，一旦前端修改了属性，就会发送请求保存到服务器上，后面服务器返回的就是客户自定义的内容了
//                 placeholder: "请输入姓名...",
//               },
//             },
//           ],
// 后端返回的组件数据结构如上

export * from "./interface";
import { QuestionInputDefaultProps } from "./interface";
import Component from "./Component";

//          {
//               id: Random.id(),
//               type: "questionTitle", //组件类型，与后端协商好 <a/> <div/> <input/>
//               title: "标题",
//               props: {
//                 title: "一行标题",
//                 level: 1,
//                 isCenter: false,
//               },
//             },
export default {
  type: "questionInput",
  title: "标题",
  props: QuestionInputDefaultProps,
  //组件本身
  Component,
};
