import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductsScreen from '../screens/ProductsScreen';
import { colors } from '../global/colors';

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Categorías" component={CategoriesScreen} options ={{headerStyle:{backgroundColor: colors.grisClaro}}}/>
                <Stack.Screen name="Producto" component={ProductScreen} options ={{headerStyle:{backgroundColor: colors.grisClaro}}}/>
                <Stack.Screen name="Productos" component={ProductsScreen} options ={{headerStyle:{backgroundColor: colors.grisClaro}}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default Navigation;
