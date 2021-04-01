import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import modalReducer from './modal.reducer';
import classReducer from './class.reducer';
import consultationReducer from './consultation.reducer';

export default combineReducers({
  userReducer,
  modalReducer,
  classReducer,
  consultationReducer,
});