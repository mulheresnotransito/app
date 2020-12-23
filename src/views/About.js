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

import like from '../assets/icons/like-2.png';
import whatsapp from '../assets/icons/whatsapp.png';
import dotCircle from '../assets/icons/dot-circle.png';
import comment from '../assets/icons/comment.png';
import share from '../assets/icons/share.png';

import profilePic from '../assets/images/profile-pic-1.png';
import image from '../assets/images/image-2.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = (props) => {

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      <Styled.ScrollContainer>

        <Styled.TxtQuestion style={{ marginVertical: 10, fontSize: 16, width: '60%', fontWeight: '700', textAlign: 'center' }}>Uma breve apresentação sobre quem nós somos</Styled.TxtQuestion>
        <Styled.Illustration source={image} style={{ width: '100%', height: 300, marginVertical: 10 }} />

        <Styled.TxtQuestion style={{ marginVertical: 5, fontSize: 14, width: '90%', fontWeight: '400', textAlign: 'center' }}>O nosso objetivo é acabar com a insegurança e o medo das mulheres atrás do volante, muitas vezes causado por algum trauma ou falta de prática.</Styled.TxtQuestion>
        <Styled.TxtQuestion style={{ marginVertical: 5, fontSize: 14, width: '90%', fontWeight: '400', textAlign: 'center' }}>Através da aula avaliativa, nossas instrutoras observarão os pontos a serem aprimorados de acordo com o desempenho da cliente no percurso, garantindo conforto e eficiência no aprendizado.</Styled.TxtQuestion>
        <Styled.TxtQuestion style={{ marginVertical: 5, fontSize: 14, width: '90%', fontWeight: '400', textAlign: 'center' }}>Somos a Mulheres no Trânsito, um aplicativo focado em acabar com medos e gerar alegria. Comece agora mesmo! </Styled.TxtQuestion>

        <Styled.BtnCTA3>
          <Styled.TxtBtnCTA3>Quero praticar minha direção</Styled.TxtBtnCTA3>
        </Styled.BtnCTA3>
        <Styled.BtnCTA3 bgColor="#C96786">
          <Styled.TxtBtnCTA3>Quero ajuda de uma psicóloga</Styled.TxtBtnCTA3>
        </Styled.BtnCTA3>

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

export default connect(mapStateToProps, mapDispatchToProps)(About);