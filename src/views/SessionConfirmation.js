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
import like from '../assets/icons/like-2.png';
import whatsapp from '../assets/icons/whatsapp-white.png';
import dotCircle from '../assets/icons/dot-circle.png';
import profilePic from '../assets/images/profile-pic-1.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SessionConfirmation = (props) => {

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      <Styled.ScrollContainer>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C43A57', width: '100%', paddingVertical: 20 }}>
          <Styled.Illustration source={like} style={{ width: 50, height: 53.33, marginHorizontal: 3 }} />
          <Styled.TxtQuestion style={{ color: "#FFF", width: '35%', marginTop: 10 }}>Sessão marcada com sucesso!</Styled.TxtQuestion>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: '100%', paddingVertical: 20 }}>
          <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 90, marginBottom: -16 }}>18:00</Styled.TxtQuestion>
          <Styled.TxtQuestion style={{ color: "#C43A57", }}>Quarta-Feira, 14 de Outubro</Styled.TxtQuestion>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBF1', width: '100%', paddingVertical: 20 }}>
          <Styled.Illustration source={profilePic} style={{ width: 100, height: 100, marginHorizontal: 3 }} />
          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 10 }}>
            <Styled.TxtQuestion style={{ color: "#C43A57", fontSize: 16, fontWeight: '600', textAlign: 'left' }}>Maria Saramalho</Styled.TxtQuestion>

            <TouchableOpacity style={{ padding: 5, backgroundColor: "#C43A57", flexDirection: 'row', flexWrap: 'nowrap', borderRadius: 50 }}>
              <Styled.Illustration source={whatsapp} style={{ width: 16, height: 16, marginRight: 3 }} />
              <Styled.TxtBtnCTA color="#fff" style={{ fontSize: 12 }}>Enviar mensagem</Styled.TxtBtnCTA>
            </TouchableOpacity>
          </View>
        </View>

        <Styled.BtnSub>
          <Styled.TxtBtnSub>Cancelar sessão</Styled.TxtBtnSub>
        </Styled.BtnSub>

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

export default connect(mapStateToProps, mapDispatchToProps)(SessionConfirmation);