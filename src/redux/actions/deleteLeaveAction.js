import * as types from "./actionTypes";
import { deleteLeaveData } from "../apis/deleteLeaveApi";
import { getLeaveDataActionInitiate } from "./getLeaveAction";

export const deleteLeaveDataStart = () => ({
  type: types.DELETE_LEAVE_DATA_START,
});

export const deleteLeaveDataSuccess = (id) => ({
  type: types.DELETE_LEAVE_DATA_SUCCESS,
  payload: id,
});

export const deleteLeaveDataError = (error) => ({
  type: types.DELETE_LEAVE_DATA_ERROR,
  payload: error,
});

export const deleteLeaveDataActionInitiate = (id) => {
  return async (dispatch) => {
    dispatch(deleteLeaveDataStart());

    try {
      await deleteLeaveData(id);

      dispatch(deleteLeaveDataSuccess(id));

      // Reload leave list
      dispatch(getLeaveDataActionInitiate());

      return true;
    } catch (error) {
      dispatch(deleteLeaveDataError(error.message));
    }
  };
};