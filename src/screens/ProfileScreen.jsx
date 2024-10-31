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
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.morado,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.blanco,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
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
    }
})