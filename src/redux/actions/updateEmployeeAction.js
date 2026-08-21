import * as types from "./actionTypes";
import { updateEmployeeData } from "../apis/updateEmployeeApi";

export const updateEmployeeDataStart = () => ({
  type: types.UPDATE_EMPLOYEE_DATA_START,
});

export const updateEmployeeDataSuccess = (data) => ({
  type: types.UPDATE_EMPLOYEE_DATA_SUCCESS,
  payload: data,
});

export const updateEmployeeDataError = (error) => ({
  type: types.UPDATE_EMPLOYEE_DATA_ERROR,
  payload: error,
});

export const updateEmployeeDataActionInitiate = (employee, id) => {
  return async (dispatch) => {
    dispatch(updateEmployeeDataStart());

    try {
      const res = await updateEmployeeData(employee, id);

      .log("UPDATED EMPLOYEE RESPONSE:", res);

      dispatch(updateEmployeeDataSuccess(res));

      return res;
    } catch (error) {
      dispatch(updateEmployeeDataError(error.message));
      throw error;
    }
  };
};