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
  TouchableHighlight,
  Touchable,
  Dimensions,
  Alert
} from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

//
import check from "../assets/icons/check-circle-2.png"
import dotCircle from "../assets/icons/dot-circle.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as functions from '../services/functions.service';
import * as ConsultationsController from '../controllers/consultations.controller';

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'br';

const ChoiceSessionsTwo = (props) => {

  const [defaultAvailableTimes, setDefaultAvailableTimes] = React.useState([]);
  const handleGetDefaultAvailableTimes = async () => {
    try {
      let res = await ConsultationsController.getDefaultAvailableTimes();
      if (res?.data) {
        setDefaultAvailableTimes(res.data.default_times);
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const handleSchedule = async () => {

    if (!props.newConsultation?.date || !props.newConsultation?.id_default_time) {
      Alert.alert("Oooops!", "Preencha todas as informações antes de agendar a aula.");
      return false;
    } else if (props.user?.consultations_credits <= 0) {
      props.navigation.navigate('BuyConsultationsCredits')
      return false;
    }
    let consultationToSchedule = props.newConsultation;
    consultationToSchedule = {
      ...consultationToSchedule,
      id_default_time: props.newConsultation?.id_default_time,
      id_user_client: props.user.id
    };
    console.log(consultationToSchedule);

    try {

      let response = await ConsultationsController.schedule(consultationToSchedule);
      if (!response.error) {
        let scheduled = (response.data.scheduled_consultations);
        await props.setScheduledConsultations(scheduled);
        await props.setScheduledConsultation(scheduled[scheduled.length - 1]);
        await props.setConsultationsCredits(response.data.consultations_credits);
        props.navigation.navigate("ConfirmationConsultation");
      }
      else {
        Alert.alert("Erro", "Error: [" + response.error_code + "] - " + response.error);

      }

    } catch (error) {
      console.log({ error });
      Alert.alert("Erro", "Não foi possível agendar a aula. Tente novamente.");
      return false;
    }

  }


  React.useEffect(() => {
    handleGetDefaultAvailableTimes();
  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" psychologist navigation={props.navigation} />

      <Styled.PsychologistItem>
        <Styled.PsychologistSection>
          <Styled.PsychologistPhoto source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fG' }} />
        </Styled.PsychologistSection>
        <Styled.PsychologistSection style={{ borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#ddd" }}>
          <Styled.PsychologistTitle>{functions.handleFormatText(props.newConsultation?.psychologist?.first_name + " " + props.newConsultation?.psychologist?.last_name)}</Styled.PsychologistTitle>
        </Styled.PsychologistSection>
        <Styled.PsychologistSection>
          <Styled.PsychologistPrice>R$70,00</Styled.PsychologistPrice>
          <Styled.PsychologistDescription>(valor por sessão)</Styled.PsychologistDescription>
        </Styled.PsychologistSection>
      </Styled.PsychologistItem>

      <Styled.ScrollContainer>

        <Styled.CalendarChoiceText>Escolha uma data</Styled.CalendarChoiceText>

        <View style={{ backgroundColor: 'gray', width: '100%', marginBottom: 10 }}>
          <Calendar
            style={{ width: '100%', paddingVertical: 5 }}
            hideExtraDays={true}
            key="br"
            displayLoadingIndicator
            dayComponent={({ date, state }) => {
              date = (date.dateString).replace("-","/").replace("-","/");
              // date = date.replaceAll("-", "/");
              date = new Date(date);
              date = functions.getFormattedDateBR(date, "/");
              return (
                <Styled.CalendarDay
                  onPress={() => {
                    let atualDate = functions.getFormattedDateBR(new Date(), "/")
                    let temp = props.newConsultation;
                    if (atualDate < date) props.setNewConsultation({ ...temp, date });
                  }}
                  active={props.newConsultation.date == date}
                  available={functions.getFormattedDateBR(new Date(), "/") < date}
                >
                  <Styled.CalendarDayText available={functions.getFormattedDateBR(new Date(), "/") < date} active={props.newConsultation.date == date} >
                    {functions.getDateDay(date, "/")}
                  </Styled.CalendarDayText>
                </Styled.CalendarDay>
              );
            }}

            markedDates={{
              test: { marked: true }
            }}

            theme={{
              monthTextColor: "#C43A57",
              textMonthFontWeight: "800",
              arrowColor: "#C43A57"
            }}
          /> 

        </View>


        <Styled.CalendarChoiceText>Escolha um horário</Styled.CalendarChoiceText>
        <ScrollView bounces={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', marginVertical: 10 }}>
          {
            defaultAvailableTimes && defaultAvailableTimes.map((time) => {
              return (
                <Styled.SelectedComponent
                  key={time.id}
                  onPress={() => {
                    // console.log(time.id)
                    props.setNewConsultation({ ...props.newConsultation, id_default_time: time.id })
                  }}
                  active={time.id == props.newConsultation?.id_default_time}
                >
                  <Styled.SelectedComponentText active={time.id == props.newConsultation?.id_default_time}>{time.initial_hour} - {time.end_hour}</Styled.SelectedComponentText>
                </Styled.SelectedComponent>
              );
            })
          }
        </ScrollView>

        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#E59EB6" }}>Obs: datas não disponíveis não aparecerão nessa tela</Styled.TxtQuestion>
        <Styled.BtnCTA2 onPress={() => handleSchedule()} style={{ borderRadius: 50 }}>
          <Styled.TxtBtnCTA2>MARCAR AGORA</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>



      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container >
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
    //user
    user: state.userReducer,

    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //consultations
    consultations: state.consultationReducer.consultations,
    newConsultation: state.consultationReducer.newConsultation,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),

    //consultation
    setNewConsultation: (newConsultation) => dispatch({ type: 'SET_NEW_CONSULTATION', payload: { newConsultation } }),
    setScheduledConsultation: (scheduledConsultation) => dispatch({ type: 'SET_SCHEDULED_CONSULTATION', payload: { scheduledConsultation } }),
    setScheduledConsultations: (scheduledConsultations) => dispatch({ type: 'SET_SCHEDULED_CONSULTATIONS', payload: { scheduledConsultations } }),
    setConsultationsCredits: (consultations_credits) => dispatch({ type: 'SET_CONSULTATIONS_CREDITS', payload: { consultations_credits } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceSessionsTwo);