import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react'
import TabNavigator from './src/navigation/TabNavigator';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat_Variable.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P_Regular.ttf'),
    'Nabla': require('./assets/fonts/Nabla-Regular.ttf'),
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
      <TabNavigator/>
      <StatusBar style="auto" />
    </>
  );
}

