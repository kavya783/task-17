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

export const getLeaveDataActionInitiate = (
  appliedBy,
  forceRefresh = false
) => {
  return async (dispatch) => {

    dispatch(getLeaveDataStart());

    try {

      const res = await fetchLeaveData(
        appliedBy,
        forceRefresh
      );

      const list = Array.isArray(res)
        ? res
        : Object.keys(res || {}).map((key) => ({
            id: key,
            ...res[key],
          }));

      dispatch(getLeaveDataSuccess(list));

      return list;

    } catch (error) {

      dispatch(
        getLeaveDataError(error.message)
      );

      throw error;
    }
  };
};