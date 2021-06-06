import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import dotCircle from '../assets/icons/dot-circle.png';
import calendar from '../assets/icons/calendar.png';
import clock from '../assets/icons/clock.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as functions from '../services/functions.service';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import * as ClassesController from '../controllers/classes.controller';
import * as ConsultationsController from '../controllers/consultations.controller';
import ModalChoiceClassDate from '../components/modals/ModalChoiceClassDate';
import ModalChoiceClassHour from '../components/modals/ModalChoiceClassHour';
import { TextInput } from 'react-native-gesture-handler';

const Home = (props) => {

  const [clickedClass, setClickedClass] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [clickedLocation, setClickedLocation] = React.useState(null);
  const [modalDateVisible, setModalDateVisible] = React.useState(false);
  const [modalHourVisible, setModalHourVisible] = React.useState(false);
  const [map, setMap] = React.useState(false);
  const [filtered, setFiltered] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [selectedResult, setSelectedResult] = React.useState(false);
  const [isEditingAddress, setIsEditingAddress] = React.useState(false);

  const getCurrentPosition = async () => {

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      Alert.alert("Ops...", "Permissão de localização negada :(");
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (e) {
      console.log(e)
    }

  }

  const getScheduledClasses = async (user_id) => {
    let c = await ClassesController.getAllScheduledByUserId(user_id);
    let scheduled = c.data.scheduled_lessons;
    await props.setScheduledClasses(scheduled);
  }

  const getScheduledConsultations = async (user_id) => {
    let c = await ConsultationsController.getAllScheduledByUserId(user_id);
    let scheduled = c.data.scheduled_consultations;
    await props.setScheduledConsultations(scheduled);
  }

  const handleSchedule = async () => {

    if (!props.newClass?.date || !props.newClass?.hour || !props.newClass?.starting_point) {
      Alert.alert("Oooops!", "Preencha todas as informações antes de agendar a aula.");
      return false;
    } else if (props.user?.classes_credits <= 0) {
      props.navigation.navigate('BuyClassesCredits')
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
      if (!response.error) {
        let scheduled_lessons = (response.data.scheduled_lessons);
        let last_lesson_scheduled = (response.data.last_lesson_scheduled);
        await props.setCurrentClass(last_lesson_scheduled);
        await props.setScheduledClasses(scheduled_lessons);
        await props.setScheduledClass(last_lesson_scheduled);
        await props.setClassesCredits(response.data.classes_credits);
        props.navigation.navigate("Confirmation");
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


  const realignMap = () => {

    try {
      console.log("trying to realing map", map.fitToSuppliedMarkers ? "1" : "0")
      setTimeout(() => {
        console.log("into set timeout...", map.fitToSuppliedMarkers ? "1" : "0");



        if (location && selectedResult) map.fitToCoordinates([
          { latitude: selectedResult?.geometry?.location.lat, longitude: selectedResult?.geometry?.location.lng },
          { latitude: location.coords.latitude, longitude: location.coords.longitude }
        ],
          {
            edgePadding: { left: 100, top: 100, right: 100, bottom: 100 }, animated: true
          }
        );
        else if (location)
          map.fitToCoordinates([
            { latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }
          ]);

        // map.fitToSuppliedMarkers(["destination", "origin"], {
        //   edgePadding: { left: 1000, top: 1000, right: 1000, bottom: 1000 }, animated: true
        // })
      }, 1000);
    } catch (error) {
      console.log({ error_on_realing_map: error })
    }

  };

  const handleSetClickedLocation = (loc) => {
    setClickedLocation(loc)
    setSearchText(loc.title);
    setFiltered([]);
    realignMap();
    return true;
  }

  const handleSetSelectedResult = (loc) => {
    loc.title = loc.address_components[0].long_name;
    setSelectedResult(loc)
    setSearchText(loc.title);
    setFiltered([]);
    realignMap();
    return true;
  }

  React.useEffect(() => {
    getScheduledClasses(props.user.id);
    getScheduledConsultations(props.user.id);
    getCurrentPosition();
  }, [props.user]);

  React.useEffect(() => {
    if (map) {
      realignMap();
      console.log({ location });
      console.log({ selectedResult })
    }
  }, [location]);

  React.useEffect(() => {
    if (selectedResult) handleSetSelectedResult(selectedResult)
  }, [selectedResult]);

  return (
    <Styled.Container style={{ paddingTop: 0, backgroundColor: '#fff' }}>
      <Header screenTitle="Home" home client navigation={props.navigation} />


      <ModalChoiceClassDate visible={modalDateVisible} setVisible={setModalDateVisible} />
      <ModalChoiceClassHour visible={modalHourVisible} setVisible={setModalHourVisible} />

      {
        props.scheduledClasses?.length > 0
        &&
        <View style={{ height: 110, width: "100%", alignItems: "center", justifyContent: "center" }}>
          <Styled.SectionTitleTwo style={{ width: "90%" }}>Próximas aulas</Styled.SectionTitleTwo>

          <Styled.ClassesScrollHorizontal>
            {props.scheduledClasses && props.scheduledClasses.map((c, index, arr) => {
              let opacity = (((arr.length - (index + 1)) / arr.length) + (1 / arr.length));
              if (c.status == "scheduled")
                return (
                  <Styled.ClassBox key={c.id}>
                    <Styled.ClassBoxCircleContainer onPress={async () => {
                      setClickedClass(c)
                      await props.setScheduledClass(c)
                      props.navigation.navigate("Confirmation");
                    }
                    }
                      activeOpacity={0.7}
                      style={{ backgroundColor: 'rgba(196, 58, 87, ' + opacity + ')' }} key={c.id}>
                      <Styled.ClassBoxCircleDay>{(c.date)?.split("/")[0] || ""}</Styled.ClassBoxCircleDay>
                      <Styled.ClassBoxCircleMonth>{(functions.getMonthName(parseInt((c.date).split("/")[1]), 1))}</Styled.ClassBoxCircleMonth>
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

        <View style={{ flex: 1, paddingBottom: 20, width: '100%', alignItems: 'center', justifyContent: 'flex-end', }}>


          {location && <View style={StyleSheet.absoluteFillObject}>

            <MapView
              initialRegion={{
                latitude: selectedResult ? selectedResult?.geometry?.location.lat : (location ? (location?.coords?.latitude) : 37.4219312),
                longitude: selectedResult ? selectedResult?.geometry?.location.lng : (location ? (location?.coords?.longitude) : -122.0840363),
                latitudeDelta: 0.004757,
                longitudeDelta: 0.006866,
              }}
              loadingEnabled
              showsUserLocation={location ? true : false}
              style={StyleSheet.absoluteFillObject}
              ref={object => setMap(object)}
            >
              {selectedResult && <Marker
                coordinate={{ latitude: selectedResult?.geometry?.location.lat, longitude: selectedResult?.geometry?.location.lng }}
                title={selectedResult?.name}
                description={'Ponto de partida da aula'}
                style={{}}
                identifier="destination"
              />}
              <View style={{ position: 'absolute', top: 100, left: 50 }} />
            </MapView>

          </View>}

          <View style={{ backgroundColor: "#FFF", maxHeight: isEditingAddress ? 200 : 80, flexDirection: 'column', width: '90%', marginVertical: 5, marginHorizontal: 0, borderRadius: 10, padding: 10, height: 200 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: 0 }}>
              <Styled.Illustration source={dotCircle} style={{ width: 20, height: 20, marginRight: 3 }} />
              <Styled.SectionTitle style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 16, width: '100%', margin: 0 }}>Onde nos encontramos?</Styled.SectionTitle>
            </View>

            <GooglePlacesAutocomplete
              placeholder='Digite o local aqui...'
              fetchDetails={true}
              onPress={(data, details = null) => {
                setSelectedResult(details);
                props.setNewClass({ ...props.newClass, starting_point: details.formatted_address });
              }}
              onNotFound={() => console.log("Place not found")}
              onTimeout={() => console.log("Timeout... not found")}
              onFail={(error) => console.log({ error })}


              query={{
                key: 'AIzaSyD3WSrKrOMcx5wDr-9aGWqBMyQAlBdnVaI',
                language: 'pt-br',
                components: "country:br",
              }}

              textInputProps={{
                InputComp: TextInput,
                leftIcon: { type: 'font-awesome', name: 'chevron-left' },
                errorStyle: { color: 'red' },
                placeholderTextColor: "#E46788",
                onFocus: () => setIsEditingAddress(true),
                onEndEditing: () => setIsEditingAddress(false)
              }}

              requestUrl={{
                url:
                  'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                useOnPlatform: 'web',
              }}

              styles={{
                container: { marginVertical: 0, width: "100%" },
                textInput: {
                  borderBottomWidth: 1,
                  borderColor: "#C43A57",
                  fontSize: 14,
                  color: "#555",
                },
              }}
            />
          </View>


          <View style={{ flex: 2 }} />

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
    newClass: state.classReducer.newClass,
    currentClass: state.classReducer.currentClass,
    scheduledClass: state.classReducer.scheduledClass,
    scheduledClasses: state.classReducer.scheduledClasses,

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
    setNewClass: (newClass) => dispatch({ type: 'SET_NEW_CLASS', payload: { newClass } }),
    setScheduledClass: (scheduledClass) => dispatch({ type: 'SET_SCHEDULED_CLASS', payload: { scheduledClass } }),
    setScheduledClasses: (scheduledClasses) => dispatch({ type: 'SET_SCHEDULED_CLASSES', payload: { scheduledClasses } }),
    setClassesCredits: (classes_credits) => dispatch({ type: 'SET_CLASSES_CREDITS', payload: { classes_credits } }),
    //consultation
    setCurrentConsultation: (currentConsultation) => dispatch({ type: 'SET_CURRENT_CONSULTATION', payload: { currentConsultation } }),
    setScheduledConsultations: (scheduledConsultations) => dispatch({ type: 'SET_SCHEDULED_CONSULTATIONS', payload: { scheduledConsultations } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);