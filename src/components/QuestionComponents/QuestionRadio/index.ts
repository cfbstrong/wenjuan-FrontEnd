import { QuestionRadioDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  type: "questionRadio",
  title: "单选题",
  props: QuestionRadioDefaultProps,
  Component,
  PropComponent,
};
