import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTERATION_FAIL,
  REGISTERATION_REQUEST,
  REGISTERATION_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../../types/auth";
import axios from "axios";
import { Dispatch } from "redux";

// Login
export const login = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // const config = { headers: { "Content-Type": "application/json" } };

    // const { data } = await axios.post(
    //   `/api/auth/login`,
    //   { email, password },
    //   config
    // );

    // dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

// Login
export const registeration = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: REGISTERATION_REQUEST });

    // const config = { headers: { "Content-Type": "application/json" } };

    // const { data } = await axios.post(
    //   `/api/auth/register`,
    //   { ...registerationData },
    //   config
    // );

    // dispatch({ type: REGISTERATION_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTERATION_FAIL,
      payload: error,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    // const { data } = await axios.get(`/api/profile/user-data`);

    setTimeout(() => {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: { email: "example@example.com" },
      });
    }, 1000);

    // dispatch({
    //   type: LOAD_USER_SUCCESS,
    //   payload: { email: "example@example.com" },
    // });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error });
  }
};

// Logout User
export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.get(`/api/auth/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
