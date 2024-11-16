import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../global/colors';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearUser } from '../features/auth/authSlice';
import { clearSessions } from '../db';

const Header = () => {

    const user = useSelector(state => state.authSlice.value.email)
    const dispatch = useDispatch()

    const logout = () => {
      dispatch(clearUser())
      clearSessions().then().catch()
    }

    if (!user) {
        return null;
      }
    
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tech Store 🚀</Text>
          <Text style={styles.subTitle}>Tecnología a tu alcance </Text>
          {
            user && <Pressable onPress={logout} style={styles.logout}><Icon name='logout' color='#fff' size={24}/></Pressable>
          }
        </View>
      );
}

const styles = StyleSheet.create({
    headerContainer:{
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.azulPrimarioOscuro
    },
    title:{
        fontSize:40,
        fontFamily: 'Nabla',
    },
    subTitle:{
        fontSize:18,
        marginTop: -7,
        color: colors.blanco,
        fontWeight: 'bold',
        fontFamily: "Rubik",
    },
    logout:{
      alignSelf: 'flex-end',
      marginRight: 20
    }
})

export default Header;
