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
  ActivityIndicator
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { usePermissions } from 'expo-permissions';
import { connect } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from 'react-native-vector-icons';

import like from '../assets/icons/like-2.png';
import whatsapp from '../assets/icons/whatsapp.png';
import dotCircle from '../assets/icons/dot-circle.png';
import comment from '../assets/icons/comment.png';
import share from '../assets/icons/share.png';

import profilePic from '../assets/images/profile-pic-1.png';
import image from '../assets/images/image-2.png';

import * as Styled from '../assets/styles/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';

const VideoCall = (props) => {

  const checkMultiPermissions = async () => {
    const { status, expires, permissions } = await Permissions.getAsync(
      Permissions.AUDIO_RECORDING,
      Permissions.CAMERA
    );
    if (status !== 'granted') {
      alert('Hey! You have not enabled selected permissions');
    }
    console.log({ status })
  }
  const getAudioPermissions = async () => {
    console.log('Requesting AUDIO permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status === 'granted') {
      console.log({ status })
    } else {
      console.log({ status })
      // throw new Error('Location permission not granted');
    }
  }
  const getCameraPermissions = async () => {
    console.log('Requesting camera permissions')
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      console.log({ status })
    } else {
      console.log({ status })
      // throw new Error('Location permission not granted');
    }
  }

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // setIsLoading(true)
    getAudioPermissions();
    getCameraPermissions();
    // checkMultiPermissions();
  }, []);
  const url = 'https://meet.jit.si/mnt-app-123'; // can also be only room name and will connect to jitsi meet servers
  const userInfo = { displayName: 'User', email: 'user@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };

  return (
    <Styled.Container style={{ paddingTop: 0 }}>
      <Header screenTitle="Home" client navigation={props.navigation} />

      <View style={{ flex: 1, width: '100%' }}>

        <WebView
          userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
          onLoad={() => setIsLoading(false)}
          source={{ uri: 'https://meet.jit.si/mnt-app-123#config.disableDeepLinking=true', }}
          style={{ width: '100%', height: '80%', marginTop: 20 }}
        />
      </View>
      {/* } */}
      {isLoading && <ActivityIndicator style={{ flex: 1 }} size={30} color="#555" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoCall);