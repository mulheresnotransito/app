import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';

import profilePic from '../assets/images/profile-pic-3.png';
import logo from '../assets/images/logo-2.png';

import calendar from '../assets/icons/calendar.png';
import clock from '../assets/icons/clock.png';
import barcode from '../assets/icons/barcode.png';
import arrowRight from '../assets/icons/arrow-right.png';
import heartbeat from '../assets/icons/heartbeat.png';
import car from "../assets/icons/car.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExternalProfile = (props) => {

  const [btnActive, setBtnActive] = React.useState('next-hours');

  const [nextHours, setNextHours] = React.useState([
    { id: 1, day: '27', month: 'julho', title: 'aula prática', description: 'início: 12:00', place: 'R. do Exemplo' },
    { id: 2, day: '17', month: 'agosto', title: 'aula prática', description: 'início: 12:30', place: 'R. do Exemplo' },
    { id: 3, day: '05', month: 'setembro', title: 'aula prática', description: 'início: 15:00', place: 'R. do Exemplo' },
    { id: 4, day: '05', month: 'outubro', title: 'sessão psicológica', description: 'início: 18:30', place: 'Dra. Marília Silva' },
    { id: 5, day: '15', month: 'novembro', title: 'sessão psicológica', description: 'início: 19:00', place: 'Dra. Marília Silva' },
  ]);

  const [history, setHistory] = React.useState([
    { id: 1, day: '01', month: 'julho', title: 'aula prática', description: 'início: 19:30', place: 'R. do Exemplo' },
    { id: 2, day: '05', month: 'agosto', title: 'sessão psicológica', description: 'início: 19:30', place: 'Dra. Manny Delgado' },
    { id: 3, day: '08', month: 'setembro', title: 'sessão psicológica', description: 'início: 19:30', place: 'Dra. Manny Delgado' },
    { id: 4, day: '26', month: 'outubro', title: 'aula prática', description: 'início: 19:30', place: 'R. do Exemplo' },
    { id: 5, day: '01', month: 'novembro', title: 'aula prática', description: 'início: 19:30', place: 'R. do Exemplo' },
  ]);



  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" navigation={props.navigation} />

      <Styled.ScrollContainer>

        <View style={{ alignItems: 'center', justifyContent: 'center', width: '95%', marginVertical: 10, flexDirection: 'row', flexWrap: 'nowrap', marginBottom: -30 }}>
          <Styled.Logo source={profilePic} />
          <View style={{ marginHorizontal: 15, flex: 1 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, color: "#C43A57" }}>Manuela Riviera</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('ProfileEdit')} style={{ width: 100, padding: 3, marginVertical: 1, backgroundColor: '#C43A57', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: "#fff" }}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', alignItems: 'center', justifyContent: 'center' }}>
          <Styled.MiniBtn active={btnActive == 'next-hours' ? true : false} onPress={() => setBtnActive('next-hours')} style={{ marginTop: 50 }}>
            <Styled.TxtMiniBtn active={btnActive == 'next-hours' ? true : false} onPress={() => setBtnActive('next-hours')} >Próximos compromissos</Styled.TxtMiniBtn>
          </Styled.MiniBtn>
          <Styled.MiniBtn active={btnActive == 'history' ? true : false} onPress={() => setBtnActive('history')} style={{ marginTop: 50 }}>
            <Styled.TxtMiniBtn active={btnActive == 'history' ? true : false} onPress={() => setBtnActive('history')} >Histórico</Styled.TxtMiniBtn>
          </Styled.MiniBtn>
        </View>

        <View style={{ width: '95%' }}>
          {(btnActive == 'next-hours' && nextHours) && nextHours.map(nextHour => {
            return (
              <TouchableOpacity key={nextHour.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{nextHour.day}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{nextHour.month}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {nextHour.title == "aula prática" && <Styled.Illustration source={car} style={{ width: 15, height: 11.25, marginHorizontal: 1 }} />}
                    {nextHour.title == "sessão psicológica" && <Styled.Illustration source={heartbeat} style={{ width: 15, height: 13.12, marginHorizontal: 1 }} />}
                    <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{nextHour.title}</Text>
                  </View>
                  <Text style={{ fontWeight: '600', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{nextHour.place}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>{nextHour.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {(btnActive == 'history' && history) && history.map(h => {
            return (
              <TouchableOpacity key={h.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{h.day}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{h.month}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {h.title == "aula prática" && <Styled.Illustration source={car} style={{ width: 15, height: 11.25, marginHorizontal: 1 }} />}
                    {h.title == "sessão psicológica" && <Styled.Illustration source={heartbeat} style={{ width: 15, height: 13.12, marginHorizontal: 1 }} />}
                    <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{h.title}</Text>
                  </View>
                  <Text style={{ fontWeight: '600', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{h.place}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>{h.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ExternalProfile);