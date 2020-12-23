const initialState = {
  id: '',
  email: '',
  name: '',
  password: '',
  user_type: '',
  signature_status: '',
  signature_expiration_date: '',
  isAuthenticated: false,
  isEditable: false,
  isLoading: false,
  currentScreen: false, 
  isLogin: false,
  screenTitle: "PRONTUÁRIOS"
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload.name };
      break;
    case 'SET_EMAIL':
      return { ...state, email: action.payload.email };
      break;
    case 'SET_PASSWORD':
      return { ...state, password: action.payload.password };
      break;
    case 'SET_USER_LOGGED':
      return { ...state, email: action.payload.email, name: action.payload.name, isAuthenticated: true };
      break;
    case 'LOGIN':
      return { ...state, isAuthenticated: true, id: action.payload.id, email: action.payload.email, name: action.payload.name, /*password: action.payload.password,*/ user_type: action.payload.user_type, signature_status: action.payload.signature_status, signature_expiration_date: action.payload.signature_expiration_date };
      break;
    case 'LOGOUT':
      // return { ...state, isAuthenticated: false, id: '', email: '', name: '', /*password: '',*/ user_type: '', signature_status: '', signature_expiration_date: '' };
      return { ...initialState };
      break;
    case 'SET_IS_EDITABLE':
      return { ...state, isEditable: action.payload.isEditable };
      break;
    case 'UPDATE_USER_INFO':
      return { ...state, isEditable: false, email: action.payload.email, name: action.payload.name, password: action.payload.password };
      break;
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload.isLoading };
      break;
    case 'SET_IS_LOGIN':
      return { ...state, isLogin: action.payload.isLogin };
      break;
    case 'SET_CURRENT_SCREEN':
      return { ...state, currentScreen: action.payload.currentScreen };
      break;
  }

  return state;
};