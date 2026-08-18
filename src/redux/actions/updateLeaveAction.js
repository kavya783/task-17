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

export const updateLeaveDataActionInitiate = (leave, id, appliedBy) => {
  return async (dispatch) => {
    dispatch(updateLeaveDataStart());

    try {
      const res = await updateLeaveData(leave, id);

      dispatch(updateLeaveDataSuccess(res));

      const refreshAppliedBy = appliedBy || (localStorage.getItem("role") === "employee" ? "employee" : "hr");
      dispatch(getLeaveDataActionInitiate(refreshAppliedBy));
    } catch (error) {
      dispatch(updateLeaveDataError(error.message));
      throw error;
    }
  };
};