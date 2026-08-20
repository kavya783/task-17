import * as types from "../actions/actionTypes";

const initialState = {
  hrs: [],
  loading: false,
  error: null,
};

const getHRReducer = (state = initialState, action) => {

  switch (action.type) {

    case types.LOAD_HR_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.LOAD_HR_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        hrs: action.payload,
        error: null,
      };

    case types.LOAD_HR_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ADD HR
    case types.CREATE_HR_DATA_SUCCESS: {
      const newHR = action.payload.user;

      return {
        ...state,
        loading: false,
        hrs: [newHR, ...state.hrs],
        error: null,
      };
    }

    // UPDATE HR
    case types.UPDATE_HR_DATA_SUCCESS: {
      const updatedHR = action.payload;

      return {
        ...state,
        loading: false,

        hrs: state.hrs.map((item) =>
          item.id === updatedHR.id
            ? {
                ...item,
                ...updatedHR,
              }
            : item
        ),

        error: null,
      };
    }

    // DELETE HR
    case types.DELETE_HR_DATA_SUCCESS: {
      const deletedId = action.payload;

      return {
        ...state,
        loading: false,
        hrs: state.hrs.filter(
          (item) => item.id !== deletedId
        ),
        error: null,
      };
    }

    default:
      return state;
  }
};

export default getHRReducer;