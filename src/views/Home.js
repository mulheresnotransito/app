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
  Dimensions,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import logo from '../assets/images/logo-2.png';
import map from '../assets/images/map.jpeg';
import dotCircle from '../assets/icons/dot-circle.png';
import calendar from '../assets/icons/calendar.png';
import clock from '../assets/icons/clock.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as functions from '../services/functions.service';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import pic from '../assets/images/profile-pic-1.png';
import { set } from 'react-native-reanimated';

const Home = (props) => {


  const [location, setLocation] = React.useState(null);
  const [modal, setModal] = React.useState({ title: "Em desenvolvimento", desc: "Esta função que você tentou acessar ainda está em desenvolvimento" });

  const [classes, setClasses] = React.useState([
    { id: 1, day: "20", month: "out", color: "#C43A57" },
    { id: 2, day: "20", month: "out", color: "#B94162" },
    { id: 3, day: "25", month: "out", color: "#C45070" },
    { id: 4, day: "01", month: "nov", color: "#D06884" },
    { id: 5, day: "20", month: "nov", color: "#E2819B" },
  ]);
  const [exercises, setExercises] = React.useState([
    { id: 1, title: "NÚMEROS INTEIROS", teacher: "Tutoriar", description: "4º ano", icon: "ios-laptop" },
    { id: 2, title: "NÚMEROS INTEIROS", teacher: "Tutoriar", description: "5º ano", icon: "ios-keypad" },
    { id: 3, title: "NÚMEROS INTEIROS", teacher: "Jonas", description: "6º ano", icon: "ios-leaf" },
    { id: 4, title: "NÚMEROS INTEIROS", teacher: "Jonas", description: "7º ano", icon: "ios-medkit" },
    { id: 5, title: "NÚMEROS INTEIROS", teacher: "Jonas", description: "8º ano", icon: "ios-megaphone" },
  ]);
  const [modules, setModules] = React.useState([
    { id: 1, title: "4º ano", icon: "ios-flag" },
    { id: 2, title: "5º ano", icon: "ios-flame" },
    { id: 3, title: "6º ano", icon: "ios-flash" },
    { id: 4, title: "7º ano", icon: "ios-flask" },
    { id: 5, title: "8º ano", icon: "ios-flower" },
    { id: 6, title: "9º ano", icon: "ios-jet" },
  ]);
  const [ranks, setRanks] = React.useState([
    { id: 1, position: "1º", title: "João da Silva", points: 100 },
    { id: 2, position: "2º", title: "João da Silva", points: 200 },
    { id: 3, position: "3º", title: "João da Silva", points: 300 },
    { id: 4, position: "4º", title: "João da Silva", points: 400 },
    { id: 5, position: "5º", title: "João da Silva", points: 500 },
    { id: 6, position: "6º", title: "João da Silva", points: 600 },
  ]);

  const getCurrentPosition = async () => {

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
    setLocation(location);

  }

  const [searchText, setSearchText] = React.useState('');
  const [timer, setTimer] = React.useState(0);

  const searchLocal = async (textToSearch) => {
    alert(textToSearch)
  }

  const txtFill = (txt) => {
    console.log('on txt fill')
    let delay = 3000;
    console.log({delay})
    let now = new Date().getTime();
    console.log({now})
    console.log({timer})
    if (timer && (now - timer) < delay) { //o tempo é menor
      console.log(timer, now, delay)
    } else { // o tempo é maior
      setTimer(now);
      console.log(txt)
      setSearchText(txt)
    }
    // if (timer > now) { console.log(timer, now) }
    // else { console.log(timer, now) }
    // clearTimeout(timer);
    // setTimeout(searchLocal(txt), 2000);
  }


  React.useEffect(() => {
    // console.log(props.user)
    // console.log(props.classes)
    // console.log(props.consultations)
    props.classes.map(c => {
      // console.log('id: ', c.id, ' day: ', (c.date).getDate())
      // console.log('id: ', c.id, ' month: ', functions.getMonthName((c.date).getMonth()))
    })

    getCurrentPosition();

  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0, backgroundColor: '#fff' }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <Styled.SectionTitle style={{ width: '90%' }}>Próximas aulas</Styled.SectionTitle>




        {/* <ImageBackground source={map} style={{ width: '100%', height: Dimensions.get('window').height - 160, alignItems: 'center', justifyContent: 'flex-start', }}> */}
        <View style={{ width: '100%', height: Dimensions.get('window').height - 160, alignItems: 'center', justifyContent: 'flex-end', }}>



          {location && <View style={StyleSheet.absoluteFillObject}>

            <MapView
              initialRegion={{
                latitude: location.coords.latitude || 37.4219312,
                longitude: location.coords.longitude || -122.0840363,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}

              style={StyleSheet.absoluteFillObject}
            >
              <Marker
                coordinate={{ latitude: location.coords.latitude || 37.4219312, longitude: location.coords.longitude || -122.0840363 }}
                title={'Aluna X'}
                description={'Aluna X - 2 aulas'}
                icon={pic}
                style={{}}
              />

              <View style={{ position: 'absolute', top: 100, left: 50 }} />
            </MapView>

          </View>}





          <Styled.ScrollHorizontal style={{ height: 50 }} contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            {/* {classes && classes.map(c => {
              return (
                <Styled.ClassBoxCircleContainer onPress={() => props.navigation.navigate('Confirmation')} style={{ backgroundColor: c.color }} key={c.id}>
                  <Styled.ClassBoxCircleDay>{c.day}</Styled.ClassBoxCircleDay>
                  <Styled.ClassBoxCircleMonth>{c.month}</Styled.ClassBoxCircleMonth>
                </Styled.ClassBoxCircleContainer>
              );
            })} */}
            {props.classes && props.classes.map((c, index, arr) => {
              let opacity = (((arr.length - (index + 1)) / arr.length) + (1 / arr.length));
              console.log({ opacity })
              return (
                <Styled.ClassBoxCircleContainer onPress={() => {
                  console.log({ c })
                  props.setCurrentClass(c) && props.navigation.navigate('Confirmation')
                }
                }

                  activeOpacity={0.7}
                  style={{ backgroundColor: 'rgba(196, 58, 87, ' + opacity + ')' }} key={c.id}>
                  {/* // style={{ backgroundColor: 'rgba(196, 58, 87,1)' }} key={c.id}> */}
                  <Styled.ClassBoxCircleDay>{(c.date).getDate()}</Styled.ClassBoxCircleDay>
                  <Styled.ClassBoxCircleMonth>{functions.getMonthName((c.date).getMonth())}</Styled.ClassBoxCircleMonth>
                </Styled.ClassBoxCircleContainer>
              );
            })}
          </Styled.ScrollHorizontal>
          <View style={{ flex: 2 }} />
          <View style={{ flex: 2 }} />
          <View style={{ flex: 3 }} />



          <View style={{ flexDirection: 'column', width: '90%', marginVertical: 3, marginHorizontal: 0, borderRadius: 10, backgroundColor: "#fff", padding: 10, }}>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: -15 }}>
              <Styled.Illustration source={dotCircle} style={{ width: 20, height: 20, marginRight: 3 }} />
              <Styled.SectionTitle style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 16, width: '100%', margin: 0 }}>Onde nos encontramos?</Styled.SectionTitle>
            </View>
            <Styled.TxtInput style={{ width: '90%', margin: 0, fontSize: 14 }} value={searchText} onChangeText={(e) => txtFill(e)} placeholder="Digite o local aqui..." />
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', marginVertical: 3, marginHorizontal: 0, borderRadius: 10, backgroundColor: "#fff", padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
              <Styled.Illustration source={calendar} style={{ width: 20, height: 22.86, marginRight: 3 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: "#C43A57" }}>14/10 (quarta-feira)</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
              <Styled.Illustration source={clock} style={{ width: 20, height: 20, marginRight: 3 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'left', color: "#C43A57" }}>18:00</Text>
            </View>
          </View>


          <Styled.BtnCTA2 onPress={() => props.navigation.navigate('ChoiceClasses')}>
            <Styled.TxtBtnCTA2>AGENDAR</Styled.TxtBtnCTA2>
          </Styled.BtnCTA2>











          {/* </ImageBackground> */}







        </View>







        {/* </Styled.Scroll> */}
      </Styled.ScrollContainer>

      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container>
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
    //class
    setCurrentClass: (currentClass) => dispatch({ type: 'SET_CURRENT_CLASS', payload: { currentClass } }),
    //consultation
    setCurrentConsultation: (currentConsultation) => dispatch({ type: 'SET_CURRENT_CONSULTATION', payload: { currentConsultation } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);