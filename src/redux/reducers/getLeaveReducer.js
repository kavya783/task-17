import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getLeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_LEAVE_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.LOAD_LEAVE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case types.LOAD_LEAVE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};