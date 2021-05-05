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

  const [psychologists, setPsychologists] = React.useState([
    { id: 1, name: 'Joana' },
    { id: 2, name: 'Pietra' },
    { id: 3, name: 'Thifany' },
    { id: 4, name: 'Márcia Albuquerque' },
    { id: 5, name: 'Mércia Mattos' },
    { id: 6, name: 'Flávia Marques' },
    { id: 7, name: 'Pietra Arruda' },
    { id: 8, name: 'Marcela Gadelha' },
    { id: 9, name: "Joana D'Arc" },
    { id: 10, name: 'Maria Marques' },
    { id: 11, name: 'Joana Arruda' },
  ]);

  const [filtered, setFiltered] = React.useState([]);

  const handleSearchFilter = (text) => {
    setFiltered(psychologists)
    let temp = psychologists;
    temp = temp.filter(item => item.name.includes(text));
    setFiltered(temp);
    console.log({ temp })
  }
  const handleFormatText = (text) => {
    return text.length <= 20 ? text : text.substr(0, 20) + "..."
  }
  const [selectedPsycho, setSelectedPsycho] = React.useState({ id: '', name: '' });
  const handleSelectPsycho = (psy) => {
    setSelectedPsycho(psy);
    props.navigation.navigate("ChoiceSessionsTwo");
  };

  React.useEffect(() => {
    setFiltered(psychologists)
  }, []);

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

        <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '600', width: '90%', textAlign: 'center' }}>Escolha uma psicóloga</Styled.TxtQuestion>
        <Styled.SearchBar placeholder="Pesquisar..." onChangeText={handleSearchFilter} />

        <Styled.List>

          {filtered && filtered.map(p => {
            return (
              <Styled.ListItem onPress={() => handleSelectPsycho(p)} key={p.id}>
                <Styled.ListPhoto source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fG' }} />
                <Styled.ListTitle>{handleFormatText(p.name)}</Styled.ListTitle>
              </Styled.ListItem>
            );

          })}
          {(filtered && filtered?.lenght == 0) &&

            <TouchableOpacity>
              <Text>Nenhuma psicóloga encontrada :(</Text>
            </TouchableOpacity>
          }

        </Styled.List>

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