import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/authService';


const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

    useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al iniciar sesión", result)
        }else if(result.status==="fulfilled"){
            console.log("Usuario logueado con éxito")
            dispatch(setUser(result.data))
        }
    },[result])

    const onsubmit = ()=>{
        //console.log(email,password)       
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
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¡Registrate</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        aquí!
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Ingresar</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={()=>dispatch(setUser({email:"demo@mundogeek.com",token:"demo"}))}>
                  <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
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
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco,
        marginLeft: -5
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.naranjaPrimario,
        borderRadius: 12,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    }
})