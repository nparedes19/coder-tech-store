import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import products from '../data/products.json'
import FlatCard from '../components/FlatCard';
import MontesrratText from '../components/MontesrratText';
import {useEffect, useState} from 'react'

const ProductsScreen = ({category}) => {

    const [productsFilterd, setProductsFiltered] = useState([])

    useEffect(()=>{
        const productosTempFiltered = products.filter(product => product.category === category.toLowerCase())
        setProductsFiltered(productosTempFiltered)
    }, [category])

    const renderProductItem = ({item}) => {
        return(
            <FlatCard style={styles.productContainer}>
                <View>
                    <Image
                        source={{uri:item.mainImage}}
                        style={styles.productImage}
                        resizeMode='contain'
                    />
                </View>
                <View styles={styles.productDescription}>
                    <MontesrratText>{item.title}</MontesrratText>
                    <Text>{item.shortDescription}</Text>
                    <FlatList
                        data={item.tags}
                        keyExtractor={() => Math.random()}
                        renderItem={({item})=> <Text>{item}</Text>}
                    />
                    {
                        item.discount > 0 && <Text>Descuento: {item.discount}</Text>
                    }
                    {
                        item.stock <= 0 && <Text>Sin stock</Text>
                    }
                    <Text>{item.price}</Text>
                </View>
            </FlatCard>
        )
    }
    return (
        <>
            <Pressable>
                
            </Pressable>
            <FlatList
                data={productsFilterd}
                keyExtractir={item=>item.id}
                renderItem={renderProductItem}
            />
        </>
    );
}

const styles = StyleSheet.create({
    productImage:{
        width:100,
        height:100
    },
    productContainer:{
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'flex-start',
        gap: 15
    },
    productDescription:{
        width: '75%'
    }
})

export default ProductsScreen;
