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
import * as Updates from "expo-updates";
import { connect } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';

// import logo from '../assets/images/logo-1.png';
import logo from '../assets/images/logo1.png';
import illustration from '../assets/images/illustration-1.png';
import facebook from '../assets/icons/facebook.png';

import * as Styled from '../assets/styles/styled';
import ModalInfo from '../components/modals/ModalInfo';

const Walkthrough = (props) => {

  const [isUpdated, setIsUpdated] = React.useState(true);

  React.useEffect(() => {
    // async function updateApp() {
    //   const { isAvailable } = await Updates.checkForUpdateAsync();
    //   if (isAvailable) {
    //     setIsUpdated(false)
    //     console.log("Update disponível!... atualizando")
    //     Alert.alert("Atualizando...", "Uma nova versão do aplicativo está sendo carregada. Aguarde...")
    //     await Updates.fetchUpdateAsync();
    //     await Updates.reloadAsync(); // depende da sua estratégia
    //     setIsUpdated(true)
    //   } else {
    //     setIsUpdated(true)
    //     console.log("Nenhuma atualização disponível :)")
    //   }
    // }
    // updateApp();
  }, []);

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

      <Styled.WalkthroughImage source={illustration} style={{ width: '100%' }} />

      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Styled.BtnCTA onPress={() => isUpdated ? props.navigation.navigate('Login') : Alert.alert("Atualizando... aguarde enquanto o aplicativo é atualizado.")}>
          <Styled.TxtBtnCTA>ENTRAR</Styled.TxtBtnCTA>
        </Styled.BtnCTA>

        <Styled.BtnCTA onPress={() => isUpdated ? props.navigation.navigate('Register') : Alert.alert("Atualizando... aguarde enquanto o aplicativo é atualizado.")} borderColor="#C43A57" bgColor="#fff">
          <Styled.TxtBtnCTA color="#C43A57">CRIAR CONTA</Styled.TxtBtnCTA>
        </Styled.BtnCTA>

        {/* <Styled.BtnCTA onPress={() => props.navigation.navigate('Home')} style={{ flexDirection: 'row', flexWrap: 'nowrap' }} borderColor="#fff" bgColor="#fff">
          <Styled.Illustration source={facebook} style={{ width: 16, height: 16, marginRight: 3 }} />
          <Styled.TxtBtnCTA color="#C43A57">ENTRAR COM FACEBOOK</Styled.TxtBtnCTA>
        </Styled.BtnCTA> */}
      </View>
      <Text style={{ color: "#ccc", fontSize: 10 }}>v.1.0.0.24 {!isUpdated ? "[ATUALIZE O APLICATIVO]" : ""}</Text>

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