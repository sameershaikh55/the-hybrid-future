export interface Question {
  heading: string;
  id: number;
  Question_Type: string;
}

export interface Questions {
  ["average-time"]: Question[];
}

export interface HandleChange {
  heading: string;
  percentage: number;
}

export interface RootState {
  survey: {
    questionTwo: Questions;
    loading: boolean;
  };
}
