import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../global/colors';
import { useSelector } from 'react-redux';

const Header = () => {

    const user = useSelector(state => state.authSlice.value.email)
    if (!user) {
        return null;
      }
    
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tech Store 🚀</Text>
          <Text style={styles.subTitle}>Tecnología a tu alcance </Text>
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
    }
})

export default Header;
