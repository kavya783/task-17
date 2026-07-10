import * as types from "./actionTypes";
import { saveEmployeeData } from "../apis/addEmployeeApi";
import { getEmployeeDataActionInitiate } from "./getEmployeeAction";

export const addEmployeeDataStart = () => ({
  type: types.CREATE_EMPLOYEE_DATA_START,
});

export const addEmployeeDataSuccess = (employee) => ({
  type: types.CREATE_EMPLOYEE_DATA_SUCCESS,
  payload: employee,
});

export const addEmployeeDataError = (error) => ({
  type: types.CREATE_EMPLOYEE_DATA_ERROR,
  payload: error,
});

export const addEmployeeDataActionInitiate = (employee) => {
  return async (dispatch) => {
    dispatch(addEmployeeDataStart());

    try {
      const res = await saveEmployeeData(employee);

      dispatch(addEmployeeDataSuccess(res));

      // Employee list refresh
      dispatch(getEmployeeDataActionInitiate());
    } catch (error) {
      dispatch(addEmployeeDataError(error.message));
    }
  };
};