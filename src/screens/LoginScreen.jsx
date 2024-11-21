import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearSessions, insertSession } from '../db';
import Toast from 'react-native-toast-message';


const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

    const showToast = (type,message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000,
        })
    }

    useEffect(()=>{
        if(result.isSuccess){
            dispatch(setUser(result.data))
            if(rememberMe){
                clearSessions().then(() => console.log('Sesiones eliminadas')).catch(error => console.log("Error al eiminar las sesiones"))
                insertSession({
                    localId: result.data.localId,
                    email: result.data.email,
                    token: result.data.idToken
                }).then((result) => console.log(result)).catch(
                    error=> console.log(error)
                )
            }
        }
        if(result.error){
            if(result.error.data.error.code === 400){
                showToast('error', 'Datos incorrectos 🙁')
            }
        }
    },[result, rememberMe])

    const onsubmit = ()=>{     
        triggerLogin({email,password})
    }

    return (
        <LinearGradient
            colors={['#72b8cf', '#41626d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <Text style={styles.title}>Tech Store 🚀</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Correo"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />

            </View>
            <View style={styles.rememberMeBox}>
                <Text style={styles.whiteText}>Recordar datos</Text>
                {
                    rememberMe
                    ?
                    <Pressable onPress={() =>  setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.naranjaPrimario}/></Pressable>
                    :
                    <Pressable onPress={() =>  setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={'rgba(255, 255, 255, 0.3)'}/></Pressable>
                }
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Ingresar</Text></Pressable>

            <View style={styles.registerBox}>
                <Text style={styles.whiteText}>¿No tienes cuenta?</Text>
                <Pressable  onPress={() => navigation.navigate('Signup')}>
                  <Text style={{ ...styles.f, ...styles.strongText }}>Registrate aquí 😊</Text>
                </Pressable>
            </View>
            <Toast/>
        </LinearGradient>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Nabla',
        fontSize: 45
    },
    subTitle: {
        fontFamily: "Rubik",
        fontSize: 24,
        color: colors.naranjaPrimario,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 30,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: textInputWidth,
        color: colors.blanco,
        fontSize: 16
    },
    whiteText: {
        color: colors.blanco,
        marginLeft: -5,
        fontSize: 16
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 18,
        color: colors.blanco,
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.naranjaPrimario,
        borderRadius: 12,
        marginTop: 25
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    registerBox: {
        alignItems: 'center',
        marginTop: 64
    },
    rememberMeBox: {
        flexDirection:'row',
        alignItems: 'center',
        gap: 15
    }
})