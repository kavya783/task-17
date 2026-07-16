import * as types from "./actionTypes";
import { saveDeviceTokenApi } from "../apis/deviceTokenApi";

export const saveDeviceTokenStart = () => ({
  type: types.SAVE_DEVICE_TOKEN_START,
});

export const saveDeviceTokenSuccess = (data) => ({
  type: types.SAVE_DEVICE_TOKEN_SUCCESS,
  payload: data,
});

export const saveDeviceTokenError = (error) => ({
  type: types.SAVE_DEVICE_TOKEN_ERROR,
  payload: error,
});

export const saveDeviceTokenActionInitiate = (data) => {
  return async (dispatch) => {
    dispatch(saveDeviceTokenStart());

    try {
      const response = await saveDeviceTokenApi(data);

      dispatch(saveDeviceTokenSuccess(response));

      return response;
    } catch (error) {
      dispatch(saveDeviceTokenError(error));
      throw error;
    }
  };
};