const initialState = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  birthday: '',
  sex: '',
  language: '',
  country: '',
  is_client: '',
  is_psychologist: '',
  is_drive: '',
  signature_status: '',
  signature_expiration_date: '',
  consultations_credits: 0,
  classes_credits: 0,
  isAuthenticated: false,
  isEditable: false,
  isLoading: false,
  currentScreen: false,
  isLogin: false,
  profile_photo: '',
  screenTitle: "Home",
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        id: action.payload.id,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        birthday: action.payload.birthday,
        sex: action.payload.sex,
        language: action.payload.language,
        country: action.payload.country,
        is_client: action.payload.is_client,
        is_psychologist: action.payload.is_psychologist,
        is_drive: action.payload.is_drive,
        classes_credits: action.payload.classes_credits,
        consultations_credits: action.payload.consultations_credits,
        signature_status: action.payload.signature_status,
        signature_expiration_date: action.payload.signature_expiration_date,
        profile_photo: action.payload.profile_photo,
      };
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
    case 'SET_CLASSES_CREDITS':
      return { ...state, classes_credits: action.payload.classes_credits };
      break;
    case 'SET_CONSULTATIONS_CREDITS':
      return { ...state, consultations_credits: action.payload.consultations_credits };
      break;
    case 'SET_CURRENT_SCREEN':
      return { ...state, currentScreen: action.payload.currentScreen };
      break;
  }

  return state;
};