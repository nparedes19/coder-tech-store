import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MontesrratText = ({children,style}) => {
    return (
        <Text style={{...styles.textMontserrat,...style}}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    textMontserrat:{
        fontFamily: 'Montserrat'
    }
})

export default MontesrratText;
