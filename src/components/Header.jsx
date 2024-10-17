import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../global/colors';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Tech Store</Text>
            <Text style={styles.subTitle}>Tecnología a tu alcance 🚀</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer:{
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grisOscuro
    },
    title:{
        fontSize:24,
        // fontWeight: 'bold',
        color: colors.amarillo,
        fontFamily: 'PressStart2P',
    },
    subTitle:{
        fontSize:16,
        marginTop: 10,
        color: colors.blanco,
    }
})

export default Header;
