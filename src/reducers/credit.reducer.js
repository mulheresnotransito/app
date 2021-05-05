const initialState = {
  newCredits: {}
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NEW_CREDITS':
      return { ...state, newCredits: action.payload.newCredits };
      break;
    case 'RESET_CREDITS':
      return { ...state };
      break;
  }

  return state;
};