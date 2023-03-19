export interface QuestionThreeOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: false;
}

export interface QuestionThree {
  id: number;
  heading: string;
  Question_Type: "Radio";
  options: QuestionThreeOption[];
}

export interface QuestionThreeState {
  distance: QuestionThree[];
}

export interface HandleChange {
  selectedOption:
    | QuestionThreeOption
    | {
        option_id: number;
      };
}

export interface RootState {
  survey: {
    questionThree: QuestionThreeState;
    loading: boolean;
  };
}
