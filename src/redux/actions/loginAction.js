import * as types from "./actionTypes";
import { loginUser } from "../apis/loginApi";


export const loginStart = () => ({
  type: types.LOGIN_START,
});


export const loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
});


export const loginError = (error) => ({
  type: types.LOGIN_ERROR,
  payload: error,
});


export const loginActionInitiate = (user) => {

  return async (dispatch) => {

    dispatch(loginStart());

    try {

      const response = await loginUser(user);

      dispatch(loginSuccess(response));

      return response;

    } catch(error){

      dispatch(loginError(error));

      throw error;

    }
  };
};