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

import * as ConsultationsController from "../controllers/consultations.controller";

const Cancel = (props) => {

  const confirmCancellation = async () => new Promise((resolve) => {
    Alert.alert("Cancelamento", "Deseja cancelar a consulta?", [
      { text: "NÃO", onPress: () => resolve(false) },
      { text: "SIM", onPress: () => resolve(true) },
    ]);
  })

  const handleCancel = async (consultationToCancel) => {
    if (!consultationToCancel.id || !consultationToCancel.id_user_client || !consultationToCancel.text) {
      Alert.alert("Oooops!", "Preencha todos os campos antes de cancelar a consulta :)");
      console.log({ scheduledConsultation: props.scheduledConsultation, consultationToCancel })
      return false;
    }
    try {
      let canceledConsultation = await ConsultationsController.cancel(consultationToCancel);
      console.log({ canceledConsultation });

      if (!canceledConsultation.error) {
        props.setScheduledConsultations(canceledConsultation.data.scheduled_consultations);
        props.setConsultationsCredits(canceledConsultation.data.consultations_credits);
        props.setScheduledConsultation({});
        Alert.alert("Consulta cancelada!", "A consulta que estava agendada anteriormente foi cancelada.");
        props.navigation.navigate("ChoiceSessions");
      } else {
        Alert.alert("Erro", "Não foi possível cancelar a consulta. Verifique os dados e tente novamente mais tarde.\nError code: " + canceledConsultation.error_code + " - " + canceledConsultation.error);
      }
      return true;
    } catch (error) {
      console.log({ error });
      Alert.alert("Erro", "Não foi possível cancelar a consulta. Verifique os dados e tente novamente mais tarde.");
      return false;
    }

  }

  React.useEffect(() => {
    if (!props.scheduledConsultation) {
      props.navigation.goBack();
    }
  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client psychologist navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43A57', width: '100%', paddingVertical: 30, marginBottom: 30 }}>
          <Styled.TxtQuestion style={{ color: "#FFF", width: '90%', fontWeight: '400' }}>Consultas canceladas ficarão como créditos para você usar quando bem entender.</Styled.TxtQuestion>
        </View>

        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'left' }}>Conte para nós o motivo do cancelamento*</Styled.TxtQuestion>
        <Styled.TxtInput defaultValue={props.scheduledConsultation?.text} onChangeText={(e) => props.setScheduledConsultation({ ...props.scheduledConsultation, text: e })} placeholder="Escreva aqui..." />

        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'left', marginVertical: 10 }}>Ficou doente e tem atestado?</Styled.TxtQuestion>

        <TouchableOpacity style={{ padding: 5, borderRadius: 5, borderWidth: 1, borderColor: '#D987A3', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, }}>anexar atestado</Text>
          <Styled.Illustration source={camera} style={{ width: 25, height: 21.88, marginHorizontal: 3, }} />
        </TouchableOpacity>

        <Styled.BtnCTA2 onPress={async () => await confirmCancellation() ? handleCancel(props.scheduledConsultation) : ""} style={{ marginTop: 50 }}>
          <Styled.TxtBtnCTA2>CANCELAR CONSULTA</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>

        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'center' }}>Obs: cancelamentos fora do prazo de 24 horas
        e não resultantes de caso fortuito ou força maior
serão taxados em 10% do valor na consulta/sessão</Styled.TxtQuestion>


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

    //consultation
    scheduledConsultation: state.consultationReducer.scheduledConsultation,
    scheduledConsultations: state.consultationReducer.scheduledConsultations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
    //consultation
    setConsultations: (consultations) => dispatch({ type: 'SET_CONSULTATIONS', payload: { consultations } }),
    setConsultationsCredits: (consultations_credits) => dispatch({ type: 'SET_CONSULTATIONS_CREDITS', payload: { consultations_credits } }),
    setScheduledConsultation: (scheduledConsultation) => dispatch({ type: 'SET_SCHEDULED_CONSULTATION', payload: { scheduledConsultation } }),
    setScheduledConsultations: (scheduledConsultations) => dispatch({ type: 'SET_SCHEDULED_CONSULTATIONS', payload: { scheduledConsultations } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cancel);