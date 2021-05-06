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
  Alert
} from 'react-native';

import { connect } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';

//
import camera from '../assets/icons/camera.png';
import whatsapp from '../assets/icons/whatsapp-green.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as ClassesController from "../controllers/classes.controller";

const Cancel = (props) => {


  const handleCancel = async (classToCancel) => {
    if (!classToCancel.id || !classToCancel.id_user_client || !classToCancel.text) {
      Alert.alert("Oooops!", "Preencha todos os campos antes de cancelar a aula :)");
      console.log({ scheduledClass: props.scheduledClass, classToCancel })
      return false;
    }
    try {
      let canceledClass = await ClassesController.cancel(classToCancel);
      console.log({ canceledClass });

      if (!canceledClass.error) {
        props.setScheduledClasses(canceledClass.data.scheduled_lessons);
        props.setClassesCredits(canceledClass.data.classes_credits);
        props.setScheduledClass({});
        Alert.alert("Aula cancelada!", "A aula que estava agendada anteriormente foi cancelada.");
        props.navigation.navigate("Home");
      } else {
        Alert.alert("Erro", "Não foi possível cancelar a aula. Verifique os dados e tente novamente mais tarde.\nError code: " + canceledClass.error_code + " - " + canceledClass.error);
      }
      return true;
    } catch (error) {
      console.log({ error });
      Alert.alert("Erro", "Não foi possível cancelar a aula. Verifique os dados e tente novamente mais tarde.");
      return false;
    }

  }

  React.useEffect(() => {
    if (!props.scheduledClass) {
      props.navigation.goBack();
    }
  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client psychologist navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43A57', width: '100%', paddingVertical: 30, marginBottom: 30 }}>
          <Styled.TxtQuestion style={{ color: "#FFF", width: '90%', fontWeight: '400' }}>Aulas canceladas ficarão como créditos para você usar quando bem entender.</Styled.TxtQuestion>
        </View>

        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'left' }}>Conte para nós o motivo do cancelamento*</Styled.TxtQuestion>
        <Styled.TxtInput defaultValue={props.scheduledClass?.text} onChangeText={(e) => props.setScheduledClass({ ...props.scheduledClass, text: e })} placeholder="Escreva aqui..." />

        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'left', marginVertical: 10 }}>Ficou doente e tem atestado?</Styled.TxtQuestion>

        <TouchableOpacity style={{ padding: 5, borderRadius: 5, borderWidth: 1, borderColor: '#D987A3', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, }}>anexar atestado</Text>
          <Styled.Illustration source={camera} style={{ width: 25, height: 21.88, marginHorizontal: 3, }} />
        </TouchableOpacity>

        <Styled.BtnCTA2 onPress={() => handleCancel(props.scheduledClass)} style={{ marginTop: 50 }}>
          <Styled.TxtBtnCTA2>CANCELAR AULA</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>


        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'center' }}>Obs: cancelamentos fora do prazo de 24 horas
        e não resultantes de caso fortuito ou força maior
serão taxados em 10% do valor na aula/sessão</Styled.TxtQuestion>


        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
          <Text style={{ fontWeight: '800', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, textAlign: 'center' }}>Precisa da nossa ajuda?</Text>
          <Styled.Illustration source={whatsapp} style={{ width: 22, height: 22, marginHorizontal: 5, }} />
          <Text style={{ fontWeight: '400', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, textAlign: 'center' }}>Fale conosco</Text>
        </TouchableOpacity>
        {/* </Styled.Scroll> */}
      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container >
  );
};

const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //class
    scheduledClass: state.classReducer.scheduledClass,
    scheduledClasses: state.classReducer.scheduledClasses,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
    //class
    setClasses: (classes) => dispatch({ type: 'SET_CLASSES', payload: { classes } }),
    setClassesCredits: (classes_credits) => dispatch({ type: 'SET_CLASSES_CREDITS', payload: { classes_credits } }),
    setScheduledClass: (scheduledClass) => dispatch({ type: 'SET_SCHEDULED_CLASS', payload: { scheduledClass } }),
    setScheduledClasses: (scheduledClasses) => dispatch({ type: 'SET_SCHEDULED_CLASSES', payload: { scheduledClasses } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cancel);