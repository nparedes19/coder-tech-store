import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    const user = useSelector(state => state.authSlice.value.email)
    return(
        <NavigationContainer>
            {
                user ? <TabNavigator/> : <AuthNavigator/>
            }
        </NavigationContainer>
    )
}

export default MainNavigator