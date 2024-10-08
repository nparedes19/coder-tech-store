import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import Header from './src/components/Header';
import ProductsScreen from './src/screens/ProductsScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react'


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat_Variable.ttf'),
    'PressStart2P': require('./assets/fonts/PressStart2P_Regular.ttf'),
  });

  const [category, setCategory] = useState('')

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
      {/* <CategoriesScreen/> */}
      {/* <ProductsScreen/> */}
      {
        category
        ?
        <ProductsScreen category ={category}/>
        :
        <CategoriesScreen setCategory={setCategory}/>
      }
      <StatusBar style="auto" />
    </>
  );
}

