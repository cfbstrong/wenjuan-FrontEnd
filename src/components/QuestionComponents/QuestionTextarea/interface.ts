export type QuestionTextareaPropsType = {
  title?: string;
  placeholder?: string;
  isLocked?: boolean;
  onChange?: (newProps: QuestionTextareaPropsType) => void;
};

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: "多行输入标题",
  placeholder: "请输入...",
};
