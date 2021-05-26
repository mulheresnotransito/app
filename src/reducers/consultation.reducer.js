const initialState = {
  consultations: [],
  currentConsultation: {},
  scheduledConsultation: {},
  scheduledConsultations: [],
  newConsultation: {},
  psychologists: []
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_CONSULTATIONS':
      return { ...state, consultations: action.payload.consultations };
      break;
    case 'SET_CURRENT_CONSULTATION':
      return { ...state, currentConsultation: action.payload.currentConsultation };
      break;
    case 'SET_SCHEDULED_CONSULTATION':
      return { ...state, scheduledConsultation: action.payload.scheduledConsultation };
      break;
    case 'SET_SCHEDULED_CONSULTATIONS':
      return { ...state, scheduledConsultations: action.payload.scheduledConsultations };
      break;
    case 'SET_NEW_CONSULTATION':
      return { ...state, newConsultation: action.payload.newConsultation };
      break;
    case 'SET_PSYCHOLOGISTS':
      return { ...state, psychologists: action.payload.psychologists };
      break;
    case 'RESET_CONSULTATIONS':
      return { ...state, consultations: [] };
      break;
  }

  return state;
};