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
import like from '../assets/icons/like-2.png';
import whatsapp from '../assets/icons/whatsapp.png';
import dotCircle from '../assets/icons/dot-circle.png';
import comment from '../assets/icons/comment.png';
import share from '../assets/icons/share.png';
import profilePic from '../assets/images/profile-pic-1.png';
import image from '../assets/images/image-1.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as NoticesController from "../controllers/notices.controller";

const News = (props) => {

  const [notices, setNotices] = React.useState([]);

  const getNotices = async () => {
    let newNotices = (await NoticesController.getAll()).data.notices;
    setNotices(newNotices);
  }

  React.useEffect(() => {
    getNotices();
  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      <Styled.ScrollContainer>
        <Styled.TxtNewsTitle>Matérias</Styled.TxtNewsTitle>

        {(notices && notices?.length > 0) && notices.map(n => {

          return (
            <TouchableOpacity key={n.id}
              onPress={async () => await props.setCurrentNotice(n) && props.navigation.navigate("SingleNotice")}
              style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Styled.TxtQuestion style={{ marginVertical: 5, fontSize: 14, width: '95%' }}>{n.title}</Styled.TxtQuestion>
              <Styled.TxtQuestion style={{ marginBottom: 5, fontSize: 14, width: '95%', fontWeight: '300', textAlign: 'justify' }}>{n.description}</Styled.TxtQuestion>
              <Styled.TxtQuestion style={{ fontSize: 14, width: '95%', textAlign: 'left' }}>ver mais...</Styled.TxtQuestion>
              <Styled.Illustration source={image} style={{ width: '95%', height: 300, borderRadius: 10, marginVertical: 5 }} />
              <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', marginTop: 5, marginBottom: 10, alignItems: 'center' }}>
                {/* <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                  <Styled.Illustration source={comment} style={{ width: 26.13, height: 22.86, marginRight: 3 }} />
                </View> */}
                {/* <Styled.SectionTitle style={{ textAlign: 'left', fontWeight: '400', fontSize: 16, width: '100%' }}>Comentar</Styled.SectionTitle> */}
                {/* <Styled.Illustration source={share} style={{ width: 20, height: 22.86, marginRight: 3 }} /> */}
              </View>
            </TouchableOpacity>)
        })
        }

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

    //notice
    setCurrentNotice: (currentNotice) => dispatch({ type: 'SET_CURRENT_NOTICE', payload: { currentNotice } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(News);