import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  ImageBackground,
  RefreshControl,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Pressable
} from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import { Ionicons } from '@expo/vector-icons';

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
import * as ClassesController from '../controllers/classes.controller';
import ModalChoiceClassDate from '../components/modals/ModalChoiceClassDate';
import ModalChoiceClassHour from '../components/modals/ModalChoiceClassHour';

const Home = (props) => {

  const [clickedClass, setClickedClass] = React.useState(false);
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [clickedLocation, setClickedLocation] = React.useState(null);

  const getCurrentPosition = async () => {

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location)
    setLocation(location);

  }

  const getClasses = async (user_id) => {
    console.log({ user_id })
    let c = await ClassesController.getAllByUserId(user_id);
    console.log({ new_classes: c.data.lessons })
    await props.setClasses(c.data.lessons);
  }

  React.useEffect(() => {
    getClasses(props.user.id);
    getCurrentPosition();
    // console.log(props.user)
  }, []);

  const [modalDateVisible, setModalDateVisible] = React.useState(false);
  const [modalHourVisible, setModalHourVisible] = React.useState(false);
  const [newClass, setNewClass] = React.useState({ date: '', hour: '', });

  const handleSchedule = async () => {

    if (!props.newClass?.date || !props.newClass?.hour) {
      Alert.alert("Oooops!", "Preencha todas as informações antes de agendar a aula.");
      return false;
    } else if (props.user?.classes_credits <= 0) {
      Alert.alert("Oooops!", "Você não tem créditos para agendar a aula.", [
        { text: "COMPRAR CRÉDITOS", onPress: () => { props.navigation.navigate('BuyClassesCredits') } }
      ]);
      return false;
    }
    let classToSchedule = props.newClass;
    classToSchedule = {
      ...classToSchedule,
      id_default_time: classToSchedule.hour.id,
      id_user_client: props.user.id
    };

    try {

      let response = await ClassesController.schedule(classToSchedule);
      console.log({ lessons: response.data.lessons });
      console.log({ classes_credits: response.data.classes_credits });
      props.setClasses(response.data.lessons);
      props.setClassesCredits(response.data.classes_credits);
    } catch (error) {
      console.log({ error });
      Alert.alert("Erro", "Não foi possível agendar a aula. Tente novamente.");
      return false;
    }

  }

  const [map, setMap] = React.useState({});

  // const realignMap = () => map.fitToSuppliedMarkers(["origin", "destination"], {
  const realignMap = () => {

    setTimeout(() => {
      map.fitToSuppliedMarkers(["destination"], {
        edgePadding: { left: 100, top: 100, right: 100, bottom: 100 }, animated: true
      })
    }, 1000);
  };

  const [filtered, setFiltered] = React.useState([]);
  const [results, setResults] = React.useState([
    { id: 1, title: "test 1", coords: { latitude: 37.7897442, longitude: -122.3972337 } },
    { id: 2, title: "Transamerica pyramid 2", coords: { latitude: 37.7951775, longitude: -122.4027787 } },
    { id: 3, title: "Sutro Tower", coords: { latitude: 37.7428201, longitude: -122.4701585 } },
  ]);
  const [searchText, setSearchText] = React.useState('');
  const handleOnSearch = (text) => {
    if (text != "") setFiltered(results.filter(r => r.title.includes(text)));
    else setFiltered([]);
    return text.toLowerCase();
  }

  const handleSetClickedLocation = (loc) => {
    setClickedLocation(loc)
    // setClickedLocation({ ...clickedLocation, coords: { latitude: loc.coords.latitude, longitude: loc.coords.longitude } });
    // setLocation({ ...location, coords: { latitude: loc.coords.latitude, longitude: loc.coords.longitude } });
    setSearchText(loc.title);
    setFiltered([]);
    realignMap();
    return true;
  }

  return (
    // <Styled.Container style={{ paddingTop: 0, backgroundColor: '#fff' }}>
    // <Styled.ContainerKeyboard behavior="position" enabled style={{ paddingTop: 0, backgroundColor: '#fff' }}>
    <Styled.ContainerKeyboard behavior="position" enabled
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#fff",
        width: "100%"
      }}>
      <Header screenTitle="Home" client navigation={props.navigation} />


      <ModalChoiceClassDate visible={modalDateVisible} setVisible={setModalDateVisible} />
      <ModalChoiceClassHour visible={modalHourVisible} setVisible={setModalHourVisible} />

      {
        props.classes?.length > 0
        &&
        <View style={{ height: 110, width: "90%" }}>
          <Styled.SectionTitleTwo>Próximas aulas</Styled.SectionTitleTwo>

          <Styled.ClassesScrollHorizontal>
            {props.classes && props.classes.map((c, index, arr) => {
              let opacity = (((arr.length - (index + 1)) / arr.length) + (1 / arr.length));
              // console.log({c})
              console.log(arr.length, "index: ", index)
              if (c.status != "canceled")
                return (
                  <Styled.ClassBox key={c.id}>
                    <Styled.ClassBoxCircleContainer onPress={async () => {
                      setClickedClass(c)
                      await props.setScheduledClass(c)
                      props.navigation.navigate("Confirmation");
                      // setModalIsVisible(true)
                    }
                    }
                      activeOpacity={0.7}
                      style={{ backgroundColor: 'rgba(196, 58, 87, ' + opacity + ')' }} key={c.id}>
                      <Styled.ClassBoxCircleDay>{(c.date)?.split("/")[0] || ""}</Styled.ClassBoxCircleDay>
                      <Styled.ClassBoxCircleMonth>{(functions.getMonthName(parseInt((c.date).split("/")[1])))}</Styled.ClassBoxCircleMonth>
                    </Styled.ClassBoxCircleContainer>
                  </Styled.ClassBox>
                );
            })}
          </Styled.ClassesScrollHorizontal>
        </View>
      }

      <Styled.MapContainer>
        {
          (props.user?.is_psychologist || props.user?.is_driver) && <Styled.TextAlert>Essa tela é visível apenas para o cliente</Styled.TextAlert>
        }

        <View style={{ flex: 1, paddingBottom: 20, width: '100%', /*height: Dimensions.get('window').height - 200, */ alignItems: 'center', justifyContent: 'flex-end', }}>


          {location && <View style={StyleSheet.absoluteFillObject}>

            <MapView
              initialRegion={{
                latitude: location.coords.latitude || 37.4219312,
                longitude: location.coords.longitude || -122.0840363,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                // latitudeDelta: 0.0004,
                // longitudeDelta: 0.0004,
              }}

              style={StyleSheet.absoluteFillObject}
              ref={object => setMap(object)}
            >
              {location && <Marker
                coordinate={{ latitude: location?.coords.latitude, longitude: location?.coords.longitude }}
                title={'Aluna X'}
                description={'Aluna X - 2 aulas'}
                icon={pic}
                style={{}}
                identifier="origin"
              />}
              {clickedLocation && <Marker
                coordinate={{ latitude: clickedLocation?.coords.latitude, longitude: clickedLocation?.coords.longitude }}
                title={clickedLocation?.title}
                description={'Destino clicado no mapa.'}
                icon={pic}
                style={{}}
                identifier="destination"
              />}
              <View style={{ position: 'absolute', top: 100, left: 50 }} />
            </MapView>

          </View>}

          <View style={{ flexDirection: 'column', width: '90%', marginVertical: 5, marginHorizontal: 0, borderRadius: 10, backgroundColor: "#fff", padding: 10, }}>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: -15 }}>
              <Styled.Illustration source={dotCircle} style={{ width: 20, height: 20, marginRight: 3 }} />
              <Styled.SectionTitle style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 16, width: '100%', margin: 0 }}>Onde nos encontramos?</Styled.SectionTitle>
            </View>
            <Styled.TxtInput style={{ width: '90%', margin: 0, fontSize: 14 }} value={searchText} onChangeText={(e) => setSearchText(handleOnSearch(e))} placeholder="Digite o local aqui..." />
          </View>

          <View style={{ flex: 2 }} />

          {/* <GooglePlacesAutocomplete
            styles={{ container: { backgroundColor: "green", height: 50, width: "90%", marginVertical: 5 } }}
            placeholder='Search'
            value={searchText}
            onFail={(e) => console.log("error", e)}
            onChangeText={(e) => console.log(e)}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyBvEDZQOn34br9BLqNTUe9HbJNACpFody8',
              language: 'en',
            }}
          /> */}

          <View style={{ width: "90%", backgroundColor: "#FFF" }}>
            {filtered && filtered.map(result => {
              return (
                <TouchableOpacity key={result.id} style={{ padding: 6, margin: 2, borderBottomWidth: 2, borderBottomColor: "#ccc" }}
                  onPress={() => handleSetClickedLocation(result)}
                >
                  <Text>{result.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', marginVertical: 3, marginHorizontal: 0, borderRadius: 10, backgroundColor: "#fff", padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => setModalDateVisible(true)}
              style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
              <Styled.Illustration source={calendar} style={{ width: 20, height: 22.86, marginRight: 3 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: "#C43A57" }}>{props.newClass?.date || "Escolher data"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalHourVisible(true)}
              style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
              <Styled.Illustration source={clock} style={{ width: 20, height: 20, marginRight: 3 }} />
              {!(props.newClass?.hour) && <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'left', color: "#C43A57" }}>Escolher horário</Text>}
              {(props.newClass?.hour) && <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'left', color: "#C43A57" }}>{props.newClass?.hour?.initial_hour + " - " + props.newClass?.hour?.end_hour}</Text>}
            </TouchableOpacity>
          </View>

          <Styled.BtnCTA2 onPress={() => handleSchedule()}>
            <Styled.TxtBtnCTA2>AGENDAR</Styled.TxtBtnCTA2>
          </Styled.BtnCTA2>

        </View>
      </Styled.MapContainer>

      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.ContainerKeyboard>
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
    alignItems: 'flex-start',
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
    marginTop: 10
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

    //user 
    user: state.userReducer,

    //classes
    classes: state.classReducer.classes,
    newClass: state.classReducer.newClass,

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
    setClasses: (classes) => dispatch({ type: 'SET_CLASSES', payload: { classes } }),
    setScheduledClass: (scheduledClass) => dispatch({ type: 'SET_SCHEDULED_CLASS', payload: { scheduledClass } }),
    setClassesCredits: (classes_credits) => dispatch({ type: 'SET_CLASSES_CREDITS', payload: { classes_credits } }),
    //consultation
    setCurrentConsultation: (currentConsultation) => dispatch({ type: 'SET_CURRENT_CONSULTATION', payload: { currentConsultation } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);