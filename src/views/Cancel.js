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

import logo from '../assets/images/logo-2.png';
import camera from '../assets/icons/camera.png';
import whatsapp from '../assets/icons/whatsapp-green.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cancel = (props) => {

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
      <Header screenTitle="Home" client psychologist navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43A57', width: '100%', paddingVertical: 30, marginBottom: 30 }}>
          <Styled.TxtQuestion style={{ color: "#FFF", width: '90%', fontWeight: '400' }}>Aulas canceladas ficarão como créditos para você usar quando bem entender.</Styled.TxtQuestion>
        </View>

        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'left' }}>Conte para nós o motivo do cancelamento*</Styled.TxtQuestion>
        <Styled.TxtInput placeholder="Escreva aqui..." />

        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'left', marginVertical: 10 }}>Ficou doente e tem atestado?</Styled.TxtQuestion>

        <TouchableOpacity style={{ padding: 5, borderRadius: 5, borderWidth: 1, borderColor: '#D987A3', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, }}>anexar atestado</Text>
          <Styled.Illustration source={camera} style={{ width: 25, height: 21.88, marginHorizontal: 3, }} />
        </TouchableOpacity>

        <Styled.BtnCTA2 onPress={() => props.navigation.navigate('CardCancel')} style={{ marginTop: 50 }}>
          <Styled.TxtBtnCTA2>CANCELAR AULA</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>


        <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, width: '90%', textAlign: 'center' }}>Obs: cancelamentos fora do prazo de 24 horas
        e não resultantes de caso fortuito ou força maior
serão taxados em 10% do valor na aula/sessão</Styled.TxtQuestion>


        <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
          <Text style={{ fontWeight: '800', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, textAlign: 'center' }}>Precisa da nossa ajuda?</Text>
          <Styled.Illustration source={whatsapp} style={{ width: 22, height: 22, marginHorizontal: 5, }} />
          <Text style={{ fontWeight: '400', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, textAlign: 'center' }}>Fale conosco</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cancel);