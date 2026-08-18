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

export const updateLeaveDataActionInitiate = (
  leave,
  id,
  appliedBy
) => {
  return async (dispatch) => {
    dispatch(updateLeaveDataStart());

    try {
      const response = await updateLeaveData(leave, id);

      // Backend response:
      // {
      //   message: "...",
      //   leave: {...}
      // }

      const updatedLeave = response.leave;

      dispatch(updateLeaveDataSuccess(updatedLeave));

      const refreshAppliedBy =
        appliedBy ||
        (localStorage.getItem("role") === "employee"
          ? "employee"
          : "hr");

      // IMPORTANT: wait until latest data comes
      await dispatch(
        getLeaveDataActionInitiate(refreshAppliedBy)
      );

      return updatedLeave;
    } catch (error) {
      dispatch(
        updateLeaveDataError(
          error.response?.data?.error ||
          error.message
        )
      );

      throw error;
    }
  };
};