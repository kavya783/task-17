import * as types from "../actions/actionTypes";


const initialState = {
  hr:null,
  loading:false,
  error:null,
};


const postHRReducer = (state=initialState, action)=>{


switch(action.type){


case types.CREATE_HR_DATA_START:

return{
 ...state,
 loading:true
};


case types.CREATE_HR_DATA_SUCCESS:

return{
 ...state,
 loading:false,
 hr:action.payload
};


case types.CREATE_HR_DATA_ERROR:

return{
 ...state,
 loading:false,
 error:action.payload
};


default:
return state;

}


};


export default postHRReducer;