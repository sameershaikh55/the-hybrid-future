// Import initial state from the store and action types
import { initalState } from "@/store/store";
import {
  QUESTION_ONE_REQUEST,
  QUESTION_ONE_SUCCESS,
  QUESTION_ONE_FAIL,
  QUESTION_TWO_REQUEST,
  QUESTION_TWO_SUCCESS,
  QUESTION_TWO_FAIL,
  QUESTION_THREE_REQUEST,
  QUESTION_THREE_SUCCESS,
  QUESTION_THREE_FAIL,
  QUESTION_FOUR_REQUEST,
  QUESTION_FOUR_SUCCESS,
  QUESTION_FOUR_FAIL,
  QUESTION_FIVE_REQUEST,
  QUESTION_FIVE_SUCCESS,
  QUESTION_FIVE_FAIL,
  QUESTION_SIX_REQUEST,
  QUESTION_SIX_SUCCESS,
  QUESTION_SIX_FAIL,
  QUESTION_SEVEN_REQUEST,
  QUESTION_SEVEN_SUCCESS,
  QUESTION_SEVEN_FAIL,
  QUESTION_ONE_POINT_TWO_FAIL,
  QUESTION_ONE_POINT_TWO_REQUEST,
  QUESTION_ONE_POINT_TWO_SUCCESS,
  SEND_CHOSEN_DATA_REQUEST,
  SEND_CHOSEN_DATA_SUCCESS,
  SEND_CHOSEN_DATA_FAIL,
} from "../../types/survey";
import { SurveyAction, SurveyState } from "./types";

// Define the reducer function with initial state and action types
export const surveyQuestions = (
  state = {
    ...initalState.survey, // Spread initial state from the store
  },
  action: SurveyAction // Specify the type of the action
): SurveyState => {
  switch (action.type) {
    // If any of the question request actions are dispatched, set loading to true
    case QUESTION_ONE_REQUEST:
    case QUESTION_ONE_POINT_TWO_REQUEST:
    case QUESTION_TWO_REQUEST:
    case QUESTION_THREE_REQUEST:
    case QUESTION_FOUR_REQUEST:
    case QUESTION_FIVE_REQUEST:
    case QUESTION_SIX_REQUEST:
    case QUESTION_SEVEN_REQUEST:
    case SEND_CHOSEN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // If question one is successfully retrieved, set loading to false and update the question one field
    case QUESTION_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        questionOne: action.payload,
      };
    // If question one is successfully retrieved, set loading to false and update the question one field
    case QUESTION_ONE_POINT_TWO_SUCCESS:
      return {
        ...state,
        loading: false,
        questionOnePointTwo: action.payload,
      };
    // If question two is successfully retrieved, set loading to false and update the question two field
    case QUESTION_TWO_SUCCESS:
      return {
        ...state,
        loading: false,
        questionTwo: action.payload,
      };
    // If question three is successfully retrieved, set loading to false and update the question three field
    case QUESTION_THREE_SUCCESS:
      return {
        ...state,
        loading: false,
        questionThree: action.payload,
      };
    // If question four is successfully retrieved, set loading to false and update the question four field
    case QUESTION_FOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        questionFour: action.payload,
      };
    // If question five is successfully retrieved, set loading to false and update the question five field
    case QUESTION_FIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        questionFive: action.payload,
      };
    // If question six is successfully retrieved, set loading to false and update the question six field
    case QUESTION_SIX_SUCCESS:
      return {
        ...state,
        loading: false,
        questionSix: action.payload,
      };
    // If question seven is successfully retrieved, set loading to false and update the question seven field
    case QUESTION_SEVEN_SUCCESS:
      return {
        ...state,
        loading: false,
        questionSeven: action.payload,
      };
    // If any of the question fail actions are dispatched, set loading to false and update the error field
    case SEND_CHOSEN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    // If any of the question fail actions are dispatched, set loading to false and update the error field
    case QUESTION_ONE_FAIL:
    case QUESTION_ONE_POINT_TWO_FAIL:
    case QUESTION_TWO_FAIL:
    case QUESTION_THREE_FAIL:
    case QUESTION_FOUR_FAIL:
    case QUESTION_FIVE_FAIL:
    case QUESTION_SIX_FAIL:
    case QUESTION_SEVEN_FAIL:
    case SEND_CHOSEN_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // If none of the above cases are matched, return the current state
    default:
      return state;
  }
};
