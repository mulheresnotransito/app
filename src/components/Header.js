import React from 'react';
import { TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';
import { connect } from 'react-redux';

import * as Styled from "../assets/styles/styled";
import bars from "../assets/icons/bars.png"
import car from "../assets/icons/car.png"
import heartbeat from "../assets/icons/heartbeat.png"

const Header = (props) => {

  const handleLogout = () => {
    props.logout();
    props.navigation.navigate('Login');
  }

  return (
    <Styled.HeaderContainer>
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Styled.Illustration source={bars} style={{ width: 30, height: 26.25, marginRight: 3 }} />
        {/* <Ionicons name="menu" style={{ marginHorizontal: 10 }} size={32} color="#C43A57" /> */}
      </TouchableOpacity>
      {props.screenTitle == "Home" && <View style={{ flex: 1 }} />}
      {props.psychologist && (
        <Styled.HeaderComp>
          <Styled.HeaderTxtComp>Crédito:</Styled.HeaderTxtComp>
          <Styled.Illustration source={heartbeat} style={{ width: 15, height: 13.12, marginHorizontal: 1 }} />
          <Styled.HeaderTxtComp>{props.user.consultations_credits} sessões</Styled.HeaderTxtComp>
        </Styled.HeaderComp>
      )}
      {props.client && (
        <Styled.HeaderComp>
          <Styled.HeaderTxtComp>Crédito:</Styled.HeaderTxtComp>
          <Styled.Illustration source={car} style={{ width: 15, height: 11.25, marginHorizontal: 1 }} />
          <Styled.HeaderTxtComp>{props.user.classes_credits} corridas</Styled.HeaderTxtComp>
        </Styled.HeaderComp>
      )}
    </Styled.HeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,
    //user
    user: state.userReducer,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);