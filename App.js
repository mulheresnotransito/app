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
import ExternalProfile from './src/views/ExternalProfile';
import ChoicePsychologistHour from './src/views/ChoicePsychologistHour';
import SessionConfirmation from './src/views/SessionConfirmation';
import BeDriver from './src/views/BeDriver';
import BePsychologist from './src/views/BePsychologist';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Walkthrough">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: null }} />
          <Stack.Screen name="Walkthrough" component={Walkthrough} options={{ headerShown: null }} />
        </Stack.Navigator> */}
        <Drawer.Navigator initialRouteName="Walkthrough" drawerStyle={{ backgroundColor: "#E46788" }} drawerContentOptions={{ activeBackgroundColor: "#dfdfdf", activeTintColor: "#E46788", inactiveTintColor: "#efefef" }} >
          <Drawer.Screen name="Walkthrough" component={Walkthrough} options={{ headerShown: null, title: "1 - Tela Inicial", }} />
          <Drawer.Screen name="Login" component={Login} options={{ headerShown: null, title: "2 - Login", }} />
          <Drawer.Screen name="Register" component={Register} options={{ headerShown: null, title: "3 - Cadastro", }} />
          <Drawer.Screen name="Home" component={Home} options={{ headerShown: null, title: "4 - Home", }} />
          <Drawer.Screen name="ChoiceClasses" component={ChoiceClasses} options={{ headerShown: null, title: "5 - Escolher aulas", }} />
          <Drawer.Screen name="ChoiceCard" component={ChoiceCard} options={{ headerShown: null, title: "6 - Escolher cartão", }} />
          <Drawer.Screen name="Confirmation" component={Confirmation} options={{ headerShown: null, title: "7 - Confirmação", }} />
          <Drawer.Screen name="News" component={News} options={{ headerShown: null, title: "8 - Notícias", }} />
          <Drawer.Screen name="CardCancel" component={CardCancel} options={{ headerShown: null, title: "9 - Cancelar", }} />
          <Drawer.Screen name="Cancel" component={Cancel} options={{ headerShown: null, title: "10 - Confirmar cancelamento", }} />
          <Drawer.Screen name="DriverWallet" component={DriverWallet} options={{ headerShown: null, title: "11 - Carteira do Motorista", }} />
          <Drawer.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: null, title: "12 - Editar Perfil", }} />
          <Drawer.Screen name="About" component={About} options={{ headerShown: null, title: "13 - Sobre nós", }} />
          <Drawer.Screen name="DriverProfileEdit" component={DriverProfileEdit} options={{ headerShown: null, title: "14 - Editar Perfil (motorista)", }} />
          <Drawer.Screen name="Wallet" component={Wallet} options={{ headerShown: null, title: "15 - Carteira", }} />
          <Drawer.Screen name="PsychologistProfileEdit" component={PsychologistProfileEdit} options={{ headerShown: null, title: "16 - Editar Perfil (psicóloga)", }} />
          <Drawer.Screen name="ExternalProfile" component={ExternalProfile} options={{ headerShown: null, title: "17 - Perfil (externo)", }} />
          <Drawer.Screen name="PsychologistWallet" component={PsychologistWallet} options={{ headerShown: null, title: "18 - Carteira da Psicóloga", }} />
          <Drawer.Screen name="ChoiceSessions" component={ChoiceSessions} options={{ headerShown: null, title: "19 - Escolher data (psicóloga)", }} />
          <Drawer.Screen name="ChoicePsychologistHour" component={ChoicePsychologistHour} options={{ headerShown: null, title: "20 - Escolher horário (psicóloga)", }} />
          <Drawer.Screen name="SessionConfirmation" component={SessionConfirmation} options={{ headerShown: null, title: "21 - Confirmação da Sessão (psicóloga)", }} />
          <Drawer.Screen name="BeDriver" component={BeDriver} options={{ headerShown: null, title: "22 - Seja motorista", }} />
          <Drawer.Screen name="BePsychologist" component={BePsychologist} options={{ headerShown: null, title: "22 - Seja psicóloga", }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;