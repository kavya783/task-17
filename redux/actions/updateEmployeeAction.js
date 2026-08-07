import * as types from "./actionTypes";
import { updateEmployeeData } from "../apis/updateEmployeeApi";
import { getEmployeeDataActionInitiate } from "./getEmployeeAction";

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

      dispatch(updateEmployeeDataSuccess(res));

      // Refresh employee list
      dispatch(getEmployeeDataActionInitiate());
    } catch (error) {
      dispatch(updateEmployeeDataError(error.message));
    }
  };
};