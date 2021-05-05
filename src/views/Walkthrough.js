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

import { MaterialIcons } from '@expo/vector-icons';

// import logo from '../assets/images/logo-1.png';
import logo from '../assets/images/logo1.png';
import illustration from '../assets/images/illustration-1.png';
import facebook from '../assets/icons/facebook.png';

import * as Styled from '../assets/styles/styled';
import ModalInfo from '../components/modals/ModalInfo';

const Walkthrough = (props) => {

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

      <Styled.Illustration source={illustration} style={{ width: '100%' }} />

      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Styled.BtnCTA onPress={() => props.navigation.navigate('Login')}>
          <Styled.TxtBtnCTA>ENTRAR</Styled.TxtBtnCTA>
        </Styled.BtnCTA>

        <Styled.BtnCTA onPress={() => props.navigation.navigate('Register')} borderColor="#C43A57" bgColor="#fff">
          {/* <MaterialIcons name="battery-std" size={20} color="#555" /> */}
          <Styled.TxtBtnCTA color="#C43A57">CRIAR CONTA</Styled.TxtBtnCTA>
        </Styled.BtnCTA>

        {/* <Styled.BtnCTA onPress={() => props.navigation.navigate('Home')} style={{ flexDirection: 'row', flexWrap: 'nowrap' }} borderColor="#fff" bgColor="#fff">
          <Styled.Illustration source={facebook} style={{ width: 16, height: 16, marginRight: 3 }} />
          <Styled.TxtBtnCTA color="#C43A57">ENTRAR COM FACEBOOK</Styled.TxtBtnCTA>
        </Styled.BtnCTA> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);