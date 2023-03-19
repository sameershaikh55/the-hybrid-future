export interface QuestionFourOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: false;
}

export interface QuestionFour {
  id: number;
  heading: string;
  Question_Type: "Radio";
  options: QuestionFourOption[];
}

export interface QuestionFourState {
  ["office-work-setting"]: QuestionFour[];
}

export interface HandleChange {
  selectedOption:
    | QuestionFourOption
    | {
        option_id: number;
      };
}

export interface RootState {
  survey: {
    questionFour: QuestionFourState;
    loading: boolean;
  };
}
