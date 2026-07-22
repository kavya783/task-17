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


// HR reducers
// HR reducers
import getHRReducer from "./getHRReducer";
import postHRReducer from "./addHRReducer";
import deleteHRReducer from "./deleteHRReducer";
import putHRReducer from "./updateHRReducer";


export const rootReducer = combineReducers({

  // Employee
  getemployeedata: getEmployeeReducer,
  postemployeedata: postReducer,
  deleteemployeedata: deleteReducer,
  updateemployeedata: putReducer,


  // Leave
  postleavereducer: postLeaveReducer,
  getleavereducer: getLeaveReducer,
  deleteleavereducer: deleteLeaveReducer,
  updateleavedata: putLeaveReducer,


  // HR
  gethrdata: getHRReducer,
  posthrdata: postHRReducer,
  deletehrdata: deleteHRReducer,
  updatehrdata: putHRReducer,


  // Authentication
  login: loginReducer,


  // Firebase Token
  deviceToken: deviceTokenReducer,

});


export default rootReducer;