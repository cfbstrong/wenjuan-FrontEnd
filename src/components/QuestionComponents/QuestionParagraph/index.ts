import { QuestionPragraphDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  type: "questionPragraph",
  title: "段落",
  props: QuestionPragraphDefaultProps,
  //组件本身
  Component,
  PropComponent,
};
