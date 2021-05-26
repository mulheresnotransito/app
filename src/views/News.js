import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import image from '../assets/images/image-1.png';
import newspaper from "../assets/icons/newspaper.png"

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
      <Header screenTitle="Home" home client navigation={props.navigation} />

      <Styled.ScrollContainer>
        <Styled.NoticesHeaderBar>
          <Styled.TxtNewsTitle>Matérias</Styled.TxtNewsTitle>
          <Styled.Illustration source={newspaper} style={{ tintColor: "#eeaabe", height: 18, width: 18, marginHorizontal: 5 }} />
        </Styled.NoticesHeaderBar>

        {(notices && notices?.length > 0) && notices.map(n => {

          return (
            <TouchableOpacity key={n.id}
              onPress={async () => await props.setCurrentNotice(n) && props.navigation.navigate("SingleNotice")}
              style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Styled.TxtQuestion style={{ marginVertical: 5, fontSize: 14, width: '90%', textAlign: 'left' }}>{n.title}</Styled.TxtQuestion>
              <Styled.TxtQuestion style={{ marginBottom: 5, fontSize: 14, width: '90%', fontWeight: '300', textAlign: 'justify' }}>{n.description}</Styled.TxtQuestion>
              <Styled.TxtQuestion style={{ fontSize: 14, width: '90%', textAlign: 'left' }}>ver mais...</Styled.TxtQuestion>
              <Styled.Illustration source={image} style={{ width: '90%', height: 300, borderRadius: 10, marginVertical: 5 }} />
              <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', marginTop: 5, marginBottom: 10, alignItems: 'center' }}>
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