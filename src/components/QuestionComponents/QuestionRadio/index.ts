import { QuestionRadioDefaultProps } from "./interface";
import Component from "./Component";
import StatComponent from "./StatComponent";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  type: "questionRadio",
  title: "单选题",
  props: QuestionRadioDefaultProps,
  Component,
  PropComponent,
  //统计组件
  StatComponent,
};
