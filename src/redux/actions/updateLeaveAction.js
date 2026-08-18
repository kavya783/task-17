import * as types from "./actionTypes";
import { updateLeaveData } from "../apis/updateLeaveApi";

export const updateLeaveDataStart = () => ({
  type: types.UPDATE_LEAVE_DATA_START,
});

export const updateLeaveDataSuccess = (data) => ({
  type: types.UPDATE_LEAVE_DATA_SUCCESS,
  payload: data,
});

export const updateLeaveDataError = (error) => ({
  type: types.UPDATE_LEAVE_DATA_ERROR,
  payload: error,
});

export const updateLeaveDataActionInitiate = (leave, id) => {
  return async (dispatch) => {
    dispatch(updateLeaveDataStart());

    try {
      const res = await updateLeaveData(leave, id);

      dispatch(updateLeaveDataSuccess(res));

      return res;
    } catch (error) {
      console.error(
        "Update leave error:",
        error.response?.data || error.message
      );

      dispatch(
        updateLeaveDataError(
          error.response?.data?.error || error.message
        )
      );

      throw error;
    }
  };
};