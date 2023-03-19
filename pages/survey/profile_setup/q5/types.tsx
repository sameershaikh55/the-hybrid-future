export interface QuestionFiveOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: false;
}

export interface QuestionFive {
  id: number;
  heading: string;
  Question_Type: "Radio";
  options: QuestionFiveOption[];
}

export interface QuestionFiveState {
  ["home-work-setting"]: QuestionFive[];
}

export interface HandleChange {
  selectedOption:
    | QuestionFiveOption
    | {
        option_id: number;
      };
}

export interface RootState {
  survey: {
    questionFive: QuestionFiveState;
    loading: boolean;
  };
}
