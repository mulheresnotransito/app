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

import logo from '../assets/images/logo-2.png';
import camera from '../assets/icons/camera.png';
import whatsapp from '../assets/icons/whatsapp.png';
import barcode from '../assets/icons/barcode.png';
import arrowRight from '../assets/icons/arrow-right.png';
import exchange from '../assets/icons/exchange.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Wallet = (props) => {

  const [btnActive, setBtnActive] = React.useState('activity');

  const [activities, setActivities] = React.useState([
    { id: 1, day: '29', month: 'setembro', title: 'Transferência para: Bradesco', description: 'Valor: R$300,00' },
    { id: 2, day: '29', month: 'setembro', title: 'Transferência para: Bradesco', description: 'Valor: R$300,00' },
    { id: 3, day: '29', month: 'setembro', title: 'Transferência para: Bradesco', description: 'Valor: R$300,00' },
    { id: 4, day: '29', month: 'setembro', title: 'Transferência para: Bradesco', description: 'Valor: R$300,00' },
    { id: 5, day: '29', month: 'setembro', title: 'Transferência para: Bradesco', description: 'Valor: R$300,00' },
  ]);

  const [solicitations, setSolicitations] = React.useState([
    { id: 1, day: '27', month: 'julho', title: 'Transferência para: Bradesco', description: 'Valor: R$200,00' },
    { id: 2, day: '17', month: 'agosto', title: 'Transferência para: Bradesco', description: 'Valor: R$500,00' },
    { id: 3, day: '05', month: 'setembro', title: 'Transferência para: Bradesco', description: 'Valor: R$350,00' },
    { id: 4, day: '05', month: 'outubro', title: 'Transferência para: Bradesco', description: 'Valor: R$300,00' },
    { id: 5, day: '15', month: 'novembro', title: 'Transferência para: Bradesco', description: 'Valor: R$300,00' },
  ]);



  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client psychologist navigation={props.navigation} />

      <Styled.ScrollContainer>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F7F7', width: '100%', paddingVertical: 30, paddingHorizontal: 10, marginBottom: 30, flexDirection: 'row', flexWrap: 'nowrap' }}>
          <Text style={{ fontWeight: '400', fontSize: 24, color: "#C43A57", flex: 1 }}>Saldo</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: "#C43A57", margin: 0, padding: 0, textAlign: 'right' }}>R$</Text>
            <Text style={{ fontWeight: '800', fontSize: 28, color: "#C43A57", margin: 0, padding: 0, textAlign: 'left' }}>1.650,00</Text>
          </View>
        </View>


        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '95%', marginVertical: 10, flexDirection: 'row', flexWrap: 'nowrap', height: 80, }}>
          <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Styled.Illustration source={barcode} style={{ width: 50, height: 37.5 }} />
          </View>
          <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, flex: 4, backgroundColor: '#C43A57', flexDirection: 'row', flexWrap: 'nowrap', height: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', fontSize: 18, color: "#fff" }}>Pagar boleto</Text>
              <Text style={{ fontWeight: '500', fontSize: 12, color: "#fff" }}>Pague sem sair de casa</Text>
            </View>
            <Styled.Illustration source={arrowRight} style={{ width: 20, height: 31.83 }} />
          </View>
        </TouchableOpacity>


        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '95%', marginVertical: 10, flexDirection: 'row', flexWrap: 'nowrap', height: 80, }}>
          <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Styled.Illustration source={exchange} style={{ width: 50, height: 39.07 }} />
          </View>
          <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, flex: 4, backgroundColor: '#C43A57', flexDirection: 'row', flexWrap: 'nowrap', height: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', fontSize: 18, color: "#fff" }}>Transferir para conta</Text>
              <Text style={{ fontWeight: '500', fontSize: 12, color: "#fff" }}>Em até um dia útil</Text>
            </View>
            <Styled.Illustration source={arrowRight} style={{ width: 20, height: 31.83 }} />
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '90%', alignItems: 'center', justifyContent: 'center' }}>
          <Styled.MiniBtn style={{ marginHorizontal: 10 }} active={btnActive == 'activity' ? true : false} onPress={() => setBtnActive('activity')} style={{ marginTop: 50 }}>
            <Styled.TxtMiniBtn active={btnActive == 'activity' ? true : false} onPress={() => setBtnActive('activity')} >Atividade</Styled.TxtMiniBtn>
          </Styled.MiniBtn>
          <Styled.MiniBtn style={{ marginHorizontal: 10 }} active={btnActive == 'solicitations' ? true : false} onPress={() => setBtnActive('solicitations')} style={{ marginTop: 50 }}>
            <Styled.TxtMiniBtn active={btnActive == 'solicitations' ? true : false} onPress={() => setBtnActive('solicitations')} >Solicitações</Styled.TxtMiniBtn>
          </Styled.MiniBtn>
        </View>

        <View style={{ width: '95%' }}>
          {(btnActive == 'activity' && activities) && activities.map(activity => {
            return (
              <TouchableOpacity key={activity.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{activity.day}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{activity.month}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57",  marginBottom: 0 }}>{activity.title}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>{activity.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {(btnActive == 'solicitations' && solicitations) && solicitations.map(solicitation => {
            return (
              <TouchableOpacity key={solicitation.id} style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: '#F4F4F4' }}>
                <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFEBF1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5, width: 75 }}>
                  <Text style={{ fontWeight: '700', fontSize: 30, color: "#C43A57", flex: 1 }}>{solicitation.day}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 12, color: "#C43A57", flex: 1 }}>{solicitation.month}</Text>
                </View>
                <View style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'flex-start', justifyContent: 'center', flex: 1, paddingLeft: 10 }}>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57",  marginBottom: 0 }}>{solicitation.title}</Text>
                  <Text style={{ fontWeight: '400', fontSize: 13, color: "#C43A57", }}>{solicitation.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container >
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);