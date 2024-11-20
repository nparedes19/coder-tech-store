import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import { colors } from '../global/colors'
import { useState } from 'react'
import CameraIcon from '../components/CameraIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../services/userService'




const ProfileScreen = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authSlice.value.email)
    const image = useSelector(state => state.authSlice.value.profilePicture)
    const localId = useSelector(state => state.authSlice.value.localId)
    const [triggerPicture, result] = usePutProfilePictureMutation()

    const verifyCameraPermissions = async() => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()

        if(!granted) return false
        return true
    }

    const pickImage = async () => {
        const permissionsOk  = await verifyCameraPermissions()
        if(permissionsOk){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1,1],
                base64: true,
                quality: 0.7
            })
            if(!result.canceled){
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPicture({image:`data:image/jpeg;base64,${result.assets[0].base64}` , localId})
            }

        }
    }
    

    
    return (
        <View style={styles.profileContainer}>
            <Text style={styles.titleProfile}>Tu información de perfil 🧐</Text>
            <View style={styles.imageProfileContainer}>
                {
                    image
                    ?
                    <Image source={{uri: image}} resizeMode='cover' style={styles.profileImage} />
                    :
                    <Text style ={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                  <CameraIcon/>
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user} </Text>
            <Text style={styles.userData}>Usuario: {user.split('@')[0]} </Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 135,
        height: 135,
        borderRadius: 128,
        backgroundColor: colors.naranjaPrimario,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.blanco,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 18,
        fontFamily: 'Rubik',
        color: colors.azulOscuroTab,
        fontWeight:'bold'
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    userData:{
        fontSize: 18,
        fontFamily: 'Rubik',
        marginTop: -10,
        color: colors.azulOscuroTab,
        fontWeight:'bold'
    },
    titleProfile:{
        fontSize: 20,
        fontFamily: 'Rubik',
        color: colors.naranjaPrimario,
        fontWeight:'bold',
        marginBottom: 24
    }
})