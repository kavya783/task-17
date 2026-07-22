import * as types from "./actionTypes";
import { updateHRData } from "../apis/updateHRApi";
import { getHRDataActionInitiate } from "./getHRAction";

export const updateHRDataStart = () => ({
  type: types.UPDATE_HR_DATA_START,
});

export const updateHRDataSuccess = (hr) => ({
  type: types.UPDATE_HR_DATA_SUCCESS,
  payload: hr,
});

export const updateHRDataError = (error) => ({
  type: types.UPDATE_HR_DATA_ERROR,
  payload: error,
});

export const updateHRDataActionInitiate = (id, hr) => {

  return async (dispatch) => {

    dispatch(updateHRDataStart());

    try {

      const res = await updateHRData(id, hr);

      dispatch(updateHRDataSuccess(res));

      dispatch(getHRDataActionInitiate());

      return res;

    } catch (error) {

      dispatch(updateHRDataError(error.message));

      throw error;  

    }

  };

};