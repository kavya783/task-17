import * as types from "./actionTypes";
import { fetchNotificationData } from "../apis/getNotificationApi";


// START
export const getNotificationDataStart = () => ({
  type: types.LOAD_NOTIFICATION_DATA_START,
});


// SUCCESS
export const getNotificationDataSuccess = (notifications) => ({
  type: types.LOAD_NOTIFICATION_DATA_SUCCESS,
  payload: notifications,
});


// ERROR
export const getNotificationDataError = (error) => ({
  type: types.LOAD_NOTIFICATION_DATA_ERROR,
  payload: error,
});


// MAIN ACTION
export const getNotificationDataActionInitiate = () => {

  return async (dispatch) => {


    dispatch(getNotificationDataStart());


    try {

      const res = await fetchNotificationData();

      dispatch(
        getNotificationDataSuccess(res)
      );


    } catch(error) {


      dispatch(
        getNotificationDataError(error.message)
      );


    }


  };

};