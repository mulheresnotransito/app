import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import { connect } from 'react-redux';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as functions from '../services/functions.service';
import * as UsersController from '../controllers/users.controller';

import search from '../assets/icons/search.png'
;
const ChoiceSessions = (props) => {

  const [filtered, setFiltered] = React.useState([]);

  const handleSearchFilter = (text) => {
    text = text.toLowerCase();
    setFiltered(props.psychologists)
    let temp = props.psychologists;
    temp = temp.filter(item => ((item.first_name).toLowerCase()).includes(text) || ((item.last_name).toLowerCase()).includes(text));
    setFiltered(temp);
    // console.log({ temp })
  }
  const handleFormatText = (text) => {
    if (!text) return false;
    return text.length <= 20 ? text : text.substr(0, 20) + "..."
  }
  const handleSelectPsycho = async (psy) => {
    let temp = props.newConsultation;
    await props.setNewConsultation({ ...temp, psychologist: psy });
    // console.log(props.newConsultation);
    props.navigation.navigate("ChoiceSessionsTwo");
  };

  const handleGetPsychologists = async () => {
    let response = await UsersController.getAllPsychologists();
    try {
      if (!response.error) {
        // console.log(response.data.psychologists)
        props.setPsychologists(response.data.psychologists);
        return response.data.psychologists;
      }
      else {
        Alert.alert("Erro", "[" + response.error_code + "] " + response.error);
      }
      return true;

    } catch (error) {
      console.log({ error })
      return false;
      // Alert.alert("Erro", "[" + response.error_code + "] " + response.error);
    }
  }

  React.useEffect(() => {
    handleGetPsychologists().then((psy) => setFiltered(psy))
    setFiltered(props.psychologists);
  }, []);

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" home psychologist navigation={props.navigation} />
      <Styled.ScrollContainer>
        {props.scheduledConsultations?.length > 0 && <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '400', width: '90%', textAlign: 'left' }}>Próximas sessões</Styled.TxtQuestion>}

        <Styled.ScrollHorizontal>
          {props.scheduledConsultations && props.scheduledConsultations.map((c, index, arr) => {
            // console.log({ c })
            let opacity = (((arr.length - (index + 1)) / arr.length) + (1 / arr.length));
            // let opacity = (index + 1) / arr.length;
            // console.log({ opacity })

            return (
              <Styled.ClassBox key={c.id}>
                <Styled.ClassBoxCircleContainer
                  onPress={async () => {
                    await props.setScheduledConsultation(c)
                    props.navigation.navigate("ConfirmationConsultation");
                  }}
                  activeOpacity={0.7}
                  style={{ backgroundColor: 'rgba(196, 58, 87, ' + opacity + ')' }}>
                  <Styled.ClassBoxCircleDay>{(c.date).split("/")[0]}</Styled.ClassBoxCircleDay>
                  <Styled.ClassBoxCircleMonth>{(functions.getMonthName(parseInt((c.date).split("/")[1]), 1))}</Styled.ClassBoxCircleMonth>
                </Styled.ClassBoxCircleContainer>
              </Styled.ClassBox>
            );
          })}
        </Styled.ScrollHorizontal>

        {/* <Styled.TxtQuestion style={{ fontSize: 18, fontWeight: '600', width: '90%', textAlign: 'center' }}>Escolha uma psicóloga</Styled.TxtQuestion> */}
        <Styled.SearchBox>
          <Styled.Illustration source={search} style={{ tintColor: "#C43A57", width: 20, height: 20, marginRight: 5 }} />
          <Styled.SearchBarTwo placeholder="Pesquisar..." onChangeText={handleSearchFilter} />
        </Styled.SearchBox>

        <Styled.List>

          {filtered && filtered.map((p, index) => {
            // console.log({ index, p })
            return (
              <Styled.ListItem onPress={() => handleSelectPsycho(p)} key={p.id}>
                <Styled.ListPhoto source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fG' }} />
                <Styled.ListTitle>{handleFormatText(p.first_name + " " + p.last_name)}</Styled.ListTitle>
              </Styled.ListItem>
            );

          })}
          {(filtered && filtered?.lenght == 0) &&

            <TouchableOpacity>
              <Text>Nenhuma psicóloga encontrada :(</Text>
            </TouchableOpacity>
          }

        </Styled.List>

      </Styled.ScrollContainer>
      <Footer screenTitle="Home" client navigation={props.navigation} />
    </Styled.Container >
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'left',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});


const mapStateToProps = (state) => {
  return {
    //modal
    modalInfoVisible: state.modalReducer.modalInfoVisible,

    //consultations
    consultations: state.consultationReducer.consultations,
    psychologists: state.consultationReducer.psychologists,
    scheduledConsultations: state.consultationReducer.scheduledConsultations,
    newConsultation: state.consultationReducer.newConsultation,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //modal
    setModalInfoVisible: (modalInfoVisible) => dispatch({ type: 'SET_MODAL_INFO_VISIBLE', payload: { modalInfoVisible } }),
    //consultation
    setScheduledConsultation: (scheduledConsultation) => dispatch({ type: 'SET_SCHEDULED_CONSULTATION', payload: { scheduledConsultation } }),
    setScheduledConsultations: (scheduledConsultations) => dispatch({ type: 'SET_SCHEDULED_CONSULTATIONS', payload: { scheduledConsultations } }),
    setPsychologists: (psychologists) => dispatch({ type: 'SET_PSYCHOLOGISTS', payload: { psychologists } }),
    setNewConsultation: (newConsultation) => dispatch({ type: 'SET_NEW_CONSULTATION', payload: { newConsultation } }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceSessions);