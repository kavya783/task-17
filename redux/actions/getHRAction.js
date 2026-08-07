  import * as types from "./actionTypes";
  import { fetchHRData } from "../apis/getHRApi";


  export const getHRDataStart = () => ({
    type: types.LOAD_HR_DATA_START,
  });


  export const getHRDataSuccess = (hrs) => ({
    type: types.LOAD_HR_DATA_SUCCESS,
    payload: hrs,
  });


  export const getHRDataError = (error) => ({
    type: types.LOAD_HR_DATA_ERROR,
    payload: error,
  });


  export const getHRDataActionInitiate = () => {

    return async (dispatch) => {

      dispatch(getHRDataStart());

      try {

        const res = await fetchHRData();

        dispatch(getHRDataSuccess(res));

      } catch (error) {

        dispatch(getHRDataError(error.message));

      }

    };

  };