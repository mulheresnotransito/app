import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import modalReducer from './modal.reducer';
import classReducer from './class.reducer';
import consultationReducer from './consultation.reducer';
import noticeReducer from './notice.reducer';
import creditReducer from './credit.reducer';
import menuReducer from './menu.reducer';

export default combineReducers({
  userReducer,
  modalReducer,
  classReducer,
  consultationReducer,
  noticeReducer,
  creditReducer,
  menuReducer,
});