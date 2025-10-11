export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
  //rightPanel组件属性改变后，同步到画布中
  onChange?: (newProps: QuestionInputPropsType) => void;
};

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: "输入框标题",
  placeholder: "请输入...",
};
