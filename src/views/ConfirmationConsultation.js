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
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';

//
import like from '../assets/icons/like-2.png';
import whatsapp from '../assets/icons/whatsapp-white.png';
import dotCircle from '../assets/icons/dot-circle.png';
import profilePic from '../assets/images/profile-pic-1.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as functions from '../services/functions.service';
import * as ConsultationsController from '../controllers/consultations.controller';

const ConfirmationConsultation = (props) => {

  const [date, setDate] = React.useState(new Date(props.currentConsultation.date));
  const [psychologistName, setPsychologistName] = React.useState(props.currentConsultation.first_name + ' ' + props.currentConsultation.last_name);
  const [startingPoint, setStartingPoint] = React.useState(props.currentConsultation.starting_point);

  const [isLoadingDate, setIsLoadingDate] = React.useState(true);
  const [isLoadingStartingPoint, setIsLoadingStartingPoint] = React.useState(true);

  const getConsultations = async (user_id) => {
    let c = await ConsultationsController.getAllByUserId(user_id);
    console.log({c})
    // console.log({ new_consultations: c.data.consultations })
    props.setConsultations(c.data.consultations);
  }

  React.useEffect(() => {
    setIsLoadingDate(true);
    setIsLoadingStartingPoint(true);

    setDate(new Date(props.currentConsultation.date));
    setIsLoadingDate(false);

    setPsychologistName(props.currentConsultation.psychologist_name + ' ' + props.currentConsultation.psychologist_last_name);

    setStartingPoint(props.currentConsultation.starting_point);
    setIsLoadingStartingPoint(false);

    console.log({ ss: props.scheduledConsultation })

    getConsultations(props.user.id);

  }, [props.currentConsultation]);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" psychologist navigation={props.navigation} />

      <Styled.ScrollContainer>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43A57', width: '100%', paddingVertical: 20 }}>
          <Styled.Illustration source={like} style={{ width: 50, height: 53.33, marginHorizontal: 3 }} />
          <Styled.TxtQuestion style={{ color: "#FFF", width: '35%', marginTop: 10 }}>Consulta marcada com sucesso!</Styled.TxtQuestion>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: '100%', paddingVertical: 20 }}>
          <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 90, marginBottom: -16 }}>{props.scheduledConsultation.initial_hour}</Styled.TxtQuestion>
          {/* <Styled.TxtQuestion style={{ color: "#C43A57", }}>{functions.getFullDayName(date.getDay())}, {date.getDate()} de {functions.getFullMonthName(date.getMonth())}</Styled.TxtQuestion> */}
          <Styled.TxtQuestion style={{ color: "#C43A57", }}>{props.scheduledConsultation.date}</Styled.TxtQuestion>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBF1', width: '100%', paddingVertical: 20 }}>
          <Styled.Illustration source={profilePic} style={{ width: 100, height: 100, marginHorizontal: 3 }} />
          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 10 }}>
            <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 16, fontWeight: '300', textAlign: 'left' }}>{props.scheduledConsultation?.psychologist_name + " " + props.scheduledConsultation?.psychologist_last_name}</Styled.TxtQuestion>
            <TouchableOpacity style={{ padding: 5, backgroundColor: "#C43A57", flexDirection: 'row', flexWrap: 'nowrap', borderRadius: 50 }}>
              <Styled.Illustration source={whatsapp} style={{ width: 16, height: 16, marginRight: 3 }} />
              <Styled.TxtBtnCTA color="#fff" style={{ fontSize: 12 }}>Enviar mensagem</Styled.TxtBtnCTA>
            </TouchableOpacity>
          </View>
        </View>

        <Styled.BtnSub onPress={() => props.navigation.navigate('CancelConsultation')}>
          <Styled.TxtBtnSub>Cancelar consulta</Styled.TxtBtnSub>
        </Styled.BtnSub>

      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    //user
    user: state.userReducer,
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,
    //consultation
    currentConsultation: state.consultationReducer.currentConsultation,
    scheduledConsultation: state.consultationReducer.scheduledConsultation
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),


    //consultation
    setConsultations: (consultations) => dispatch({ type: 'SET_CONSULTATIONS', payload: { consultations } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationConsultation);