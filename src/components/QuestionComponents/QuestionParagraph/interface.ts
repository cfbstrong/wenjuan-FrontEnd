export type QuestionPragraphPropsType = {
  text?: string;
  isCenter?: boolean;
  isLocked?: boolean;
  onChange?: (newProps: QuestionPragraphPropsType) => void;
};

export const QuestionPragraphDefaultProps = {
  text: "一行段落",
  isCenter: false,
};
