export interface QuestionSixOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: boolean;
}

export interface Props {
  value: boolean;
  handleChange: (e: QuestionSixOption) => void;
  i: number;
  questions: number;
  option: QuestionSixOption;
}
