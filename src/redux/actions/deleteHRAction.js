import * as types from "./actionTypes";
import { deleteHRData } from "../apis/deleteHRApi";

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

      // Redux list lo immediate ga remove avutundi
      dispatch(deleteHRDataSuccess(id));

      return id;

    } catch (error) {
      dispatch(deleteHRDataError(error.message));
      throw error;
    }
  };
};