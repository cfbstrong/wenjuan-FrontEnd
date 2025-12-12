import { QuestionCheckboxDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
  type: "questionCheckbox",
  title: "多选",
  props: QuestionCheckboxDefaultProps,
  Component,
  PropComponent,
  StatComponent,
};
