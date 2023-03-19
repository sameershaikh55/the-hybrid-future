import { Dispatch } from "redux";
import {
  QUESTION_ONE_FAIL,
  QUESTION_ONE_REQUEST,
  QUESTION_ONE_SUCCESS,
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
} from "@/redux/type/survey";

// Importing ThunkAction and SurveyAction types from the redux-thunk library and the survey reducer's types file
import { ThunkAction } from "redux-thunk";
import { SurveyAction, SurveyState } from "@/redux/reducer/survey/types";

// Getting Question One
export const getQuestionOne =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_ONE_REQUEST });

      const res = await fetch("/data/sample-demographics-response.json"); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_ONE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_ONE_FAIL,
        payload: error,
      });
    }
  };

// Getting Question Two
export const getQuestionTwo =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_TWO_REQUEST });

      const res = await fetch("/data/sample avergage time api response.json"); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_TWO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_TWO_FAIL,
        payload: error,
      });
    }
  };

// Getting Question Three
export const getQuestionThree =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_THREE_REQUEST });

      const res = await fetch("/data/sample distance api response.json"); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_THREE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_THREE_FAIL,
        payload: error,
      });
    }
  };

// Getting Question Four
export const getQuestionFour =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_FOUR_REQUEST });

      const res = await fetch(
        "/data/sample office-work-setting-v2 api response.json"
      ); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_FOUR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_FOUR_FAIL,
        payload: error,
      });
    }
  };

// Getting Question Five
export const getQuestionFive =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_FIVE_REQUEST });

      const res = await fetch(
        "/data/sample home-offifce-work-setting-v1 api response.json"
      ); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_FIVE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_FIVE_FAIL,
        payload: error,
      });
    }
  };

// Getting Question Six
export const getQuestionSix =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_SIX_REQUEST });

      const res = await fetch(
        "/data/presence-of-others samepl api response.json"
      ); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_SIX_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_SIX_FAIL,
        payload: error,
      });
    }
  };

// Getting Question Seven
export const getQuestionSeven =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_SEVEN_REQUEST });

      const res = await fetch(
        "/data/activity-question sample api resopnse.json"
      ); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_SEVEN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_SEVEN_FAIL,
        payload: error,
      });
    }
  };
