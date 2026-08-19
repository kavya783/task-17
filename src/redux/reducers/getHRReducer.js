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

    // IMPORTANT:
    // PUT success vachinappudu existing HR ni immediate ga update chestundi
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

    default:
      return state;
  }
};

export default getHRReducer;