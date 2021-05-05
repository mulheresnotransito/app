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

import { Ionicons } from '@expo/vector-icons';

//
import check from "../assets/icons/check-circle-2.png"
import dotCircle from "../assets/icons/dot-circle.png"

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ByClassesCredits = (props) => {



  const [info, setInfo] = React.useState(props.route.params);
  React.useEffect(() => {
    // console.log({ props })
    setInfo(props.route.params);
  }, [props.route.params]);

  const [modal, setModal] = React.useState({ title: "Em desenvolvimento", desc: "Esta função que você tentou acessar ainda está em desenvolvimento" });

  const [packages, setPackages] = React.useState([
    { id: 1, title: "1 aula", description: "R$65,00", active: true, credits: 1 },
    { id: 2, title: "5 aulas", description: "R$320,00 (em até 2x no cartão de crédito)", active: false, credits: 5 },
    { id: 3, title: "10 aulas", description: "R$630,00 (em até 3x no cartão de crédito)", active: false, credits: 10 },
    { id: 4, title: "15 aulas", description: "R$930,00 (em até 4x no cartão de crédito)", active: false, credits: 15 },
  ]);
  const [selectedPackage, setSelectedPackage] = React.useState(packages?.length > 0 ? packages[0] : {});
  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <Styled.TxtQuestion>Quanta aulas você quer reservar?</Styled.TxtQuestion>
        <Styled.ClassListContainer>
          {packages && packages.map(c => {
            return (
              <Styled.ClassListItemContainer
                onPress={() => setSelectedPackage(c)}
                key={c.id} active={selectedPackage.id == c.id}>
                <Styled.Illustration source={selectedPackage.id == c.id ? check : dotCircle} style={{ width: 20, height: 20, marginHorizontal: 1 }} />
                <View style={{ flex: 1 }}>
                  <Styled.ClassListItemTitle active={selectedPackage.id == c.id}>{c.title}</Styled.ClassListItemTitle>
                  <Styled.ClassListItemDescription active={selectedPackage.id == c.id}>{c.description}</Styled.ClassListItemDescription>
                </View>
              </Styled.ClassListItemContainer>
            );
          })}
        </Styled.ClassListContainer>
        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#D987A3" }}>Compre mais aulas e ganhe desconto.</Styled.TxtQuestion>
        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#E59EB6" }}>Obs: aulas compradas ficarão como créditos para serem usados quando você bem entender!</Styled.TxtQuestion>
        <Styled.BtnCTA2 onPress={() => props.navigation.navigate('ChoiceCard')}>
          <Styled.TxtBtnCTA2>IR PARA PAGAMENTO</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>
        {/* </Styled.Scroll> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ByClassesCredits);