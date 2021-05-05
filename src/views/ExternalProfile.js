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
  RefreshControl
} from 'react-native';

import { connect } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';

import profilePic from '../assets/images/profile-pic-3.png';
//

import calendar from '../assets/icons/calendar.png';
import clock from '../assets/icons/clock.png';
import barcode from '../assets/icons/barcode.png';
import arrowRight from '../assets/icons/arrow-right.png';
import heartbeat from '../assets/icons/heartbeat.png';
import car from "../assets/icons/car.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as functions from '../services/functions.service';
import * as ClassesController from '../controllers/classes.controller';

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

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getClasses(props.user.id);
    setRefreshing(false);
  };

  const getClasses = async (user_id) => {
    let c = await ClassesController.getAllByUserId(user_id);
    // console.log({ new_classes: c.data.lessons })
    props.setClasses(c.data.lessons);
  }
  React.useEffect(() => {
    getClasses(props.user.id);
  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" navigation={props.navigation} />

      <Styled.ScrollContainer refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

        <View style={{ alignItems: 'center', justifyContent: 'space-around', width: '95%', marginVertical: 10, flexDirection: 'row', flexWrap: 'nowrap' }}>
          <Styled.ProfileImage2 source={profilePic} />
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, color: "#C43A57" }}>{props.user.first_name + ' ' + props.user.last_name}</Text>
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
          {(btnActive == 'next-hours' && props.classes) && props.classes.map(nextHour => {

            nextHour.date = new Date(nextHour.date);

            // if (nextHour.date > new Date())

            return (
              <TouchableOpacity key={nextHour.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{(nextHour.date).getDate()}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{functions.getFullMonthName((nextHour.date).getMonth())}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {nextHour.type == "lesson" && <Styled.Illustration source={car} style={{ width: 15, height: 11.25, marginHorizontal: 1 }} />}
                    {nextHour.type == "consultation" && <Styled.Illustration source={heartbeat} style={{ width: 15, height: 13.12, marginHorizontal: 1 }} />}
                    <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{nextHour.type == "lesson" ? 'aula prática' : 'sessão psicológica'}</Text>
                  </View>
                  <Text style={{ fontWeight: '600', fontSize: 13, color: "#C43A57", marginBottom: 0, overflow: 'hidden', }}>{nextHour.starting_point.length > 25 ? (nextHour.starting_point).substr(0, 25) + "..." : nextHour.starting_point}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>início: {(nextHour.date).getHours() + ':' + (nextHour.date).getMinutes()}</Text>
                </View>
              </TouchableOpacity>
            );
          }
          )}
          {(btnActive == 'history' && props.classes) && props.classes.map(nextHour => {

            nextHour.date = new Date(nextHour.date);

            // if (nextHour.date < new Date())

            return (
              <TouchableOpacity key={nextHour.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{(nextHour.date).getDate()}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{functions.getFullMonthName((nextHour.date).getMonth())}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {nextHour.type == "lesson" && <Styled.Illustration source={car} style={{ width: 15, height: 11.25, marginHorizontal: 1 }} />}
                    {nextHour.type == "consultation" && <Styled.Illustration source={heartbeat} style={{ width: 15, height: 13.12, marginHorizontal: 1 }} />}
                    <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", marginBottom: 0 }}>{nextHour.type == "lesson" ? 'aula prática' : 'sessão psicológica'}</Text>
                  </View>
                  <Text style={{ fontWeight: '600', fontSize: 13, color: "#C43A57", marginBottom: 0, overflow: 'hidden', }}>{nextHour.starting_point.length > 25 ? (nextHour.starting_point).substr(0, 25) + "..." : nextHour.starting_point}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>início: {(nextHour.date).getHours() + ':' + (nextHour.date).getMinutes()}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Text style={{ fontWeight: '400', fontSize: 11, color: "#999" }}>status: {nextHour.status}</Text>
                    <View style={{ marginLeft: 5, width: 5, height: 5, backgroundColor: 'red', borderRadius: 10 }} />
                  </View>
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

    //user 
    user: state.userReducer,

    //classes
    classes: state.classReducer.classes,

    //consultations
    consultations: state.consultationReducer.consultations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
    setClasses: (classes) => dispatch({ type: 'SET_CLASSES', payload: { classes } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalProfile);