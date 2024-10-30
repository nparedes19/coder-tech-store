import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { useState } from 'react';
const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    const [user,setUser] = useState('')
    return(
        <NavigationContainer>
            {
                user ? <TabNavigator/> : <AuthNavigator/>
            }
        </NavigationContainer>
    )
}

export default MainNavigator