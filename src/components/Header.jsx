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
        fontSize:36,
        fontFamily: 'Nabla',
    },
    subTitle:{
        fontSize:16,
        marginTop: -5,
        color: colors.blanco,
    }
})

export default Header;
