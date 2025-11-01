export type RadioOptionType = {
  value: string;
  label: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  value?: string; //默认选中项
  vertical?: boolean; //是否垂直排列
  options?: RadioOptionType[]; //选项列表

  onChange?: (newProps: QuestionRadioPropsType) => void;
  isLocked?: boolean;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: "单选标题",
  value: "",
  vertical: false,
  options: [
    {
      value: "item1",
      label: "选项1",
    },
    {
      value: "item2",
      label: "选项2",
    },
    {
      value: "item3",
      label: "选项3",
    },
  ],
};
