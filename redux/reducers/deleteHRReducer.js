import * as types from "../actions/actionTypes";


const initialState = {
  loading:false,
  error:null,
};


const deleteHRReducer=(state=initialState,action)=>{


switch(action.type){


case types.DELETE_HR_DATA_START:

return{
 ...state,
 loading:true
};


case types.DELETE_HR_DATA_SUCCESS:

return{
 ...state,
 loading:false
};


case types.DELETE_HR_DATA_ERROR:

return{
 ...state,
 loading:false,
 error:action.payload
};


default:
return state;

}


};


export default deleteHRReducer;