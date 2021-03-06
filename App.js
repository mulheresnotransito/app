import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { } from '@react-navigation/core';

// Redux
import { store } from "./src/Store";
import { Provider } from 'react-redux';

//screens
import Login from './src/views/Login';
import Walkthrough from './src/views/Walkthrough';
import Register from './src/views/Register';
import Home from './src/views/Home';
import ChoiceClasses from './src/views/ChoiceClasses';
import ChoiceCard from './src/views/ChoiceCard';
import Confirmation from './src/views/Confirmation';
import News from './src/views/News';
import CardCancel from './src/views/CardCancel';
import Cancel from './src/views/Cancel';
import Wallet from './src/views/Wallet';
import DriverWallet from './src/views/DriverWallet';
import ProfileEdit from './src/views/ProfileEdit';
import About from './src/views/About';
import DriverProfileEdit from './src/views/DriverProfileEdit';
import PsychologistProfileEdit from './src/views/PsychologistProfileEdit';
import PsychologistWallet from './src/views/PsychologistWallet';
import ChoiceSessions from './src/views/ChoiceSessions';
import ChoiceSessionsTwo from './src/views/ChoiceSessionsTwo';
import ExternalProfile from './src/views/ExternalProfile';
import ChoicePsychologistHour from './src/views/ChoicePsychologistHour';
import SessionConfirmation from './src/views/SessionConfirmation';
import BeDriver from './src/views/BeDriver';
import BePsychologist from './src/views/BePsychologist';
import SingleNotice from './src/views/SingleNotice';
import VideoCall from './src/views/VideoCall';
import BuyClassesCredits from './src/views/BuyClassesCredits';
import BuyConsultationsCredits from './src/views/BuyConsultationsCredits';
import ChoiceCardConsultations from './src/views/ChoiceCardConsultations';
import ConfirmationConsultation from './src/views/ConfirmationConsultation';
import CancelConsultation from './src/views/CancelConsultation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Stack">
      <Stack.Screen name="Walkthrough" component={Walkthrough} options={{ headerShown: null, headerBackTitle: 'Voltar' }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerBackTitle: 'Voltar' }} />
      <Stack.Screen name="Register" component={Register} options={{ title: 'Cadastro', headerBackTitle: 'Voltar' }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <Drawer.Navigator initialRouteName="Walkthrough" drawerStyle={{ backgroundColor: "#E46788" }} drawerContentOptions={{ activeBackgroundColor: "#dfdfdf", activeTintColor: "#E46788", inactiveTintColor: "#efefef" }} >
          <Drawer.Screen name="Walkthrough" component={AuthStack} options={{ title: "1 - Tela Inicial", }} />
          <Drawer.Screen name="Login" component={Login} options={{ headerShown: null, title: "2 - Login", }} />
          <Drawer.Screen name="Register" component={Register} options={{ /*headerShown: null,*/ title: "3 - Cadastro", }} />
          <Drawer.Screen name="Home" component={Home} options={{ headerShown: null, title: "4 - Home", }} />
          <Drawer.Screen name="ChoiceClasses" component={ChoiceClasses} options={{ headerShown: null, title: "5 - Escolher aulas", }} />
          <Drawer.Screen name="ChoiceCard" component={ChoiceCard} options={{ headerShown: null, title: "6 - Escolher cart??o", }} />
          <Drawer.Screen name="Confirmation" component={Confirmation} options={{ headerShown: null, title: "7 - Confirma????o", }} />
          <Drawer.Screen name="News" component={News} options={{ headerShown: null, title: "8 - Not??cias", }} />
          <Drawer.Screen name="CardCancel" component={CardCancel} options={{ headerShown: null, title: "9 - Cancelar", }} />
          <Drawer.Screen name="Cancel" component={Cancel} options={{ headerShown: null, title: "10 - Confirmar cancelamento", }} />
          <Drawer.Screen name="DriverWallet" component={DriverWallet} options={{ headerShown: null, title: "11 - Carteira do Motorista", }} />
          <Drawer.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: null, title: "12 - Editar Perfil", }} />
          <Drawer.Screen name="About" component={About} options={{ headerShown: null, title: "13 - Sobre n??s", }} />
          <Drawer.Screen name="DriverProfileEdit" component={DriverProfileEdit} options={{ headerShown: null, title: "14 - Editar Perfil (motorista)", }} />
          <Drawer.Screen name="Wallet" component={Wallet} options={{ headerShown: null, title: "15 - Carteira", }} />
          <Drawer.Screen name="PsychologistProfileEdit" component={PsychologistProfileEdit} options={{ headerShown: null, title: "16 - Editar Perfil (psic??loga)", }} />
          <Drawer.Screen name="ExternalProfile" component={ExternalProfile} options={{ headerShown: null, title: "17 - Perfil (externo)", }} />
          <Drawer.Screen name="PsychologistWallet" component={PsychologistWallet} options={{ headerShown: null, title: "18 - Carteira da Psic??loga", }} />
          <Drawer.Screen name="ChoiceSessions" component={ChoiceSessions} options={{ headerShown: null, title: "19 - Escolher data (psic??loga)", }} />
          <Drawer.Screen name="ChoiceSessionsTwo" component={ChoiceSessionsTwo} options={{ headerShown: null, title: "19 - Escolher data (psic??loga)", }} />
          <Drawer.Screen name="ChoicePsychologistHour" component={ChoicePsychologistHour} options={{ headerShown: null, title: "20 - Escolher hor??rio (psic??loga)", }} />
          <Drawer.Screen name="SessionConfirmation" component={SessionConfirmation} options={{ headerShown: null, title: "21 - Confirma????o da Sess??o (psic??loga)", }} />
          <Drawer.Screen name="BeDriver" component={BeDriver} options={{ headerShown: null, title: "22 - Seja motorista", }} />
          <Drawer.Screen name="BePsychologist" component={BePsychologist} options={{ headerShown: null, title: "23 - Seja psic??loga", }} />
          <Drawer.Screen name="SingleNotice" component={SingleNotice} options={{ headerShown: null, title: "24- Not??cia", }} />
          <Drawer.Screen name="VideoCall" component={VideoCall} options={{ headerShown: null, title: "25- Chamada de v??deo", }} />
          <Drawer.Screen name="BuyClassesCredits" component={BuyClassesCredits} options={{ headerShown: null, title: "26- Comprar cr??ditos", }} />
          <Drawer.Screen name="BuyConsultationsCredits" component={BuyConsultationsCredits} options={{ headerShown: null, title: "27- Comprar cr??ditos de consultas", }} />
          <Drawer.Screen name="ChoiceCardConsultations" component={ChoiceCardConsultations} options={{ headerShown: null, title: "28- Escolher cart??o de comprar consultas", }} />
          <Drawer.Screen name="ConfirmationConsultation" component={ConfirmationConsultation} options={{ headerShown: null, title: "29- Confirma????o de consulta", }} />
          <Drawer.Screen name="CancelConsultation" component={CancelConsultation} options={{ headerShown: null, title: "30- Cancelar consulta", }} />
        </Drawer.Navigator>

      </NavigationContainer>
    </Provider>
  );
}

export default App;