import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as ClassesController from '../controllers/classes.controller';

const ChoiceClasses = (props) => {

  const [modalIsVisible, setModalIsVisible] = React.useState(false);

  const [info, setInfo] = React.useState(props.route.params);
  React.useEffect(() => {
    // console.log({ props })
    setInfo(props.route.params);
  }, [props.route.params]);

  const getClasses = async (user_id) => {
    let c = await ClassesController.getAllByUserId(user_id);
    // console.log({ new_classes: c.data.lessons })
    props.setClasses(c.data.lessons);
  }


  const handleSchedule = async () => {
    let params = {
      date: "15/04/2021",
      id_default_time: 2,
      id_user_client: props.user.id,
      starting_point: "rua do exemplo, esquina da luz - 4774"
    }

    try {
      setModalIsVisible(true)
      let res = await ClassesController.schedule(params);
      console.log(res.data)
      if (res.data) {

        props.setScheduledClass(res.data.lesson);
        await getClasses(props.user.id)
        setModalIsVisible(false)
        props.navigation.navigate('Confirmation')
      } else {
        console.log({ res })
        setModalIsVisible(false)
      }

    } catch (error) {
      console.log({ error })
      Alert.alert('Erro', 'Não foi possível agendar a sua aula');
      setModalIsVisible(false)

    }
  }

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '95%' }}>
        <Text style={{ color: "#C43A57", textAlign: 'left' }}>Voltar</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Styled.TxtQuestion style={{ fontSize: 22, marginTop: 5 }}>Um momento...</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ fontSize: 14, color: '#555', marginVertical: 15 }}>Estamos procurando as melhores motoristas perto de você!</Styled.TxtQuestion>
            {/* <Text style={styles.modalTitle}>Estamos procurando as melhores motoristas perto de você!</Text> */}
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#C43A57' }}
              onPress={() => {
                setModalIsVisible(!modalIsVisible);
              }}>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


      <Styled.Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Styled.BtnCTA2>
          <Styled.TxtBtnCTA2 style={{ marginBottom: 30 }}>INFORMAÇÕES DA AULA</Styled.TxtBtnCTA2>
          <Styled.TxtBtnCTA2>{props.newClass.date || "NENHUMA DATA SELECIONADA"}</Styled.TxtBtnCTA2>
          <Styled.TxtBtnCTA2>{props.newClass.hour?.initial_hour + " - " + props.newClass.hour?.end_hour || "NENHUM HORÁRIO SELECIONADO"}</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>

        {props.user.classes_credits == 0 && <Styled.TxtQuestion>Você não possui créditos</Styled.TxtQuestion>}
        {props.user.classes_credits > 0 && <Styled.TxtQuestion>Você possui {props.user.classes_credits} crédito(s)</Styled.TxtQuestion>}
        {
          props.user.classes_credits > 0 &&
          <Styled.BtnCTA2 onPress={() => handleSchedule()}>
            <Styled.TxtBtnCTA2>AGENDAR COM MEUS CRÉDITOS</Styled.TxtBtnCTA2>
          </Styled.BtnCTA2>}
        {
          props.user.classes_credits == 0 &&
          <Styled.BtnCTA2 onPress={() => props.navigation.navigate('BuyClassesCredits')}>
            <Styled.TxtBtnCTA2>COMPRAR CRÉDITOS</Styled.TxtBtnCTA2>
          </Styled.BtnCTA2>
        }
      </Styled.Container>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container>
  );
};

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
    width: '90%'
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
});

const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //class
    scheduledClass: state.classReducer.scheduledClass,
    newClass: state.classReducer.newClass,

    //user
    user: state.userReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),

    //class
    setScheduledClass: (scheduledClass) => dispatch({ type: 'SET_SCHEDULED_CLASS', payload: { scheduledClass } }),
    setClasses: (classes) => dispatch({ type: 'SET_CLASSES', payload: { classes } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceClasses);