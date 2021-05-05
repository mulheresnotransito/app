import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

//components
import { ModalContainer, ModalView, BtnModal, TxtBtnModal, ModalTitle, ModalDescription } from "../../assets/styles/styled";
import * as Styled from "../../assets/styles/styled";

import * as ClassesController from '../../controllers/classes.controller';

const ModalChoiceClassHour = (props) => {

  const [defaultAvailableTimes, setDefaultAvailableTimes] = React.useState([]);
  const [selectedHour, setSelectedHour] = React.useState("");

  const handleGetDefaultAvailableTimes = async () => {
    try {
      let res = await ClassesController.getDefaultAvailableTimes();
      if (res?.data) {
        setDefaultAvailableTimes(res.data.default_times);
      }
    } catch (error) {
      console.log({ error })
    }
  }

  React.useEffect(() => {
    handleGetDefaultAvailableTimes();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <ModalContainer>
        <ModalView>
          <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '600', width: '90%', textAlign: 'center' }}>Escolha um horário</Styled.TxtQuestion>

          <ScrollView bounces={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', marginVertical: 10 }}>
            {
              defaultAvailableTimes && defaultAvailableTimes.map((time) => {
                return (
                  <TouchableOpacity
                    key={time.id}
                    // onPress={() => setSelectedHour(time)}
                    // style={time.id == selectedHour.id ? styles.selectedButton : styles.inactiveButton}
                    onPress={() => props.setNewClass({ ...props.newClass, hour: time })}
                    style={time.id == props.newClass?.hour?.id ? styles.selectedButton : styles.inactiveButton}
                  >
                    <Text
                      // style={time.id == selectedHour.id ? styles.selectedButtonText : styles.inactiveButtonText}
                      style={time.id == props.newClass?.hour?.id ? styles.selectedButtonText : styles.inactiveButtonText}
                    >{time.initial_hour} - {time.end_hour}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>
          <TouchableHighlight
          underlayColor="#f5c0d0"
            style={{ ...styles.openButton, backgroundColor: '#C43A57' }}
            onPress={() => {
              props.setVisible(false);
            }}>
            <Text style={{ ...styles.textStyle }}>Fechar</Text>
          </TouchableHighlight>
        </ModalView>
      </ModalContainer>
    </Modal >
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'left',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selectedButton: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#C43A57'
  },
  inactiveButton: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#ccc'
  },
  selectedButtonText: {
    color: '#fff',
    fontSize: 16
  },
  inactiveButtonText: {
    color: '#fff',
    fontSize: 16
  }
});


const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //class
    newClass: state.classReducer.newClass
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),

    //class
    setNewClass: (newClass) => dispatch({ type: 'SET_NEW_CLASS', payload: { newClass } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalChoiceClassHour);