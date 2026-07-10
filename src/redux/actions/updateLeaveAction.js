import * as types from "./actionTypes";
import { updateLeaveData } from "../apis/updateLeaveApi";
import { getLeaveDataActionInitiate } from "./getLeaveAction";

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

      // Refresh leave list
      dispatch(getLeaveDataActionInitiate());
    } catch (error) {
      dispatch(updateLeaveDataError(error.message));
    }
  };
};