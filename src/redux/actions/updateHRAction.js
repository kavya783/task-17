import * as types from "./actionTypes";
import { updateHRData } from "../apis/updateHRApi";

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

      console.log("UPDATE HR RESPONSE:", res);

      // API response lo actual HR res.user lo undi
      const updatedHR = res.user;

      // Actual HR object ni Redux ki pampisthunnam
      dispatch(updateHRDataSuccess(updatedHR));

      return updatedHR;
    } catch (error) {
      dispatch(updateHRDataError(error.message));
      throw error;
    }
  };
};