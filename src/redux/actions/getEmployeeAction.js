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
      const cachedEmployees = sessionStorage.getItem("employees");

      if (cachedEmployees) {
        dispatch(
          getEmployeeDataSuccess(
            JSON.parse(cachedEmployees)
          )
        );
        return;
      }

      const data = await fetchEmployeeData();

       sessionStorage.setItem(
        "employees",
        JSON.stringify(data)
      );

      dispatch(
        getEmployeeDataSuccess(data)
      );

    } catch (error) {
      dispatch(
        getEmployeeDataError(error.message)
      );
    }
  };
};