import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../global/colors';

const FlatCard = ({children,style}) => {
    return (
        <View style={{...styles.cardContainer,...style}}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:colors.grisMedio,
        shadowColor: colors.negro,
        shadowOpacity:1,
        shadowRadius:1,
        shadowOffset:{width:3, height:5},
        elevation: 5
    }
})

export default FlatCard;
