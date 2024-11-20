import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { useGetProfilePictureQuery } from '../services/userService';
import { setProfilePicture, setUser } from '../features/auth/authSlice';
import { fetchSession } from '../db';



const MainNavigator = () => {
    const user = useSelector(state => state.authSlice.value.email)
    const localId = useSelector(state => state.authSlice.value.localId)

    const dispatch = useDispatch()

    const {data: profilePicture, isLoading, error} = useGetProfilePictureQuery(localId)

    useEffect(()=>{
        if(!user){
            (async ()=>{
                try{
                    const session = await fetchSession()
                    if(session.length){
                        dispatch(setUser(session[0]))
                    }
                }catch(error){
                    console.log("Error al obtener la sesión", error)
                }    
            })()
        }
    },[user])

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