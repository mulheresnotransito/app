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
  Modal
} from 'react-native';

import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

//
import check from "../assets/icons/check-circle-2.png"
import dotCircle from "../assets/icons/dot-circle.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChoicePsychologistHour = (props) => {

  const [modalIsVisible, setModalIsVisible] = React.useState(false);

  const [dates, setDates] = React.useState([
    { id: 1, title: 'Início: 09:30', description: 'Duração: 30 minutos', day: '11', month: 'setembro', selected: true },
    { id: 2, title: 'Início: 10:00', description: 'Duração: 30 minutos', day: '11', month: 'setembro', selected: false },
    { id: 3, title: 'Início: 10:30', description: 'Duração: 30 minutos', day: '11', month: 'setembro', selected: false },
  ]);

  const [selectedDates, setSelectedDates] = React.useState([]);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" psychologist navigation={props.navigation} />


      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '400', width: '90%', textAlign: 'left' }}>Próximas sessões</Styled.TxtQuestion>

        <View style={{ width: '95%' }}>
          {dates && dates.map((date, index) => {
            let act = selectedDates.indexOf(date.id);
            console.log({ act, id: date.id })
            return (
              <TouchableOpacity key={date.id}
                style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}
                onPress={() => setModalIsVisible(true)}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{date.day}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{date.month}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Text style={{ fontWeight: '800', fontSize: 13, color: "#C43A57", marginBottom: 5 }}>{date.title}</Text>
                  </View>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>{"- " + date.description}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {act && <Styled.Illustration source={check} style={{ width: 20, height: 20, marginRight: 10 }} />}
                  {!act && <Styled.Illustration source={dotCircle} style={{ width: 20, height: 20, marginRight: 10 }} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>



        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#E59EB6" }}>Obs: se precisar de mais de uma sessão, escolha mais de um horário</Styled.TxtQuestion>
        <Styled.BtnCTA2 onPress={() => props.navigation.navigate('ChoiceCard')} style={{ borderRadius: 50 }}>
          <Styled.TxtBtnCTA2>IR PARA PAGAMENTO </Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoicePsychologistHour);