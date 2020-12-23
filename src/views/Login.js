import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import { connect } from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';

import logo from '../assets/images/logo-1.png';

import * as Styled from '../assets/styles/styled';
import ModalInfo from '../components/modals/ModalInfo';

const Login = (props) => {


  const [userToLogin, setUserToLogin] = React.useState({
    email: '',
    password: ''
  });

  const loginUser = (user) => {
    // if (user.email == 'login123' && user.password == 'senha123')
    //   props.navigation.navigate('Home');
    // else
    //   Alert.alert('Erro', 'Usuário ou senha incorretos');
    props.navigation.navigate('Home');
  }

  const [info, setInfo] = React.useState(props.route.params);
  React.useEffect(() => {
    // console.log({ props })
    setInfo(props.route.params);
  }, [props.route.params]);

  const [modal, setModal] = React.useState({ title: "Em desenvolvimento", desc: "Esta função que você tentou acessar ainda está em desenvolvimento" });

  return (
    <Styled.Container style={{ justifyContent: 'space-around' }}>
      <ModalInfo title={modal.title} description={modal.desc} />
      <Styled.Logo source={logo} />

      <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Styled.TxtWelcome>Seja bem-vinda novamente!</Styled.TxtWelcome>
        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
          <Styled.TxtInput1 placeholder="E-mail" onChangeText={(t) => setUserToLogin({ ...userToLogin, email: t })} />
          <Styled.TxtInput1 placeholder="Senha" secureTextEntry onChangeText={(t) => setUserToLogin({ ...userToLogin, password: t })} />
        </View>
        <Styled.BtnCTA onPress={() => props.navigation.navigate('Home')}>
          <Styled.TxtBtnCTA>ENTRAR</Styled.TxtBtnCTA>
        </Styled.BtnCTA>
      </View>

      <View />
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

    //user logout
    logout: () => dispatch({ type: 'LOGOUT', payload: {} }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);