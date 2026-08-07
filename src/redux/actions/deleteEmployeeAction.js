import * as types from "./actionTypes";
import { deleteEmployeeData } from "../apis/deleteEmployeeApi";
import { getEmployeeDataActionInitiate } from "./getEmployeeAction";

export const deleteEmployeeDataStart = () => ({
  type: types.DELETE_EMPLOYEE_DATA_START,
});

export const deleteEmployeeDataSuccess = (id) => ({
  type: types.DELETE_EMPLOYEE_DATA_SUCCESS,
  payload: id,
});

export const deleteEmployeeDataError = (error) => ({
  type: types.DELETE_EMPLOYEE_DATA_ERROR,
  payload: error,
});

export const deleteEmployeeDataActionInitiate = (id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeeDataStart());

    try {
      await deleteEmployeeData(id);

      dispatch(deleteEmployeeDataSuccess(id));

      // Refresh employee list
      dispatch(getEmployeeDataActionInitiate());
    } catch (error) {
      dispatch(deleteEmployeeDataError(error.message));
    }
  };
};