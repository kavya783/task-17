import * as types from "./actionTypes";
import { fetchEmployeeData } from "../apis/getEmployeeApi";

export const getEmployeeDataStart = () => ({
  type: types.LOAD_EMPLOYEE_DATA_START,
});

export const getEmployeeDataSuccess = (data) => ({
  type: types.LOAD_EMPLOYEE_DATA_SUCCESS,
  payload: data,
});

export const getEmployeeDataError = (error) => ({
  type: types.LOAD_EMPLOYEE_DATA_ERROR,
  payload: error,
});

export const getEmployeeDataActionInitiate = () => {
  return async (dispatch) => {
    dispatch(getEmployeeDataStart());

    try {
      const data = await fetchEmployeeData();

      dispatch(getEmployeeDataSuccess(data));
    } catch (error) {
      dispatch(getEmployeeDataError(error.message));
    }
  };
};