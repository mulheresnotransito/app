const initialState = {
  classes: [],
  currentClass: {},
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_CLASSES':
      return { ...state, classes: action.payload.classes };
      break;
    case 'SET_CURRENT_CLASS':
      return { ...state, currentClass: action.payload.currentClass };
      break;
    case 'RESET_CLASSES':
      return { ...state, classes: [] };
      break;
  }

  return state;
};