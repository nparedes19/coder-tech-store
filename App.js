import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react'
import { store } from './src/app/store';
import { Provider } from 'react-redux'
import MainNavigator from './src/navigation/MainNavigator';
import { initSessions } from './src/db';

initSessions().then(
  (result) => console.log('Tabla creada con exito', result)
  ).catch(
    (error) => console.log('error al crear la tabla', error)
  )

SplashScreen.preventAutoHideAsync();


export default function App() {




  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat_Variable.ttf'),
    'Nabla': require('./assets/fonts/Nabla-Regular.ttf'),
    'Rubik': require('./assets/fonts/Rubik-VariableFont_wght.ttf')
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
    <Provider store={store}>
      <Header/>
      <MainNavigator/>
      <StatusBar style="auto" />
    </Provider>
  );
}

