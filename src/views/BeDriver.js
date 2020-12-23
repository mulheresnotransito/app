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

import icon1 from '../assets/icons/pink-icon-1.png';
import icon2 from '../assets/icons/pink-icon-2.png';
import icon3 from '../assets/icons/pink-icon-3.png';

import profilePic from '../assets/images/profile-pic-1.png';
import image from '../assets/images/be-driver.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BeDriver = (props) => {

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" navigation={props.navigation} />

      <Styled.ScrollContainer>

        <Styled.Illustration source={image} style={{ width: '100%', height: 300, marginVertical: 10 }} />
        <Styled.TxtQuestion style={{ marginVertical: 10, fontSize: 16, width: '60%', fontWeight: '700', textAlign: 'center' }}>Motorista instrutora tem muitas vantagens!</Styled.TxtQuestion>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <Image source={icon1} style={{ width: 60, height: 60 }} />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Styled.TxtQuestion style={{ fontSize: 16, fontWeight: '600', textAlign: 'left' }}>Aumente seus ganhos</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ fontSize: 12, fontWeight: '400', textAlign: 'left' }}>Complemente sua renda. Dinheiro no bolso após o encerramento da corrida.</Styled.TxtQuestion>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <Image source={icon2} style={{ width: 60, height: 60 }} />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Styled.TxtQuestion style={{ fontSize: 16, fontWeight: '600', textAlign: 'left' }}>Suporte sempre que precisar
</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ fontSize: 12, fontWeight: '400', textAlign: 'left' }}>Assistência 24h no app e suporte de
emergência por telefone.</Styled.TxtQuestion>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <Image source={icon3} style={{ width: 60, height: 60 }} />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Styled.TxtQuestion style={{ fontSize: 16, fontWeight: '600', textAlign: 'left' }}>Apenas as melhores</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ fontSize: 12, fontWeight: '400', textAlign: 'left' }}>Aceitamos apenas mulheres honestas,
que estejam dispostas a ensinar!</Styled.TxtQuestion>
          </View>
        </View>

        <Styled.BtnCTA3>
          <Styled.TxtBtnCTA3>PREENCHER FORMULÁRIO</Styled.TxtBtnCTA3>
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

export default connect(mapStateToProps, mapDispatchToProps)(BeDriver);