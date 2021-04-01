const initialState = {
  consultations: [],
  currentConsultation: {}
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_CONSULTATIONS':
      return { ...state, consultations: action.payload.consultations };
      break;
    case 'SET_CURRENT_CONSULTATION':
      return { ...state, currentConsultation: action.payload.currentConsultation };
      break;
    case 'RESET_CONSULTATIONS':
      return { ...state, consultations: [] };
      break;
  }

  return state;
};