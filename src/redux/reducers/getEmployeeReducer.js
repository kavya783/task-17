import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
  cachedAt: null,
};

export const getEmployeeReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {

    case types.LOAD_EMPLOYEE_DATA_START:
      return {
        ...state,
        loading: true,
      };

    case types.LOAD_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        cachedAt: Date.now(),
        error: null,
      };

    case types.LOAD_EMPLOYEE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};