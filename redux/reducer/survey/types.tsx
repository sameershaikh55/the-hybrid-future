// Define an interface for a single option in question one
export interface QuestionOneOption {
  option_id: number;
  option_label: string;
  optional: boolean;
  position: number;
}

// Define an interface for question one, which contains a heading, id, and options array
export interface QuestionOne {
  heading: string;
  id: number;
  options: QuestionOneOption[];
}

// Define an interface for the state of question one
export interface QuestionOneState {
  ["demographics-thf"]: QuestionOne[]; // question one state is an object with a key 'demographics-thf' whose value is an array of QuestionOne objects
}

// Define an interface for a single question two
export interface QuestionTwo {
  id: number;
  heading: string;
  Question_Type: string;
}

// Define an interface for the state of question two
export interface QuestionTwoState {
  ["average-time"]: QuestionTwo[]; // question two state is an object with a key 'average-time' whose value is an array of QuestionTwo objects
}

// Define an interface for a single option in question three
export interface QuestionThreeOption {
  option_id: number;
  option_label: string;
  position: number;
  optional: false;
}

// Define an interface for question three, which contains an id, heading, Question_Type, and options array
export interface QuestionThree {
  id: number;
  heading: string;
  Question_Type: "Radio";
  options: QuestionThreeOption[];
}

// Define an interface for the state of question three
export interface QuestionThreeState {
  distance: QuestionThree[]; // question three state is an object with a key 'distance' whose value is an array of QuestionThree objects
}

// Define an interface for the state of question four
export interface QuestionFourState {
  ["office-work-setting"]: QuestionThree[]; // question four state is an object with a key 'office-work-setting' whose value is an array of QuestionThree objects
}

// Define an interface for the state of question five
export interface QuestionFiveState {
  ["home-work-setting"]: QuestionThree[]; // question five state is an object with a key 'home-work-setting' whose value is an array of QuestionThree objects
}

// Define an interface for the state of question six
export interface QuestionSixState {
  ["presence-of-others"]: QuestionThree[]; // question six state is an object with a key 'presence-of-others' whose value is an array of QuestionThree objects
}

// Define an interface for the state of question seven
export interface QuestionSevenState {
  ["activity-question-1"]: QuestionThree[]; // question seven state is an object with a key 'activity-question-1' whose value is an array of QuestionThree objects
}

// Define an interface for the entire survey state, which contains the state of each question, as well as loading and error states
export interface SurveyState {
  questionOne: QuestionOneState | {}; // the state of question one
  questionTwo: QuestionTwoState | {}; // the state of question two
  questionThree: QuestionThreeState | {}; // the state of question three
  questionFour: QuestionFourState | {}; // the state of question four
  questionFive: QuestionFiveState | {}; // the state of question five
  questionSix: QuestionSixState | {}; // the state of question six
  questionSeven: QuestionSevenState | {}; // the state of question seven
  loading?: boolean; // a boolean representing whether the survey is currently loading
  error?: string; // a string representing any errors that occur during the survey
}

// Define an interface for a survey action, which
export interface SurveyAction {
  type: string;
  payload?:
    | QuestionOneState
    | QuestionTwoState
    | QuestionThreeState
    | QuestionFourState
    | QuestionFiveState
    | QuestionSixState
    | QuestionSevenState
    | any;
  error?: string;
}
