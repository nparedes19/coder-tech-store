import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors';
import { useEffect, useState } from 'react';
import { useSignupMutation } from '../services/authService';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({navigation}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmPassword] = useState("")

    const [triggerSignup, result] = useSignupMutation()

    const dispatch = useDispatch()

    console.log(result)

    useEffect(() => {
        if(result.status === "relected"){

        }else if(result.status === "fulfilled"){
            dispatch(setUser(result.data))
        }

    },[result])

    const onSubmit = () => {
        console.log(email)
        console.log(password)
        console.log(confirmpassword)
        triggerSignup({email,password})
    }


    return (
        <LinearGradient
            colors={['#72b8cf', '#41626d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <Text style={styles.title}>Tech Store 🚀</Text>
            <Text style={styles.subTitle}>Registrate</Text>
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
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir constraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Inicia sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable><Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text></Pressable>
            </View>
        </LinearGradient>
    )
}

export default SignupScreen

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
        marginTop: 35,
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
        color: colors.blanco
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