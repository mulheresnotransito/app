import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';
import { connect } from 'react-redux';

import * as Styled from "../assets/styles/styled";
import bars from "../assets/icons/bars.png"
import home from "../assets/icons/home.png"
import heart from "../assets/icons/heart.png"
import blog from "../assets/icons/blog.png"
import user from "../assets/icons/user.png"

const Footer = (props) => {

  const handleLogout = () => {
    props.logout();
    props.navigation.navigate('Login');
  }

  return (
    <Styled.FooterContainer>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Styled.Illustration source={home} style={{ width: 28, height: 28 }} />
        <Text style={{ textAlign: 'center', fontWeight: '300', fontSize: 10, color: "#C43A57" }}>Prática</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('ChoiceSessions')} style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Styled.Illustration source={heart} style={{ width: 29, height: 25 }} />
        <Text style={{ textAlign: 'center', fontWeight: '300', fontSize: 10, color: "#C43A57" }}>Psicóloga</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('News')} style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Styled.Illustration source={blog} style={{ width: 28, height: 26 }} />
        <Text style={{ textAlign: 'center', fontWeight: '300', fontSize: 10, color: "#C43A57" }}>Matérias</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('ExternalProfile')} style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Styled.Illustration source={user} style={{ width: 23, height: 28 }} />
        <Text style={{ textAlign: 'center', fontWeight: '300', fontSize: 10, color: "#C43A57" }}>Perfil</Text>
      </TouchableOpacity>
    </Styled.FooterContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);