import * as types from '../actions/actionTypes'
const initialState = {
    data: [],
    loading: false,
    error: null
}

export const deleteLeaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DELETE_LEAVE_DATA_START:
            return {
                ...state,
                error: null,
                loading: true
            }
       case "DELETE_LEAVE_DATA_SUCCESS":
      return {
        ...state,
        data: state.data.filter(
          (item) => item.id !== action.payload   
        ),
    

                loading: false
            }
        case types.DELETE_LEAVE_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }

}