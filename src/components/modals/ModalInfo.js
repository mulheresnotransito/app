import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

//components
import { ModalContainer, ModalView, BtnModal, TxtBtnModal, ModalTitle, ModalDescription } from "../../assets/styles/styled";

const ModalInfo = (props) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalInfoVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <ModalContainer>
        <ModalView>
          <ModalTitle>{props.title}</ModalTitle>
          <ModalDescription>{props.description}</ModalDescription>
          <BtnModal onPress={() => props.setModalInfoVisible(false)}>
            <TxtBtnModal>OK</TxtBtnModal>
          </BtnModal>
        </ModalView>
      </ModalContainer>
    </Modal >
  );
}


const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInfo);