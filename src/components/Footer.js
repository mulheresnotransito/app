import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';
import { connect } from 'react-redux';

import * as Styled from "../assets/styles/styled";
import bars from "../assets/icons/bars.png"
import home from "../assets/icons/home.png"
import heart from "../assets/icons/heart.png"
import blog from "../assets/icons/blog.png"
import newspaper from "../assets/icons/newspaper.png"
import user from "../assets/icons/user.png"
import mentalHealth from "../assets/icons/mentalHealth.png"

const DriverFooter = (props) => {

  const { handleNavigate } = props;

  return (<Styled.FooterContainer>
    <TouchableOpacity onPress={() => handleNavigate("Home")} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "Home" && <Styled.ActiveFooterIcon source={home} style={{ width: 28, height: 28 }} />}
      {props.currentScreen != "Home" && <Styled.InactiveFooterIcon source={home} style={{ width: 28, height: 28 }} />}
      <Text style={props.currentScreen == "Home" ? { ...styles.activeText } : { ...styles.inactiveText }}>Prática</Text>
    </TouchableOpacity>
    {/* <TouchableOpacity onPress={() => handleNavigate('ChoiceSessions')} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "ChoiceSessions" && <Styled.ActiveFooterIcon source={mentalHealth} style={{ width: 29, height: 25 }} />}
      {props.currentScreen != "ChoiceSessions" && <Styled.InactiveFooterIcon source={mentalHealth} style={{ width: 29, height: 25 }} />}
      <Text style={props.currentScreen == "ChoiceSessions" ? { ...styles.activeText } : { ...styles.inactiveText }}>Psicóloga</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleNavigate('News')} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "News" && <Styled.ActiveFooterIcon source={newspaper} style={{ width: 28, height: 26 }} />}
      {props.currentScreen != "News" && <Styled.InactiveFooterIcon source={newspaper} style={{ width: 28, height: 26 }} />}
      <Text style={props.currentScreen == "News" ? { ...styles.activeText } : { ...styles.inactiveText }}>Matérias</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleNavigate('ExternalProfile')} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "ExternalProfile" && <Styled.ActiveFooterIcon source={user} style={{ width: 23, height: 28 }} />}
      {props.currentScreen != "ExternalProfile" && <Styled.InactiveFooterIcon source={user} style={{ width: 23, height: 28 }} />}
      <Text style={props.currentScreen == "ExternalProfile" ? { ...styles.activeText } : { ...styles.inactiveText }}>Perfil</Text>
    </TouchableOpacity> */}
  </Styled.FooterContainer>)

}

const PsychologistFooter = (props) => {

  const { handleNavigate } = props;

  React.useEffect(() => {
    console.log({ screen: props.currentScreen })
  }, [props.currentScreen]);

  return (<Styled.FooterContainer>
    <TouchableOpacity onPress={() => handleNavigate("Home")} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "Home" && <Styled.ActiveFooterIcon source={home} style={{ width: 28, height: 28 }} />}
      {props.currentScreen != "Home" && <Styled.InactiveFooterIcon source={home} style={{ width: 28, height: 28 }} />}
      <Text style={props.currentScreen == "Home" ? { ...styles.activeText } : { ...styles.inactiveText }}>Motorista</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleNavigate('ChoiceSessions')} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "ChoiceSessions" && <Styled.ActiveFooterIcon source={mentalHealth} style={{ width: 29, height: 25 }} />}
      {props.currentScreen != "ChoiceSessions" && <Styled.InactiveFooterIcon source={mentalHealth} style={{ width: 29, height: 25 }} />}
      <Text style={props.currentScreen == "ChoiceSessions" ? { ...styles.activeText } : { ...styles.inactiveText }}>Psicóloga</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleNavigate('News')} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "News" && <Styled.ActiveFooterIcon source={newspaper} style={{ width: 28, height: 26 }} />}
      {props.currentScreen != "News" && <Styled.InactiveFooterIcon source={newspaper} style={{ width: 28, height: 26 }} />}
      <Text style={props.currentScreen == "News" ? { ...styles.activeText } : { ...styles.inactiveText }}>Matérias</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleNavigate('PsychologistWallet')} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.currentScreen == "PsychologistWallet" && <Styled.ActiveFooterIcon source={user} style={{ width: 23, height: 28 }} />}
      {props.currentScreen != "PsychologistWallet" && <Styled.InactiveFooterIcon source={user} style={{ width: 23, height: 28 }} />}
      <Text style={props.currentScreen == "PsychologistWallet" ? { ...styles.activeText } : { ...styles.inactiveText }}>Perfil</Text>
    </TouchableOpacity>
  </Styled.FooterContainer>)

}

