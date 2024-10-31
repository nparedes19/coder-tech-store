import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { useGetProfilePictureQuery } from '../services/userService';
import { setProfilePicture } from '../features/auth/authSlice';



const MainNavigator = () => {
    const user = useSelector(state => state.authSlice.value.email)
    const localId = useSelector(state => state.authSlice.value.localId)

    const dispatch = useDispatch()

    const {data: profilePicture, isLoading, error} = useGetProfilePictureQuery(localId)

    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])
    return(
        <NavigationContainer>
            {
                user ? <TabNavigator/> : <AuthNavigator/>
            }
        </NavigationContainer>
    )
}

export default MainNavigator