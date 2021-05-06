const initialState = {
  classes: [],
  scheduledClasses: [],
  currentClass: {},
  scheduledClass: {},
  newClass: {},
  classToCancel: {}
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_CLASSES':
      return { ...state, classes: action.payload.classes };
      break;
    case 'SET_CURRENT_CLASS':
      return { ...state, currentClass: action.payload.currentClass };
      break;
    case 'SET_SCHEDULED_CLASS':
      return { ...state, scheduledClass: action.payload.scheduledClass };
      break;
    case 'SET_SCHEDULED_CLASSES':
      return { ...state, scheduledClasses: action.payload.scheduledClasses };
      break;
    case 'SET_NEW_CLASS':
      return { ...state, newClass: action.payload.newClass };
      break;
    case 'SET_CLASS_TO_CANCEL':
      return { ...state, classToCancel: action.payload.classToCancel };
      break;
    case 'RESET_CLASSES':
      return { ...state, classes: [] };
      break;
  }

  return state;
};