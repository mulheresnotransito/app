const initialState = {
  currentScreen: "Home",
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_CURRENT_SCREEN':
      return { ...state, currentScreen: action.payload.currentScreen };
      break;
    case 'RESET_MENU_REDUCER':
      return { initialState };
      break;
  }

  return state;
};