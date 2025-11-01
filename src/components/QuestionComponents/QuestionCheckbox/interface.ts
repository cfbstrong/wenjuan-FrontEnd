type CheckboxOptionType = {
  value: string;
  label: string;
  checked: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  vertical?: boolean;
  list?: CheckboxOptionType[];

  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  isLocked?: boolean;
};

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: "多选标题",
  vertical: false,
  list: [
    {
      value: "item1",
      label: "选项1",
      checked: false,
    },
    {
      value: "item2",
      label: "选项2",
      checked: false,
    },
    {
      value: "item3",
      label: "选项3",
      checked: false,
    },
  ],
};
