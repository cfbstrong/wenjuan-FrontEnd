import { QuestionTextareaDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
import Component from "./Component";

export * from "./interface";

export default {
  type: "questionTextarea",
  title: "多行输入标题",
  props: QuestionTextareaDefaultProps,
  PropComponent,
  Component,
};
