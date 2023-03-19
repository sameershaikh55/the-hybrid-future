export interface QuestionSixOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: false;
}

export interface QuestionSix {
  id: number;
  heading: string;
  Question_Type: "tick_m";
  question_text: string;
  options: QuestionSixOption[];
}

export interface QuestionSixState {
  ["presence-of-others"]: QuestionSix[];
}

export interface RootState {
  survey: {
    questionSix: QuestionSixState;
    loading: boolean;
  };
}
