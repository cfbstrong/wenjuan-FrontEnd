import { QuestionInfoDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  type: "questionInfo",
  title: "问卷信息",
  props: QuestionInfoDefaultProps,
  //组件本身
  Component,
  PropComponent,
};
