import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductsScreen from '../screens/ProductsScreen';
import { colors } from '../global/colors';

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Categorías" component={CategoriesScreen} options ={{headerStyle:{backgroundColor: colors.blanco},headerTintColor: colors.azulOscuroTab, headerTitleStyle:{fontWeight:'bold', fontSize: 24, fontFamily: "Rubik"}}}/>
            <Stack.Screen name="Producto" component={ProductScreen} options ={{headerStyle:{backgroundColor: colors.blanco},headerTintColor: colors.azulOscuroTab, headerTitleStyle:{fontWeight:'bold', fontSize: 24, fontFamily: "Rubik"}}}/>
            <Stack.Screen name="Productos" component={ProductsScreen} options ={{headerStyle:{backgroundColor: colors.blanco},headerTintColor: colors.azulOscuroTab, headerTitleStyle:{fontWeight:'bold', fontSize: 24, fontFamily: "Rubik"}}}/>
        </Stack.Navigator>
    );
}

export default ShopNavigator;
