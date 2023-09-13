export interface QuestionThreeOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: false;
}

export interface HandleChange {
  selectedOption: QuestionThreeOption;
}

export interface Props {
  i: number;
  questions: number;
  onChange: (e: HandleChange) => void;
  active: boolean;
  option: QuestionThreeOption;
}
