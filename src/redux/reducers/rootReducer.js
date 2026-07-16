import { combineReducers } from "redux";

import { getEmployeeReducer } from "./getEmployeeReducer";
import { postReducer } from "./addEmployeeReducer";
import { deleteReducer } from "./deleteEmployeeReducer";
import { putReducer } from "./updateEmployeeReducer";

import { getLeaveReducer } from "./getLeaveReducer";
import { postLeaveReducer } from "./addLeaveReducer";
import { deleteLeaveReducer } from "./deleteLeaveReducer";
import { putLeaveReducer } from "./updateLeaveReducer";

import { loginReducer } from "./loginReducer";
import { deviceTokenReducer } from "./deviceTokenReducer";


export const rootReducer = combineReducers({

  getemployeedata: getEmployeeReducer,
  postemployeedata: postReducer,
  deleteemployeedata: deleteReducer,
  updateemployeedata: putReducer,

  postleavereducer: postLeaveReducer,
  getleavereducer: getLeaveReducer,
  deleteleavereducer: deleteLeaveReducer,
  updateleavedata: putLeaveReducer,

  login: loginReducer,

  deviceToken: deviceTokenReducer

});


export default rootReducer;