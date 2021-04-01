import React from 'react';
import {
  Alert,
  View,
  ImageBackground
} from 'react-native';

import { connect } from 'react-redux';


// import bg from '../assets/images/camada4.png';
import logo from '../assets/images/logo1.png';

import * as Styled from '../assets/styles/styled';
import ModalInfo from '../components/modals/ModalInfo';
import * as UsersController from '../controllers/users.controller';

const Login = (props) => {

  const [userToLogin, setUserToLogin] = React.useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const loginUser = async (user) => {

    if (user.email == '' || user.password == '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return false;
    }
    setIsLoading(true);
    let response = await UsersController.login(user);

    if (response.status) {
      props.login(response.data.user)
      let newConsultations = response.data.consultations;
      let newClasses = response.data.lessons;

      newConsultations = newConsultations.map(c => {
        c.date = new Date(c.date);
        return c;
      });

      newClasses = newClasses.map(c => {
        c.date = new Date(c.date);
        return c;
      });

      console.log({ newClasses })


      props.setConsultations(newConsultations)
      props.setClasses(newClasses)
      setIsLoading(false);
      return true;
    }
    else {
      setIsLoading(false);
      return false;
    }

  }

  return (
    <Styled.Container style={{ justifyContent: 'space-around' }}>
      <Styled.Logo source={logo} />

      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Styled.TxtWelcome>Seja bem-vinda novamente!</Styled.TxtWelcome>
        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
          <Styled.TxtInput1 placeholder="E-mail" onChangeText={(t) => setUserToLogin({ ...userToLogin, email: t })} />
          <Styled.TxtInput1 placeholder="Senha" secureTextEntry onChangeText={(t) => setUserToLogin({ ...userToLogin, password: t })} />
        </View>
        <Styled.BtnCTA onPress={async () => await loginUser(userToLogin) && (props.navigation.navigate('Home'))}>
          <Styled.TxtBtnCTA>{!isLoading ? 'ENTRAR' : 'Carregando...'}</Styled.TxtBtnCTA>
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

    //user login
    login: ({ id, email, first_name, last_name, birthday, sex, language, country, is_client, is_psychologist, is_drive, signature_status, signature_expiration_date, classes_credits, consultations_credits }) => dispatch({
      type: 'LOGIN', payload: {
        id, email, first_name, last_name, birthday, sex, language, country, is_client, is_psychologist, is_drive, signature_status, signature_expiration_date, classes_credits, consultations_credits
      }
    }),
    //user logout
    logout: () => dispatch({ type: 'LOGOUT', payload: {} }),

    //classes
    setClasses: (classes) => dispatch({ type: 'SET_CLASSES', payload: { classes } }),

    //consultations
    setConsultations: (consultations) => dispatch({ type: 'SET_CONSULTATIONS', payload: { consultations } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);