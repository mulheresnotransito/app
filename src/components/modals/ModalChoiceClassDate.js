import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

//components
import { ModalContainer, ModalView, BtnModal, TxtBtnModal, ModalTitle, ModalDescription } from "../../assets/styles/styled";
import * as Styled from "../../assets/styles/styled";

import * as ClassesController from '../../controllers/classes.controller';
import * as functions from '../../services/functions.service';

const ModalChoiceClassDate = (props) => {

  const [defaultAvailableTimes, setDefaultAvailableTimes] = React.useState([]);
  const [defaultAvailableDates, setDefaultAvailableDates] = React.useState([]);
  const [selectedHour, setSelectedHour] = React.useState("");

  //7 próximas datas
  const handleGetDefaultAvailableDates = () => {
    let tempArray = [];
    let now = new Date();
    for (let index = 0; index < 5; index++) {
      let formattedDate = now.setDate(now.getDate() + 1);
      formattedDate = functions.getFormattedDateBR(now, "/");
      tempArray[index] = formattedDate;
    }
    setDefaultAvailableDates(tempArray);
  }

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
    handleGetDefaultAvailableDates();
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
          <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '600', width: '90%', textAlign: 'center' }}>Escolha uma data</Styled.TxtQuestion>

          <ScrollView bounces={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', marginVertical: 10 }}>
            {
              defaultAvailableDates && defaultAvailableDates.map((date) => {
                return (
                  <TouchableOpacity
                    key={date}
                    // onPress={() => setSelectedHour(date)}
                    // style={date.id == selectedHour.id ? styles.selectedButton : styles.inactiveButton}
                    onPress={() => props.setNewClass({ ...props.newClass, date })}
                    style={date == props.newClass?.date ? styles.selectedButton : styles.inactiveButton}
                  >
                    <Text
                      // style={date.id == selectedHour.id ? styles.selectedButtonText : styles.inactiveButtonText}
                      style={date == props.newClass?.date ? styles.selectedButtonText : styles.inactiveButtonText}
                    >{date}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalChoiceClassDate);