import * as types from "./actionTypes";
import { deleteHRData } from "../apis/deleteHRApi";
import { getHRDataActionInitiate } from "./getHRAction";


export const deleteHRDataStart = () => ({
  type: types.DELETE_HR_DATA_START,
});


export const deleteHRDataSuccess = (id) => ({
  type: types.DELETE_HR_DATA_SUCCESS,
  payload: id,
});


export const deleteHRDataError = (error) => ({
  type: types.DELETE_HR_DATA_ERROR,
  payload: error,
});


export const deleteHRDataActionInitiate = (id) => {

  return async (dispatch) => {

    dispatch(deleteHRDataStart());

    try {

      await deleteHRData(id);

      dispatch(deleteHRDataSuccess(id));

      // refresh list
      dispatch(getHRDataActionInitiate());

    } catch (error) {

      dispatch(deleteHRDataError(error.message));

    }

  };

};