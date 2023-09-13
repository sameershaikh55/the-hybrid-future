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
  QUESTION_ONE_POINT_TWO_REQUEST,
  QUESTION_ONE_POINT_TWO_SUCCESS,
  QUESTION_ONE_POINT_TWO_FAIL,
  SEND_CHOSEN_DATA_REQUEST,
  SEND_CHOSEN_DATA_SUCCESS,
  SEND_CHOSEN_DATA_FAIL,
} from "@/store/types/survey";

// Importing ThunkAction and SurveyAction types from the redux-thunk library and the survey reducer's types file
import { ThunkAction } from "redux-thunk";
import { SurveyAction, SurveyState } from "@/store/reducers/survey/types";

// Getting Question 1.1
export const getQuestionOne =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_ONE_REQUEST });

      const res = await fetch(
        "/data/sample-api-response-demographics-thf-1.json"
      ); // path to your JSON file
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

// Getting Question 1.2
export const getQuestionOnePointTwo =
  (): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_ONE_POINT_TWO_REQUEST });

      const res = await fetch(
        "/data/sample-api-response-demographics-thf-2.json"
      ); // path to your JSON file
      const data = await res.json();

      dispatch({
        type: QUESTION_ONE_POINT_TWO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_ONE_POINT_TWO_FAIL,
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
  (condition?: string): ThunkAction<void, SurveyState, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: QUESTION_FOUR_REQUEST });

      let data;
      if (condition === "yes") {
        const res = await fetch(
          "/data/sample office-work-setting-v2 api response-yes.json"
        ); // path to JSON file
        data = await res.json();
      } else if (condition === "no-advance") {
        const res = await fetch(
          "/data/sample office-work-setting-v2 api response-no-advance.json"
        ); // path to JSON file
        data = await res.json();
      } else {
        const res = await fetch(
          "/data/sample office-work-setting-v2 api response.json"
        ); // path to JSON file
        data = await res.json();
      }

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

//  CHOSEN ANSWERS
export const sendChosenData =
  (data: any): ThunkAction<void, any, null, SurveyAction> =>
  async (dispatch: Dispatch<SurveyAction>) => {
    try {
      dispatch({ type: SEND_CHOSEN_DATA_REQUEST });

      console.log(data, "sendingData");

      // const response = await fetch("https://example.com/api/data", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      // const result = await response.json();

      dispatch({ type: SEND_CHOSEN_DATA_SUCCESS });
    } catch (error) {
      dispatch({ type: SEND_CHOSEN_DATA_FAIL, payload: error });
    }
  };
