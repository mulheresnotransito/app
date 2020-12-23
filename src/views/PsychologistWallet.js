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

import profilePic from '../assets/images/profile-pic-2.png';
import logo from '../assets/images/logo-2.png';

import calendar from '../assets/icons/calendar.png';
import clock from '../assets/icons/clock.png';
import barcode from '../assets/icons/barcode.png';
import arrowRight from '../assets/icons/arrow-right.png';
import exchange from '../assets/icons/exchange.png';
import heartbeat from "../assets/icons/heartbeat.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PsychologistWallet = (props) => {

  const [btnActive, setBtnActive] = React.useState('free-hours');

  const [freeHours, setFreeHours] = React.useState([
    { id: 1, day: '29', month: 'setembro', title: 'sessão psicológica', description: 'início: 19:30' },
    { id: 2, day: '29', month: 'setembro', title: 'sessão psicológica', description: 'início: 20:00' },
    { id: 3, day: '29', month: 'setembro', title: 'sessão psicológica', description: 'início: 21:00' },
    { id: 4, day: '29', month: 'setembro', title: 'sessão psicológica', description: 'início: 19:30' },
    { id: 5, day: '29', month: 'setembro', title: 'sessão psicológica', description: 'início: 19:30' },
  ]);

  const [nextHours, setNextHours] = React.useState([
    { id: 1, day: '27', month: 'julho', title: 'sessão psicológica', description: 'início: 12:00' },
    { id: 2, day: '17', month: 'agosto', title: 'sessão psicológica', description: 'início: 12:30' },
    { id: 3, day: '05', month: 'setembro', title: 'sessão psicológica', description: 'início: 15:00' },
    { id: 4, day: '05', month: 'outubro', title: 'sessão psicológica', description: 'início: 18:30' },
    { id: 5, day: '15', month: 'novembro', title: 'sessão psicológica', description: 'início: 19:00' },
  ]);

  const [history, setHistory] = React.useState([
    { id: 1, day: '01', month: 'julho', title: 'sessão psicológica', description: 'início: 19:30' },
    { id: 2, day: '05', month: 'agosto', title: 'sessão psicológica', description: 'início: 19:30' },
    { id: 3, day: '08', month: 'setembro', title: 'sessão psicológica', description: 'início: 19:30' },
    { id: 4, day: '26', month: 'outubro', title: 'sessão psicológica', description: 'início: 19:30' },
    { id: 5, day: '01', month: 'novembro', title: 'sessão psicológica', description: 'início: 19:30' },
  ]);



  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" navigation={props.navigation} />

      <Styled.ScrollContainer>

        <View style={{ alignItems: 'center', justifyContent: 'center', width: '95%', marginVertical: 10, flexDirection: 'row', flexWrap: 'nowrap', }}>
          <Styled.Logo source={profilePic} />
          <View style={{ marginHorizontal: 15, flex: 1 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, color: "#C43A57" }}>Maristela Costa</Text>
            <TouchableOpacity style={{ width: 100, padding: 3, marginVertical: 1, backgroundColor: '#C43A57', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: "#fff" }}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43A57', width: '100%', paddingVertical: 20, paddingHorizontal: 10, marginBottom: -20, flexDirection: 'row', flexWrap: 'nowrap' }}>
          <Text style={{ fontWeight: '400', fontSize: 24, color: "#fff", flex: 1 }}>Carteira</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: "#fff", margin: 0, padding: 0, textAlign: 'right' }}>R$</Text>
            <Text style={{ fontWeight: '800', fontSize: 32, color: "#fff", margin: 0, padding: 0, textAlign: 'left' }}>1.420,00</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', alignItems: 'center', justifyContent: 'center' }}>
          <Styled.MiniBtn active={btnActive == 'free-hours' ? true : false} onPress={() => setBtnActive('free-hours')} style={{ marginTop: 50 }}>
            <Styled.TxtMiniBtn active={btnActive == 'free-hours' ? true : false} onPress={() => setBtnActive('free-hours')} >Horários livres</Styled.TxtMiniBtn>
          </Styled.MiniBtn>
          <Styled.MiniBtn active={btnActive == 'next-hours' ? true : false} onPress={() => setBtnActive('next-hours')} style={{ marginTop: 50 }}>
            <Styled.TxtMiniBtn active={btnActive == 'next-hours' ? true : false} onPress={() => setBtnActive('next-hours')} >Próximos compromissos</Styled.TxtMiniBtn>
          </Styled.MiniBtn>
          <Styled.MiniBtn active={btnActive == 'history' ? true : false} onPress={() => setBtnActive('history')} style={{ marginTop: 50 }}>
            <Styled.TxtMiniBtn active={btnActive == 'history' ? true : false} onPress={() => setBtnActive('history')} >Histórico</Styled.TxtMiniBtn>
          </Styled.MiniBtn>
        </View>


        <Styled.SectionContainer style={{ width: '90%', marginVertical: 10, marginHorizontal: 0, borderRadius: 10, backgroundColor: "#EEEEEE", padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
            <Styled.Illustration source={calendar} style={{ width: 20, height: 22.86, marginRight: 3 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: "#C43A57"}}>14/10 (quarta-feira)</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
            <Styled.Illustration source={clock} style={{ width: 20, height: 20, marginRight: 3 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'left', color: "#C43A57"}}>18:00</Text>
          </View>
        </Styled.SectionContainer>


        <Styled.MiniBtn active style={{ marginVertical: 10 }}>
          <Styled.TxtMiniBtn style={{ fontSize: 14 }} active >Adicionar horário</Styled.TxtMiniBtn>
        </Styled.MiniBtn>

        <View style={{ width: '95%' }}>
          {(btnActive == 'free-hours' && freeHours) && freeHours.map(freeHour => {
            return (
              <TouchableOpacity key={freeHour.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{freeHour.day}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{freeHour.month}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Styled.Illustration source={heartbeat} style={{ width: 15, height: 13.12, marginHorizontal: 1 }} />
                    <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{freeHour.title}</Text>
                  </View>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>{freeHour.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {(btnActive == 'next-hours' && nextHours) && nextHours.map(nextHour => {
            return (
              <TouchableOpacity key={nextHour.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{nextHour.day}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{nextHour.month}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Styled.Illustration source={heartbeat} style={{ width: 15, height: 11.25, marginHorizontal: 1 }} />
                    <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{nextHour.title}</Text>
                  </View>
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
                    <Styled.Illustration source={heartbeat} style={{ width: 15, height: 11.25, marginHorizontal: 1 }} />
                    <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{h.title}</Text>
                  </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PsychologistWallet);