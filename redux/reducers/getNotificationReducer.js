import * as types from "../actions/actionTypes";


const initialState = {

  notifications: [],
  loading:false,
  error:null

};


export const getNotificationReducer = (
  state = initialState,
  action
) => {


switch(action.type){


case types.LOAD_NOTIFICATION_DATA_START:

return {
  ...state,
  loading:true
};


case types.LOAD_NOTIFICATION_DATA_SUCCESS:

return {
  ...state,
  loading:false,
  notifications: action.payload
};


case types.LOAD_NOTIFICATION_DATA_ERROR:

return {
  ...state,
  loading:false,
  error:action.payload
};


default:

return state;

}


};