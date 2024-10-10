import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import products from '../data/products.json'
import {useEffect, useState} from 'react'

const ProductScreen = ({productId, setProductId}) => {
    const [productFound, setProductFound] = useState({})

    useEffect(()=>{
        setProductFound(products.find(product => product.id === productId))
    },[productId])

    console.log(productFound)

    return (
        
        <View>
            <Pressable onPress={()=>setProductId(null)} style={styles.goBackContainer}>
                <Text><Icon name="arrow-back-ios" size={30} style={styles.goBack}/></Text>
            </Pressable>
            <Text>{productFound.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    goBack:{
        color: colors.grisMedio,
    },
    goBackContainer:{
        padding:10
    }
})

export default ProductScreen;
