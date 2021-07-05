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

import logo from '../assets/images/logo-1.png';
import profilePic from '../assets/images/profile-pic-3.png';
import profileIcon from '../assets/icons/profile-user.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as UsersController from "../controllers/users.controller";

const ProfileEdit = (props) => {

  const confirmDeleteAccount = async () => new Promise((resolve) => {
    Alert.alert("Excluir conta", "Tem certeza que deseja excluir a sua conta?", [
      { text: "NÃO", onPress: () => resolve(false) },
      { text: "SIM", onPress: () => resolve(true) },
    ]);
  });

  const handleLogout = async () => {
    await props.logout();
    props.navigation.navigate("Walkthrough");
  }

  const handleDelete = async (user) => {
    console.log(user);

    try {
      let response = await UsersController.deleteAccount(user);
      if (!response.error) {
        Alert.alert("Conta excluída", "Sua conta foi excluída com sucesso. Até mais :)");
        return false;
      }
      else {
        Alert.alert("Erro", "[" + error.error_code + "] - " + error.error);
        return false;
      }
    } catch (error) {
      console.log({ error });
      return false;
    }

  };

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client psychologist navigation={props.navigation} />
      <Styled.ScrollContainer>
        {/* {props?.user?.profile_photo && <Styled.ProfileImage2 source={props?.user?.profile_photo && profilePic} />} */}
        {/* {props?.user?.profile_photo && <Styled.ProfileImage2 source={{ uri: props?.user?.profile_photo }} />} */}
        {/* {!props?.user?.profile_photo && <Styled.ProfileImage2 source={profilePic} />} */}
        {!props.user?.profile_photo && <Styled.ProfileIcon source={profileIcon} />}
        {props.user?.profile_photo && <Styled.FakePhoto />}
        <Styled.BtnSub>
          <Styled.TxtBtnSub>Trocar foto de perfil</Styled.TxtBtnSub>
        </Styled.BtnSub>

        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Nome</Text>
              <Styled.TxtInput1 placeholder="Nome" value={props.user.first_name} style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Sobrenome</Text>
              <Styled.TxtInput1 placeholder="Sobrenome" value={props.user.last_name} style={{ color: '#E46788' }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Data de nascimento</Text>
              <Styled.TxtInput1 placeholder="DD/MM/AAAA" value={props.user.birthday} style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Sexo</Text>
              <Styled.TxtInput1 placeholder="Sexo" value={props.user.sex} style={{ color: '#E46788' }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Língua</Text>
              <Styled.TxtInput1 placeholder="Língua" value={props.user.language} style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>País</Text>
              <Styled.TxtInput1 placeholder="País" value={props.user.country} style={{ color: '#E46788' }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Mudar senha</Text>
              <Styled.TxtInput1 placeholder="Senha" value="12345678" secureTextEntry style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Mudar e-mail</Text>
              <Styled.TxtInput1 placeholder="E-mail" value={props.user.email} style={{ color: '#E46788' }} />
            </View>
          </View>

          <Styled.BtnSub onPress={async () => await confirmDeleteAccount() ? (handleDelete(props.user) ? handleLogout() : "") : ""}>
            <Styled.TxtBtnSub>Excluir conta</Styled.TxtBtnSub>
          </Styled.BtnSub>

        </View>

        <View />
      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    //user
    user: state.userReducer,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    //user logout
    logout: () => dispatch({ type: 'LOGOUT', payload: {} }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);