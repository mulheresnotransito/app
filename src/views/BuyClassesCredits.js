import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
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


  const [packages, setPackages] = React.useState([
    { id: 1, title: "1 aula", installments: 1, price: "R$65,00", description: "", active: true, credits: 1 },
    { id: 2, title: "5 aulas", installments: 2, price: "R$320,00", description: "(em até 2x no cartão de crédito)", active: false, credits: 5 },
    { id: 3, title: "10 aulas", installments: 3, price: "R$630,00", description: "(em até 3x no cartão de crédito)", active: false, credits: 10 },
    { id: 4, title: "15 aulas", installments: 4, price: "R$930,00", description: "(em até 4x no cartão de crédito)", active: false, credits: 15 },
  ]);
  const [selectedPackage, setSelectedPackage] = React.useState(packages?.length > 0 ? packages[0] : false);

  const handleSelectPackage = async (packageToBuy) => {
    setSelectedPackage(packageToBuy);
    await props.setNewCredits(packageToBuy);
  }

  const handleMoveToCheckout = async () => {
    if (!props.newCredits || !selectedPackage) Alert.alert("Ooooops!", "Selecione um pacote para poder prosseguir.");
    console.log(props.newCredits, selectedPackage)
    props.navigation.navigate("ChoiceCard");
  }

  React.useEffect(() => {
    if (selectedPackage) props.setNewCredits(selectedPackage)
  }, [selectedPackage]);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>
        <Styled.TxtQuestion>Quantas aulas você quer reservar?</Styled.TxtQuestion>
        <Styled.ClassListContainer>
          {packages && packages.map(c => {
            return (
              <Styled.ClassListItemContainer
                onPress={() => handleSelectPackage(c)}
                key={c.id} active={selectedPackage.id == c.id}>
                <Styled.Illustration source={selectedPackage.id == c.id ? check : dotCircle} style={{ width: 20, height: 20, marginHorizontal: 1 }} />
                <View style={{ flex: 1 }}>
                  <Styled.ClassListItemTitle active={selectedPackage.id == c.id}>{c.title}</Styled.ClassListItemTitle>
                  <Styled.ClassListItemDescription active={selectedPackage.id == c.id}>{c.price + " " + c.description}</Styled.ClassListItemDescription>
                </View>
              </Styled.ClassListItemContainer>
            );
          })}
        </Styled.ClassListContainer>
        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#D987A3" }}>Compre mais aulas e ganhe desconto.</Styled.TxtQuestion>
        <Styled.TxtQuestion style={{ width: '90%', fontWeight: '500', fontSize: 14, color: "#E59EB6" }}>Obs: aulas compradas ficarão como créditos para serem usados quando você bem entender!</Styled.TxtQuestion>
        <Styled.BtnCTA2 onPress={() => handleMoveToCheckout()}>
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
    //credit
    newCredits: state.creditReducer.newCredits,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
    //credit
    setNewCredits: (newCredits) => dispatch({ type: 'SET_NEW_CREDITS', payload: { newCredits } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ByClassesCredits);