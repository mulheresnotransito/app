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
  Dimensions
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

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'br';

const ChoiceSessionsTwo = (props) => {

  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [clickedSession, setClickedSession] = React.useState({});

  const [info, setInfo] = React.useState(props.route.params);
  React.useEffect(() => {
    // console.log({ props })
    setInfo(props.route.params);
  }, [props.route.params]);


  const [test, setTest] = React.useState({});
  const [psychologists, setPsychologists] = React.useState([
    { id: 1, name: 'Caio' },
    { id: 2, name: 'Caue' },
    { id: 3, name: 'Joao' },
  ]);

  const handleSearchFilter = (text) => {
    let temp = psychologists;
    temp = temp.filter(item => item.name.includes(text));
    console.log({ temp })
  }

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" psychologist navigation={props.navigation} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Informações da sessão</Text>
            <Text style={styles.modalText}>Nome: {clickedSession.first_name}</Text>
            <Text style={styles.modalText}>Sobrenome: {clickedSession.last_name}</Text>
            <Text style={styles.modalText}>E-mail: {clickedSession.email}</Text>
            <Text style={styles.modalText}>Status: {clickedSession.status}</Text>
            <Text style={styles.modalText}>Sexo: {clickedSession.sex}</Text>
            <Text style={styles.modalText}>Descrição: {clickedSession.description}</Text>
            {/* <Text style={styles.modalText}>{clickedSession.status}</Text> */}

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

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <Styled.SectionTitle style={{ width: '90%' }}>{props.consultations?.length > 0 ? "Próximas sessões" : "Agende uma sessão"}</Styled.SectionTitle>
        {/* <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '400', width: '90%', textAlign: 'left' }}>Próximas sessões</Styled.TxtQuestion> */}

        <Styled.ScrollHorizontal>
          {props.consultations && props.consultations.map((c, index, arr) => {
            // console.log({ c })
            let opacity = (((arr.length - (index + 1)) / arr.length) + (1 / arr.length));
            // let opacity = (index + 1) / arr.length;
            // console.log({ opacity })

            return (
              <Styled.ClassBoxCircleContainer
                // style={{ backgroundColor: c.color }} key={c.id}>
                onPress={() => {
                  setClickedSession(c)
                  setModalIsVisible(true)
                }}
                activeOpacity={0.7}
                style={{ backgroundColor: 'rgba(196, 58, 87, ' + opacity + ')' }} key={c.id}>
                <Styled.ClassBoxCircleDay>{(c.date).split("/")[0]}</Styled.ClassBoxCircleDay>
                <Styled.ClassBoxCircleMonth>{(functions.getMonthName(parseInt((c.date).split("/")[1])))}</Styled.ClassBoxCircleMonth>
              </Styled.ClassBoxCircleContainer>
            );
          })}
        </Styled.ScrollHorizontal>

        <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '600', width: '90%', textAlign: 'center' }}>Escolha uma data</Styled.TxtQuestion>
        
        <View style={{ backgroundColor: 'gray', width: '100%', marginBottom: 10 }}>

          <Calendar
            style={{ width: '100%', paddingVertical: 5 }}
            hideExtraDays={true}
            key="br"
            
            dayComponent={({ date, state }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    let atualDate = functions.getFormattedDate(new Date(), "-")
                    if (atualDate <= date.dateString) setTest(date);
                  }}

                  style={{
                    backgroundColor: test.dateString == date.dateString ? "#C43A57" : "#FFEBF1",
                    paddingHorizontal: 1, paddingVertical: 5, borderRadius: 10, borderWidth: 3,
                    borderColor: '#fff', alignItems: 'center', justifyContent: 'center', width: 64
                  }}
                >
                  <Text
                    style={{ color: test.dateString == date.dateString ? "#FFEBF1" : "#C43A57", fontSize: 30, fontWeight: '800', marginBottom: -5 }}
                  >
                    {date.day}
                  </Text>
                </TouchableOpacity>
              );
            }}

            markedDates={{
              test: { marked: true }
            }}
          />

        </View>



        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#E59EB6" }}>Obs: datas não disponíveis não aparecerão nessa tela</Styled.TxtQuestion>
        <Styled.BtnCTA2 onPress={() => props.navigation.navigate('ChoicePsychologistHour')} style={{ borderRadius: 50 }}>
          <Styled.TxtBtnCTA2>ESCOLHER HORÁRIO</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>



        {/* </Styled.Scroll> */}
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
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //consultations
    consultations: state.consultationReducer.consultations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceSessionsTwo);