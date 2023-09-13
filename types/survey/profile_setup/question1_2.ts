export interface Option {
  option_id: number;
  option_label: string;
  optional: boolean;
  position: number;
}

export interface Question {
  heading: string;
  id: number;
  options: Option[];
}

export interface Questions {
  ["demographics-thf"]: Question[];
}

export interface HandleChange {
  heading: string;
  selectedOption: Option;
}

export interface RootState {
  survey: {
    questionOnePointTwo: Questions;
    loading: boolean;
  };
}
