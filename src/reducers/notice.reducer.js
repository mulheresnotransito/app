const initialState = {
  notices: [],
  currentNotice: {},
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NOTICES':
      return { ...state, notices: action.payload.notices };
      break;
    case 'SET_CURRENT_NOTICE':
      return { ...state, currentNotice: action.payload.currentNotice };
      break;
    case 'RESET_NOTICES':
      return { ...state, notices: [], currentNotice: {} };
      break;
  }

  return state;
};