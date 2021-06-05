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
  Switch,
  Alert
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

import { connect } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';

import creditCard from '../assets/icons/credit-card.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as UsersController from "../controllers/users.controller";
import * as Functions from "../services/functions.service";

const ChoiceCard = (props) => {

  const [saveCard, setSaveCard] = React.useState(false);
  const [termsAndConditions, setTermsAndConditions] = React.useState(false);
  const toggleSaveCardSwitch = () => setSaveCard(previousState => !previousState);
  const toggleTermsAndConditionsSwitch = () => setTermsAndConditions(previousState => !previousState);
  const [paymentInfo, setPaymentInfo] = React.useState({
    creditCard: { number: "", expirationDate: "", securityCode: "", holder: "" },
    newCredits: props.newCredits ? props.newCredits : 0
  });
  const handleBuy = async (buyInfo) => {
    console.log(buyInfo)
    try {
      if (!buyInfo.creditCard.number || !buyInfo.creditCard.expirationDate || !buyInfo.creditCard.securityCode || !buyInfo.creditCard.holder) {
        Alert.alert("Erro", "Preencha todos os campos.");
        return false;
      }
      buyInfo.creditCard.brand = Functions.getCardFlag(buyInfo.creditCard.number);
      let response = await UsersController.buyClassesCredits(paymentInfo, props.user, paymentInfo.newCredits);
      props.setClassesCredits(response.data.user.classes_credits);
      Alert.alert("Parabéns!", "Créditos comprados com sucesso!");
      props.navigation.navigate("Home");
    } catch (error) {
      console.log({ error });
      Alert.alert("Erro", "Não foi possível efetuar sua compra. Tente novamente.");
      return false;
    }
  }

  React.useEffect(() => {
    if (!props.newCredits) props.navigation.goBack();
  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>

        <Styled.BoxTitle>
          <Styled.Illustration source={creditCard} style={{ width: 25, height: 19.44, marginHorizontal: 3, }} />
          <Styled.TxtSecondaryTitle>Insira os dados do seu cartão</Styled.TxtSecondaryTitle>
        </Styled.BoxTitle>

        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Styled.CheckoutInput onChangeText={(e) => setPaymentInfo({ ...paymentInfo, creditCard: { ...paymentInfo.creditCard, holder: e } })} placeholder="Nome do titular" />
          <TextInputMask
            // type={'credit-card'}
            type={'custom'}
            options={{ mask: "9999.9999.9999.9999" }}
            value={paymentInfo.creditCard.number}
            onChangeText={text => {
              setPaymentInfo({ ...paymentInfo, creditCard: { ...paymentInfo.creditCard, number: text } });
            }}
            placeholder="Número do cartão"
            placeholderTextColor="#E46788"
            style={styles.inputStyle}
          />


          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', justifyContent: 'center', alignItems: 'space-between' }}>

            <TextInputMask
              type={'custom'}
              value={paymentInfo.creditCard.expirationDate}
              options={{ mask: "99/9999" }}
              onChangeText={text => {
                setPaymentInfo({ ...paymentInfo, creditCard: { ...paymentInfo.creditCard, expirationDate: text } });
              }}
              placeholder="Validade"
              placeholderTextColor="#E46788"
              style={{ ...styles.inputStyle, marginRight: 5, flex: 1 }}
            />
            <TextInputMask
              type={'custom'}
              value={paymentInfo.creditCard.securityCode}
              options={{ mask: "999" }}
              onChangeText={text => {
                setPaymentInfo({ ...paymentInfo, creditCard: { ...paymentInfo.creditCard, securityCode: text } });
              }}
              placeholder="CVV"
              placeholderTextColor="#E46788"
              style={{ ...styles.inputStyle, marginLeft: 5, flex: 1 }}
            />

          </View>

          <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'nowrap', flex: 1, alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
            <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, flex: 1, textAlign: "left" }}>Guardar dados do cartão?</Styled.TxtQuestion>
            <Switch
              trackColor={{ false: "#555", true: "#a22341" }}
              thumbColor={saveCard ? "#fff" : "#aaa"}
              ios_backgroundColor="#777"

              onValueChange={toggleSaveCardSwitch}
              value={saveCard}
            />
          </View>

          <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'nowrap', flex: 1, alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
            <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, flex: 1, textAlign: "left" }}>Concorda com os Termos e Condições?</Styled.TxtQuestion>
            <Switch
              trackColor={{ false: "#555", true: "#a22341" }}
              thumbColor={termsAndConditions ? "#fff" : "#aaa"}
              ios_backgroundColor="#777"

              onValueChange={toggleTermsAndConditionsSwitch}
              value={termsAndConditions}
            />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
            <Styled.TxtQuestion style={{ fontWeight: '400', fontSize: 16, color: "#C43A57", margin: 0, padding: 0, flex: 1, textAlign: 'right' }}>Valor total: R$</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ fontWeight: '800', fontSize: 26, color: "#C43A57", margin: 0, padding: 0, flex: 1, textAlign: 'left' }}>{props.newCredits ? (props.newCredits?.price).substr(2) : 0}</Styled.TxtQuestion>
          </View>

        </View>
        <Styled.TxtQuestion>Tem um cupom de desconto?</Styled.TxtQuestion>
        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <Styled.TxtInput1 style={{ fontSize: 14, flex: 1 }} placeholder="Digite o seu cupom aqui..." />
          <Styled.BtnCTA2 style={{ paddingHorizontal: 5 }}>
            <Styled.TxtBtnCTA2 style={{ fontSize: 14 }}>APLICAR</Styled.TxtBtnCTA2>
          </Styled.BtnCTA2>
        </View>

        <Styled.BtnCTA2 onPress={() => handleBuy(paymentInfo)}>
          <Styled.TxtBtnCTA2>FINALIZAR</Styled.TxtBtnCTA2>
        </Styled.BtnCTA2>
        {/* </Styled.Scroll> */}
      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container>
  );
};

const styles = StyleSheet.create({
  inputStyle: { width: "90%", height: 40, marginVertical: 5, borderBottomColor: "#C43A57", borderBottomWidth: 1, fontSize: 16, color: "#999" }
});

const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //credit
    newCredits: state.creditReducer.newCredits,

    //user
    user: state.userReducer,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),

    //classes
    setClassesCredits: (classes_credits) => dispatch({ type: 'SET_CLASSES_CREDITS', payload: { classes_credits } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceCard);