export interface QuestionSevenOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: boolean;
}

export interface QuestionSeven {
  id: number;
  heading: string;
  Question_Type: "tick";
  options: QuestionSevenOption[];
}

export interface QuestionSevenState {
  ["activity-question-1"]: QuestionSeven[];
}

export interface RootState {
  survey: {
    questionSeven: QuestionSevenState;
    loading: boolean;
  };
}
