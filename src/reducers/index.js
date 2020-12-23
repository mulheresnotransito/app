import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import modalReducer from './modal.reducer';

export default combineReducers({
  userReducer, 
  modalReducer, 
});