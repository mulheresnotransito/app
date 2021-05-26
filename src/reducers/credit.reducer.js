const initialState = {
  newCredits: false,
  newConsultationsCredits: false,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NEW_CREDITS':
      return { ...state, newCredits: action.payload.newCredits };
      break;
    case 'SET_NEW_CONSULTATIONS_CREDITS':
      return { ...state, newConsultationsCredits: action.payload.newConsultationsCredits };
      break;
    case 'RESET_CREDITS':
      return { ...state };
      break;
  }

  return state;
};