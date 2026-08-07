import * as types from "../actions/actionTypes";

const initialState = {
  hrs: [],
  loading: false,
  error: null,
};

const getHRReducer = (state = initialState, action) => {

  switch(action.type){

    case types.LOAD_HR_DATA_START:
      return {
        ...state,
        loading:true,
      };


    case types.LOAD_HR_DATA_SUCCESS:
      return {
        ...state,
        loading:false,
        hrs: action.payload,
      };


    case types.LOAD_HR_DATA_ERROR:
      return {
        ...state,
        loading:false,
        error:action.payload,
      };


    default:
      return state;
  }

};

export default getHRReducer;