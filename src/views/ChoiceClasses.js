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

import { Ionicons } from '@expo/vector-icons';

import logo from '../assets/images/logo-2.png';
import check from "../assets/icons/check-circle-2.png"
import dotCircle from "../assets/icons/dot-circle.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChoiceClasses = (props) => {

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

  const [modal, setModal] = React.useState({ title: "Em desenvolvimento", desc: "Esta função que você tentou acessar ainda está em desenvolvimento" });

  const [classes, setClasses] = React.useState([
    { id: 1, title: "1 aula", description: "R$65,00", active: true },
    { id: 2, title: "5 aulas", description: "R$320,00 (em até 2x no cartão de crédito)", active: false },
    { id: 3, title: "10 aulas", description: "R$630,00 (em até 3x no cartão de crédito)", active: false },
    { id: 4, title: "15 aulas", description: "R$930,00 (em até 4x no cartão de crédito)", active: false },
  ]);
  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <Styled.TxtQuestion>Quanta aulas você quer reservar?</Styled.TxtQuestion>
        <Styled.ClassListContainer>
          {classes && classes.map(c => {
            return (
              <Styled.ClassListItemContainer key={c.id} active={c.active}>
                <Styled.Illustration source={c.active ? check : dotCircle} style={{ width: 20, height: 20, marginHorizontal: 1 }} />
                <View style={{flex: 1}}>
                  <Styled.ClassListItemTitle active={c.active}>{c.title}</Styled.ClassListItemTitle>
                  <Styled.ClassListItemDescription active={c.active}>{c.description}</Styled.ClassListItemDescription>
                </View>
              </Styled.ClassListItemContainer>
            );
          })}
        </Styled.ClassListContainer>
        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#D987A3" }}>Compre mais aulas e ganhe desconto.</Styled.TxtQuestion>
        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#E59EB6" }}>Obs: aulas compradas ficarão como créditos para serem usados quando você bem entender!</Styled.TxtQuestion>
        <Styled.BtnCTA2 onPress={() => props.navigation.navigate('ChoiceCard')}>
          <Styled.TxtBtnCTA2>IR PARA PAGAMENTO</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceClasses);