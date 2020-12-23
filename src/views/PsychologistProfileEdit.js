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
import profilePic from '../assets/images/profile-pic-4.png';

import * as Styled from '../assets/styles/styled';
import ModalInfo from '../components/modals/ModalInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PsychologistProfileEdit = (props) => {

  const [modal, setModal] = React.useState({ title: "Em desenvolvimento", desc: "Esta função que você tentou acessar ainda está em desenvolvimento" });

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <ModalInfo title={modal.title} description={modal.desc} />
      <Header screenTitle="Home" navigation={props.navigation} />
      <Styled.ScrollContainer>
        <Styled.Logo source={profilePic} />
        <Styled.BtnSub>
          <Styled.TxtBtnSub>Trocar foto de perfil</Styled.TxtBtnSub>
        </Styled.BtnSub>

        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Nome</Text>
              <Styled.TxtInput1 placeholder="Nome" value="Maristela" style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Sobrenome</Text>
              <Styled.TxtInput1 placeholder="Sobrenome" value="Costa" style={{ color: '#E46788' }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Data de nascimento</Text>
              <Styled.TxtInput1 placeholder="DD/MM/AAAA" value="14/05/1998" style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Sexo</Text>
              <Styled.TxtInput1 placeholder="Sexo" value="Feminino" style={{ color: '#E46788' }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Língua</Text>
              <Styled.TxtInput1 placeholder="Língua" value="Portuguesa" style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>País</Text>
              <Styled.TxtInput1 placeholder="País" value="Brasil" style={{ color: '#E46788' }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Mudar senha</Text>
              <Styled.TxtInput1 placeholder="Senha" value="12345678" secureTextEntry style={{ color: '#E46788' }} />
            </View>
            <View style={{ flex: 1 }} >
              <Text style={{ marginHorizontal: 10, fontSize: 12, color: '#C96786', fontWeight: '400' }}>Mudar e-mail</Text>
              <Styled.TxtInput1 placeholder="E-mail" value="ma777@gmail.com" style={{ color: '#E46788' }} />
            </View>
          </View>

          <Styled.BtnSub>
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

export default connect(mapStateToProps, mapDispatchToProps)(PsychologistProfileEdit);