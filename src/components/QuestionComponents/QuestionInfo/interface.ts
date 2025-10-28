export type QuestionInfoPropsType = {
  title?: string;
  description?: string;

  onChange?: (newProps: QuestionInfoPropsType) => void;
  isLocked?: boolean;
};

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: "问卷标题",
  description: "问卷描述...",
};
