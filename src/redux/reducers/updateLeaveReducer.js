import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const putLeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LEAVE_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPDATE_LEAVE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };

    case types.UPDATE_LEAVE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};