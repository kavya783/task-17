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
      // Update API
      const res = await updateLeaveData(leave, id);

      // Update success
      // This will update the Redux list immediately
      dispatch(updateLeaveDataSuccess(res));

      return res;
    } catch (error) {
      dispatch(updateLeaveDataError(error.message));
      throw error;
    }
  };
};