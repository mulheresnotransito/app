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

//
import share from '../assets/icons/share.png';
import profilePic from '../assets/images/profile-pic-1.png';
import image from '../assets/images/image-1.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as NoticesController from "../controllers/notices.controller";

const SingleNotice = (props) => {

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      <Styled.ScrollContainer>
        {/* <TouchableOpacity onPress={() => props.navigation.navigate("News")} style={{ width: '95%' }}>
          <Text style={{ color: "#C43A57" }}>Voltar</Text>
        </TouchableOpacity> */}

        {props.currentNotice && (
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Styled.Illustration source={image} style={{ width: '100%', height: 300, marginVertical: 5 }} />
            <Styled.TxtQuestion style={{ marginVertical: 5, fontSize: 14, width: '92%', textAlign: "left" }}>{props.currentNotice.title}</Styled.TxtQuestion>
            {/* <Styled.TxtQuestion style={{ marginBottom: 5, fontSize: 14, width: '90%', fontWeight: '300', textAlign: 'justify' }}>{props.currentNotice.description}</Styled.TxtQuestion> */}
            <Styled.TxtQuestion style={{ color: '#555', marginBottom: 5, fontSize: 14, width: '90%', fontWeight: '300', textAlign: 'justify' }}>{props.currentNotice.text}</Styled.TxtQuestion>
          </View>
        )
        }

        <Styled.LikeComponent>
          <Styled.LikeComponentColumn>
            <Styled.LikeComponentText>Gostou do post?</Styled.LikeComponentText>
            <Styled.LikeComponentText>Compartilhe com os amigos!</Styled.LikeComponentText>
          </Styled.LikeComponentColumn>
          <Styled.Illustration source={share} style={{ tintColor: "#eeaabe", height: 23, width: 20}} />
        </Styled.LikeComponent>

      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //notice
    currentNotice: state.noticeReducer.currentNotice,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleNotice);