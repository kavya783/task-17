import { fetchLeaveData } from "../apis/getLeaveApi";
import * as types from "./actionTypes";

export const getLeaveDataStart = () => ({
  type: types.LOAD_LEAVE_DATA_START,
});

export const getLeaveDataSuccess = (data) => ({
  type: types.LOAD_LEAVE_DATA_SUCCESS,
  payload: data,
});

export const getLeaveDataError = (error) => ({
  type: types.LOAD_LEAVE_DATA_ERROR,
  payload: error,
});

export const getLeaveDataActionInitiate = (appliedBy) => {
  return async (dispatch) => {
    dispatch(getLeaveDataStart());

    try {
      const response = await fetchLeaveData(appliedBy);

      dispatch(getLeaveDataSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(getLeaveDataError(error.message));
      throw error;
    }
  };
};