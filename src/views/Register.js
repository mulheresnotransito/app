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

// import logo from '../assets/images/logo-1.png';
import logo from '../assets/images/logo1.png';

import * as Styled from '../assets/styles/styled';
import ModalInfo from '../components/modals/ModalInfo';

import * as UsersController from '../controllers/users.controller';

const Register = (props) => {


  const [userToRegister, setUserToRegister] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    is_client: true
  });

  const handleRegister = async (user) => {
    if (user.first_name == '' || user.last_name == '' || user.email == '' || user.password == '' || user.confirmPassword == '' || (user.password != user.confirmPassword)) {
      Alert.alert('Erro', 'Digite todas as informações');
      return false;
    }
    else {
      try {
        let data = (await UsersController.register(user)).data.user;
        await props.login(data);
        Alert.alert('Cadastrado!', 'Cadastro efetuado com sucesso :)', [
          {
            text: 'OK', onPress: () => {
              props.navigation.navigate('Home');
              setUserToRegister({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirmPassword: '',
                is_client: true
              });
            }
          }
        ]);
        return true;
      }
      catch (e) {
        console.log(e);
        Alert.alert('Erro', 'Não foi possível efetuar seu cadastro :(\n\nTente novamente');
      }
    }
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

      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Styled.TxtWelcome>Seja bem-vinda!</Styled.TxtWelcome>
        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
          <Styled.TxtInput1 value={userToRegister.first_name} placeholder="Nome" onChangeText={(t) => setUserToRegister({ ...userToRegister, first_name: t })} />
          <Styled.TxtInput1 value={userToRegister.last_name} placeholder="Sobrenome" onChangeText={(t) => setUserToRegister({ ...userToRegister, last_name: t })} />
        </View>
        <Styled.TxtInput value={userToRegister.email} placeholder="E-mail" onChangeText={(t) => setUserToRegister({ ...userToRegister, email: t })} />
        <Styled.TxtInput value={userToRegister.password} placeholder="Senha" secureTextEntry onChangeText={(t) => setUserToRegister({ ...userToRegister, password: t })} />
        <Styled.TxtInput value={userToRegister.confirmPassword} placeholder="Repetir senha" secureTextEntry onChangeText={(t) => setUserToRegister({ ...userToRegister, confirmPassword: t })} />
        <Styled.BtnCTA onPress={() => handleRegister(userToRegister)}>
          <Styled.TxtBtnCTA>CRIAR CONTA</Styled.TxtBtnCTA>
        </Styled.BtnCTA>
        <Styled.BtnSub>
          <Styled.TxtBtnSub>Termos e condições</Styled.TxtBtnSub>
        </Styled.BtnSub>
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
    //user login
    login: ({ id, profile_photo, email, first_name, last_name, birthday, sex, language, country, is_client, is_psychologist, is_drive, signature_status, signature_expiration_date, classes_credits, consultations_credits }) => dispatch({
      type: 'LOGIN', payload: {
        id, profile_photo, email, first_name, last_name, birthday, sex, language, country, is_client, is_psychologist, is_drive, signature_status, signature_expiration_date, classes_credits, consultations_credits
      }
    }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);