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
import creditCard from '../assets/icons/credit-card.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CardCancel = (props) => {

  const [userToLogin, setUserToLogin] = React.useState({
    email: '',
    password: ''
  });

  const loginUser = (user) => {
    // if(user.email == 'teste@hinoselouvores.com' && user.password == '123456')
    //   navigation.navigate('Home');
    // else
    //   Alert.alert('Erro', 'Usuário ou senha incorretos');
    props.navigation.navigate('Market');
  }

  const [info, setInfo] = React.useState(props.route.params);
  React.useEffect(() => {
    // console.log({ props })
    setInfo(props.route.params);
  }, [props.route.params]);

  const [modal, setModal] = React.useState({ title: "Em desenvolvimento", desc: "Esta função que você tentou acessar ainda está em desenvolvimento" });

  const [classes, setClasses] = React.useState([
    { id: 1, title: "1 aula", description: "R$65,00", active: true },
    { id: 2, title: "5 aulas", description: "R$320,00 (em até 2x no cartão de crédito)", active: false },
    { id: 3, title: "10 aulas", description: "R$630,00 (em até 3x no cartão de crédito)", active: false },
    { id: 4, title: "15 aulas", description: "R$930,00 (em até 4x no cartão de crédito)", active: false },
  ]);
  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client psychologist navigation={props.navigation} />

      {/* <Styled.Scroll> */}
      <Styled.ScrollContainer>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', alignItems: 'center', justifyContent: 'center'}}>
          <Styled.Illustration source={creditCard} style={{ width: 25, height: 19.44, marginHorizontal: 3, }} />
          <Styled.TxtQuestion style={{flex: 1, textAlign: 'center'}}>Insira os dados do seu cartão</Styled.TxtQuestion>
        </View>

        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Styled.TxtInput placeholder="Nome do titular" />
          <Styled.TxtInput placeholder="Número do cartão" />
          <Styled.TxtInput placeholder="Repetir senha" />
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '95%', justifyContent: 'center', alignItems: 'space-between', marginVertical: 20 }}>
            <Styled.TxtInput1 placeholder="Validade" />
            <Styled.TxtInput1 placeholder="CVV" />
          </View>
          <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
            <Styled.TxtQuestion style={{ fontWeight: '500', fontSize: 14, color: "#D987A3", margin: 0, padding: 0, flex: 1 }}>Guardar dados do cartão?</Styled.TxtQuestion>
            <View style={{ padding: 5, paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#D987A3', marginHorizontal: 5 }}>
              <Text>SIM</Text>
            </View>
            <View style={{ padding: 5, paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#ccc', marginHorizontal: 5 }}>
              <Text>NÃO</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
            <Styled.TxtQuestion style={{ fontWeight: '400', fontSize: 16, color: "#C43A57", margin: 0, padding: 0, flex: 1, textAlign: 'right' }}>Valor total: R$</Styled.TxtQuestion>
            <Styled.TxtQuestion style={{ fontWeight: '800', fontSize: 28, color: "#C43A57", margin: 0, padding: 0, flex: 1, textAlign: 'left' }}>65,00</Styled.TxtQuestion>
          </View>

        </View>

        <Styled.BtnCTA2 onPress={() => props.navigation.navigate('Home')}>
          <Styled.TxtBtnCTA2>CANCELAR</Styled.TxtBtnCTA2>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardCancel);