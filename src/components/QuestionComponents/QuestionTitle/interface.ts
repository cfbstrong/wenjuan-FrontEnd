// 定义组件需要的props类型，以及默认的props

export type QuestionTitlePropsType = {
  // 定义组件需要的props类型
  title?: string;
  level?: 1 | 2 | 3;
  isCenter?: boolean;
  //rightPanel组件属性改变后，同步到画布中
  onChange?: (newProps: QuestionTitlePropsType) => void;

  isLocked?: boolean;
};

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  // 定义组件默认的props
  title: "一行标题",
  level: 1,
  isCenter: false,
};
