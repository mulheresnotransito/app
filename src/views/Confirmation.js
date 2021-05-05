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
import * as ClassesController from '../controllers/classes.controller';

const Confirmation = (props) => {

  const [date, setDate] = React.useState(new Date(props.currentClass.date));
  const [driverName, setDriverName] = React.useState(props.currentClass.first_name + ' ' + props.currentClass.last_name);
  const [car, setCar] = React.useState({
    model: props.currentClass.car_model, brand: props.currentClass.car_brand, license_plate: props.currentClass.car_license_plate
  });
  const [startingPoint, setStartingPoint] = React.useState(props.currentClass.starting_point);

  const [isLoadingDate, setIsLoadingDate] = React.useState(true);
  const [isLoadingDriver, setIsLoadingDriver] = React.useState(true);
  const [isLoadingCar, setIsLoadingCar] = React.useState(true);
  const [isLoadingStartingPoint, setIsLoadingStartingPoint] = React.useState(true);

  const getClasses = async (user_id) => {
    let c = await ClassesController.getAllByUserId(user_id);
    // console.log({ new_classes: c.data.lessons })
    props.setClasses(c.data.lessons);
  }

  React.useEffect(() => {
    setIsLoadingDate(true);
    setIsLoadingDriver(true);
    setIsLoadingCar(true);
    setIsLoadingStartingPoint(true);

    setDate(new Date(props.currentClass.date));
    setIsLoadingDate(false);

    setDriverName(props.currentClass.first_name + ' ' + props.currentClass.last_name);
    setIsLoadingDriver(false);

    setCar({
      model: props.currentClass.car_model, brand: props.currentClass.car_brand, license_plate: props.currentClass.car_license_plate
    });
    setIsLoadingCar(false);

    setStartingPoint(props.currentClass.starting_point);
    setIsLoadingStartingPoint(false);

    console.log({ ss: props.scheduledClass })

    getClasses();

  }, [props.currentClass]);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      <Styled.ScrollContainer>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43A57', width: '100%', paddingVertical: 20 }}>
          <Styled.Illustration source={like} style={{ width: 50, height: 53.33, marginHorizontal: 3 }} />
          <Styled.TxtQuestion style={{ color: "#FFF", width: '35%', marginTop: 10 }}>Aula marcada com sucesso!</Styled.TxtQuestion>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: '100%', paddingVertical: 20 }}>
          <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 90, marginBottom: -16 }}>{props.scheduledClass.initial_hour}</Styled.TxtQuestion>
          {/* <Styled.TxtQuestion style={{ color: "#C43A57", }}>{functions.getFullDayName(date.getDay())}, {date.getDate()} de {functions.getFullMonthName(date.getMonth())}</Styled.TxtQuestion> */}
          <Styled.TxtQuestion style={{ color: "#C43A57", }}>{props.scheduledClass.date}</Styled.TxtQuestion>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBF1', width: '100%', paddingVertical: 20 }}>
          <Styled.Illustration source={profilePic} style={{ width: 100, height: 100, marginHorizontal: 3 }} />
          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 10 }}>
            <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 16, fontWeight: '600', textAlign: 'left' }}>{props.scheduledClass?.driver_name || ""}</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 16, fontWeight: '300', textAlign: 'left' }}>{props.scheduledClass?.car_model || ""} ({props.scheduledClass?.car_brand || ""})</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 16, fontWeight: '300', textAlign: 'left' }}>Placa: {props.scheduledClass?.car_license_plate || ""}</Styled.TxtQuestion>
            <TouchableOpacity style={{ padding: 5, backgroundColor: "#C43A57", flexDirection: 'row', flexWrap: 'nowrap', borderRadius: 50 }}>
              <Styled.Illustration source={whatsapp} style={{ width: 16, height: 16, marginRight: 3 }} />
              <Styled.TxtBtnCTA color="#fff" style={{ fontSize: 12 }}>Enviar mensagem</Styled.TxtBtnCTA>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: '100%', paddingVertical: 20 }}>
          <Styled.SectionContainer style={{ flexDirection: 'column', width: '90%', marginVertical: 10, marginHorizontal: 0, borderRadius: 10, backgroundColor: "#FFF", padding: 10 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
              <Styled.Illustration source={dotCircle} style={{ width: 20, height: 20, marginRight: 3 }} />
              <Styled.SectionTitle style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 16, width: '100%', margin: 0 }}>Ponto de partida</Styled.SectionTitle>
            </View>
            <Styled.TxtInput style={{ width: '100%', margin: 0, fontSize: 14 }} placeholder={props.scheduledClass?.starting_point} editable={false} />
          </Styled.SectionContainer>
        </View>

        <Styled.BtnSub onPress={() => props.navigation.navigate('Cancel')}>
          <Styled.TxtBtnSub>Cancelar aula</Styled.TxtBtnSub>
        </Styled.BtnSub>

      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,
    //class
    currentClass: state.classReducer.currentClass,
    scheduledClass: state.classReducer.scheduledClass
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),


    //class
    setClasses: (classes) => dispatch({ type: 'SET_CLASSES', payload: { classes } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);