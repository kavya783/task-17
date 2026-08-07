import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const deleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_EMPLOYEE_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.DELETE_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter(
          (item) => item.id !== action.payload
        ),
      };

    case types.DELETE_EMPLOYEE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};