// Define an interface for the entire survey state, which contains the state of each question, as well as loading and error states
export interface SurveyState {
  user: any | {}; // the state of question one
  isAuthenticated: boolean; // a boolean representing whether the survey is currently loading
  loading: boolean; // a boolean representing whether the survey is currently loading
  error?: string | null; // a string representing any errors that occur during the survey
}

// Define an interface for a survey action, which
export interface SurveyAction {
  type: string;
  payload?: any;
  error?: string;
}
