import * as types from "./actionTypes";
import { saveLeaveData } from "../apis/addLeaveApi";
import { getLeaveDataActionInitiate } from "./getLeaveAction";

export const addLeaveDataStart = () => ({
  type: types.CREATE_LEAVE_DATA_START,
});

export const addLeaveDataSuccess = (leave) => ({
  type: types.CREATE_LEAVE_DATA_SUCCESS,
  payload: leave,
});

export const addLeaveDataError = (error) => ({
  type: types.CREATE_LEAVE_DATA_ERROR,
  payload: error,
});

export const addLeaveDataActionInitiate = (leave) => {
  return async (dispatch) => {
    dispatch(addLeaveDataStart());

    try {
      const res = await saveLeaveData(leave);

      dispatch(addLeaveDataSuccess(res));

      // Refresh leave list
      dispatch(getLeaveDataActionInitiate());
            return res;   
    } catch (error) {
      dispatch(addLeaveDataError(error.message));
      throw error;
    }
  };
};