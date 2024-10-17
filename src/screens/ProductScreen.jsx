import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import products from '../data/products.json'
import {useEffect, useState} from 'react'

const ProductScreen = ({route}) => {
    const [productFound, setProductFound] = useState({})
    const productId =  route.params

    useEffect(()=>{
        setProductFound(products.find(product => product.id === productId))
    },[productId])

    return (
        
        <View>
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