const Footer = (props) => {

  const handleNavigate = async (screen) => {
    console.log({ screen })
    await props.setCurrentScreen(screen)
    console.log({ currentScreen: props.currentScreen })
    props.navigation.navigate(screen);
  }

  const [userType, setUserType] = React.useState("client");

  React.useEffect(() => {
    if (props?.user?.is_client) setUserType("client");
    if (props?.user?.is_driver) setUserType("driver");
    if (props?.user?.is_psychologist) setUserType("psychologist");
  }, []);

  React.useEffect(() => {
    console.log({ is_psychologist: props?.user?.is_psychologist });
    console.log({ is_driver: props?.user?.is_driver });
    console.log({ is_client: props?.user?.is_client });
    console.log({ userType })
  }, [userType]);


  if (userType === "driver") return <DriverFooter handleNavigate={handleNavigate} />;

  else if (userType === "psychologist") return <PsychologistFooter handleNavigate={handleNavigate} />;

  else return (
    <Styled.FooterContainer>
      <TouchableOpacity onPress={() => handleNavigate("Home")} style={{ alignItems: 'center', justifyContent: 'center' }}>
        {props.currentScreen == "Home" && <Styled.ActiveFooterIcon source={home} style={{ width: 28, height: 28 }} />}
        {props.currentScreen != "Home" && <Styled.InactiveFooterIcon source={home} style={{ width: 28, height: 28 }} />}
        <Text style={props.currentScreen == "Home" ? { ...styles.activeText } : { ...styles.inactiveText }}>Prática</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('ChoiceSessions')} style={{ alignItems: 'center', justifyContent: 'center' }}>
        {props.currentScreen == "ChoiceSessions" && <Styled.ActiveFooterIcon source={mentalHealth} style={{ width: 29, height: 25 }} />}
        {props.currentScreen != "ChoiceSessions" && <Styled.InactiveFooterIcon source={mentalHealth} style={{ width: 29, height: 25 }} />}
        <Text style={props.currentScreen == "ChoiceSessions" ? { ...styles.activeText } : { ...styles.inactiveText }}>Psicóloga</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('News')} style={{ alignItems: 'center', justifyContent: 'center' }}>
        {props.currentScreen == "News" && <Styled.ActiveFooterIcon source={newspaper} style={{ width: 28, height: 26 }} />}
        {props.currentScreen != "News" && <Styled.InactiveFooterIcon source={newspaper} style={{ width: 28, height: 26 }} />}
        <Text style={props.currentScreen == "News" ? { ...styles.activeText } : { ...styles.inactiveText }}>Matérias</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('ExternalProfile')} style={{ alignItems: 'center', justifyContent: 'center' }}>
        {props.currentScreen == "ExternalProfile" && <Styled.ActiveFooterIcon source={user} style={{ width: 23, height: 28 }} />}
        {props.currentScreen != "ExternalProfile" && <Styled.InactiveFooterIcon source={user} style={{ width: 23, height: 28 }} />}
        <Text style={props.currentScreen == "ExternalProfile" ? { ...styles.activeText } : { ...styles.inactiveText }}>Perfil</Text>
      </TouchableOpacity>
    </Styled.FooterContainer>
  );
};

const styles = StyleSheet.create({
  activeText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 10,
    color: "#bb3f62"
  },
  inactiveText: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 10,
    color: "#C43A57"
  },
});

const mapStateToProps = (state) => {
  return {
    //user 
    user: state.userReducer,
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,
    //menu
    currentScreen: state.menuReducer.currentScreen,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),

    //menu
    setCurrentScreen: (currentScreen) => dispatch({ type: 'SET_CURRENT_SCREEN', payload: { currentScreen } }),

    //user logout
    logout: () => dispatch({ type: 'LOGOUT', payload: {} }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);