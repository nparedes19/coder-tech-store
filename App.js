import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react'
import Navigator from './src/navigation/Navigator'


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat_Variable.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P_Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <Header/>
      <Navigator/>
      <StatusBar style="auto" />
    </>
  );
}

