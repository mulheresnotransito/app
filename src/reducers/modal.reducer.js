const initialState = {
  modalInfoVisible: false,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_MODAL_INFO_VISIBLE':
      return { ...state, modalInfoVisible: action.payload.modalInfoVisible };
      break;
  }

  return state;
};