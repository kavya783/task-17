import * as types from "./actionTypes";
import { saveHRData } from "../apis/addHRApi";
import { getHRDataActionInitiate } from "./getHRAction";


export const addHRDataStart = () => ({
  type: types.CREATE_HR_DATA_START,
});


export const addHRDataSuccess = (hr) => ({
  type: types.CREATE_HR_DATA_SUCCESS,
  payload: hr,
});


export const addHRDataError = (error) => ({
  type: types.CREATE_HR_DATA_ERROR,
  payload: error,
});


export const addHRDataActionInitiate = (hr) => {

  return async (dispatch) => {

    dispatch(addHRDataStart());

    try {

      const res = await saveHRData(hr);

      dispatch(addHRDataSuccess(res));

      // Wait until HR list is refreshed
      await dispatch(getHRDataActionInitiate());

      return res;

    } catch (error) {

      dispatch(addHRDataError(error.message));

      throw error;

    }

  };

};