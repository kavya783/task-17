import * as types from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const deviceTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_DEVICE_TOKEN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.SAVE_DEVICE_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case types.SAVE_DEVICE_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};