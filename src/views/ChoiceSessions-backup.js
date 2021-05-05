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

import { Calendar, Agenda } from 'react-native-calendars';

import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

//
import check from "../assets/icons/check-circle-2.png"
import dotCircle from "../assets/icons/dot-circle.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as functions from '../services/functions.service';

const ChoiceSessions = (props) => {

  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [clickedSession, setClickedSession] = React.useState({});

  const [userToLogin, setUserToLogin] = React.useState({
    email: '',
    password: ''
  });

  const loginUser = (user) => {
    // if(user.email == 'teste@hinoselouvores.com' && user.password == '123456')
    //   navigation.navigate('Home');
    // else
    //   Alert.alert('Erro', 'Usuário ou senha incorretos');
    props.navigation.navigate('Market');
  }

  const [info, setInfo] = React.useState(props.route.params);
  React.useEffect(() => {
    // console.log({ props })
    setInfo(props.route.params);
  }, [props.route.params]);

  const [idActive, setIdActive] = React.useState(false);

  const [modal, setModal] = React.useState({ title: "Em desenvolvimento", desc: "Esta função que você tentou acessar ainda está em desenvolvimento" });

  const [nextClasses, setNextClasses] = React.useState([
    { id: 1, day: "20", month: "out", color: "#C43A57" },
    { id: 2, day: "20", month: "out", color: "#B94162" },
  ]);
  const [sessions, setSessions] = React.useState([
    { id: 1, month: 'SETEMBRO', date: '01', day: 'ter' },
    { id: 2, month: 'SETEMBRO', date: '02', day: 'qua' },
    { id: 3, month: 'SETEMBRO', date: '03', day: 'qui' },
    { id: 4, month: 'SETEMBRO', date: '07', day: 'seg' },
    { id: 5, month: 'SETEMBRO', date: '08', day: 'ter' },
    { id: 6, month: 'SETEMBRO', date: '09', day: 'qua' },
    { id: 7, month: 'SETEMBRO', date: '10', day: 'qui' },
    { id: 8, month: 'SETEMBRO', date: '11', day: 'sex' },
    { id: 9, month: 'SETEMBRO', date: '17', day: 'qui' },
    { id: 10, month: 'SETEMBRO', date: '18', day: 'sex' },
    { id: 11, month: 'SETEMBRO', date: '21', day: 'seg' },
    { id: 12, month: 'SETEMBRO', date: '22', day: 'ter' },
    { id: 13, month: 'SETEMBRO', date: '28', day: 'seg' },
    { id: 14, month: 'SETEMBRO', date: '30', day: 'qua' },
    { id: 15, month: 'OUTUBRO', date: '11', day: 'sex' },
    { id: 16, month: 'OUTUBRO', date: '17', day: 'qui' },
    { id: 17, month: 'OUTUBRO', date: '18', day: 'sex' },
    { id: 18, month: 'OUTUBRO', date: '21', day: 'seg' },
    { id: 19, month: 'OUTUBRO', date: '22', day: 'ter' },
    { id: 20, month: 'OUTUBRO', date: '28', day: 'seg' },
    { id: 21, month: 'OUTUBRO', date: '30', day: 'qua' },
    { id: 22, month: 'NOVEMBRO', date: '09', day: 'qua' },
    { id: 23, month: 'NOVEMBRO', date: '10', day: 'qui' },
    { id: 24, month: 'NOVEMBRO', date: '11', day: 'sex' },
    { id: 25, month: 'NOVEMBRO', date: '17', day: 'qui' },
    { id: 26, month: 'NOVEMBRO', date: '18', day: 'sex' },
    { id: 27, month: 'NOVEMBRO', date: '21', day: 'seg' },
    { id: 28, month: 'NOVEMBRO', date: '22', day: 'ter' },
  ]);

  const [months, setMonths] = React.useState(['SETEMBRO', 'OUTUBRO', 'NOVEMBRO']);

  const [selectedMonth, setSelectedMonth] = React.useState(months[0]);

  React.useEffect(() => {
    // console.log({ consultations: props.consultations })
  }, []);

  const [test, setTest] = React.useState({});

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

        {months && months.map((m, index) => {
          return (
            <View key={m} style={{ marginTop: 10, marginBottom: -5, width: '90%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'nowrap', }}>
              {((index > 0 && months.length > 1) && selectedMonth == m) &&
                <TouchableOpacity onPress={() => setSelectedMonth(months[index - 1])}>
                  <Text style={{ color: "#C43A57" }}>{"<"}</Text>
                </TouchableOpacity>
              }
              {selectedMonth == m && <Text style={{ flex: 1, textAlign: 'center', color: "#C43A57", fontSize: 18, fontWeight: '300' }}>{m}</Text>}
              {(((index >= 0 && months.length > 1) && index < months.length - 1) && selectedMonth == m) &&
                <TouchableOpacity onPress={() => setSelectedMonth(months[index + 1])}>
                  <Text style={{ color: "#C43A57" }}>{">"}</Text>
                </TouchableOpacity>
              }
            </View>
          );
        })}

        <Styled.ClassListContainer style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {sessions && sessions.map(session => {
            if (session.month == selectedMonth) return (
              <TouchableOpacity style={{ backgroundColor: idActive == session.id ? "#C43A57" : "#FFEBF1", paddingHorizontal: 1, paddingVertical: 5, margin: 5, borderRadius: 5, alignItems: 'center', justifyContent: 'center', width: 64 }} key={session.id} onPress={() => setIdActive(session.id)} >
                <Text style={{ color: idActive == session.id ? "#FFEBF1" : "#C43A57", fontSize: 30, fontWeight: '800', marginBottom: -5 }}>{session.date}</Text>
                <Text style={{ color: idActive == session.id ? "#FFEBF1" : "#C43A57", fontSize: 12, fontWeight: '400' }}>{session.day}</Text>
              </TouchableOpacity>
            );
          })}
        </Styled.ClassListContainer>



        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#E59EB6" }}>Obs: datas não disponíveis não aparecerão nessa tela</Styled.TxtQuestion>
        <Styled.BtnCTA2 onPress={() => props.navigation.navigate('ChoicePsychologistHour')} style={{ borderRadius: 50 }}>
          <Styled.TxtBtnCTA2>ESCOLHER HORÁRIO</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>

        <View style={{ backgroundColor: 'gray', width: '100%', marginBottom: 10 }}>



          <Calendar
            style={{ width: '100%', paddingVertical: 5 }}
            theme={{
              monthTextColor: 'blue',

              textMonthFontSize: 20,
              arrowColor: 'orange',
            }}
            hideExtraDays={true}

            dayComponent={({ date, state }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    let now = new Date();
                    let atualDate = functions.getFormattedDate(now, "-")
                    console.log(atualDate);
                    console.log(date.dateString + " - " + test.dateString)
                    console.log(atualDate < date.dateString);
                    console.log(new Date(atualDate), new Date(date.dateString));
                    if (atualDate < date.dateString) setTest(date);
                  }}

                  style={{
                    backgroundColor: test.dateString == date.dateString ? "#C43A57" : "#FFEBF1",
                    paddingHorizontal: 1, paddingVertical: 5, borderRadius: 10, borderWidth: 3, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', width: 64
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

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceSessions);