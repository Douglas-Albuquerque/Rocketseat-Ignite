import { useRef, useEffect} from "react";
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import {Routes} from './src/routes'
import { Loading } from './src/Components/Loading/index';
import { Background } from './src/Components/Background';

import './src/service/notificationConfig'
import { getPushNotificationToken } from "./src/service/getPushNotificationToken";
import { Subscription } from 'expo-modules-core'
import * as notifications from "expo-notifications";



export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationlistener = useRef<Subscription>();
  const responseNotificationlistener = useRef<Subscription>();

useEffect(() => {
  getPushNotificationToken();
});

useEffect(()=>{
  getNotificationlistener.current =
  notifications.addNotificationReceivedListener(notification => {
    console.log(notification);
  });
  responseNotificationlistener.current =
  notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });
  return () => {
    if( getNotificationlistener.current && responseNotificationlistener.current ){
      notifications.removeNotificationSubscription(getNotificationlistener.current);
      notifications.removeNotificationSubscription(responseNotificationlistener.current);
    }
  }
},[]);


  return (
    <Background>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> :  <Loading />}

    </Background>
  );
}
