import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
// import products from '../data/products.json'
import FlatCard from '../components/FlatCard';
import MontesrratText from '../components/MontesrratText';
import {useEffect, useState} from 'react'
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../features/shop/shopSlice';
import { useGetProductsByCategoryQuery } from '../services/shopService';

const ProductsScreen = ({navigation,route}) => {

    const dispatch = useDispatch()
 
    const [productsFilterd, setProductsFiltered] = useState([])
    const [search, setSearch] = useState('')
    const category = useSelector(state =>state.shopSlice.value.categorySelected)
    const { data: producstFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category)

    useEffect(()=>{
        setProductsFiltered(producstFilteredByCategory)
        if(search){
            const productsTempSearched = productsFilterd.filter(product=>product.title.toLowerCase().includes(search.toLowerCase()))
            setProductsFiltered(productsTempSearched)
        }
    }, [search,producstFilteredByCategory])

    const renderProductItem = ({item}) => {
        return(
            <Pressable onPress={()=>{
                dispatch(setProduct(item.id))
                navigation.navigate("Producto")}}>
                <FlatCard style={styles.productContainer}>
                    <View>
                        <Image
                            source={{uri:item.mainImage}}
                            style={styles.productImage}
                            resizeMode='contain'
                        />
                    </View>
                    <View styles={styles.productDescription}>
                        <MontesrratText style={styles.title}>{item.title}</MontesrratText>
                        <Text style={styles.textDescription}>{item.shortDescription}</Text>
                        <View style={styles.containerTags}>
                            <Text style={styles.titleTags}>Tags: </Text>
                            <FlatList
                                style={styles.containerTags}
                                data={item.tags}
                                keyExtractor={() => Math.random()}
                                renderItem={({item})=> <Text style={styles.tags}>{item}</Text>}
                            />
                        </View>
                        {
                            item.discount > 0 && <View style={styles.discount}><Text style={styles.textDiscount}>Descuento: {item.discount} %</Text></View>
                        }
                        {
                            item.stock <= 0 && <Text style={styles.stock}>Sin stock</Text>
                        }
                        <Text style={styles.textPrice}>Precio: $ {item.price}</Text>
                    </View>
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <>
            <Search setSearch={setSearch}/>
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
        gap: 15,
        marginVertical: 10,
        width: '95%',
        alignSelf: 'center'

    },
    productDescription:{
        width: '75%',
    },
    discount: {
        backgroundColor: colors.naranjaBrillante,
        padding: 8,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginVertical: 10
    },
    textDiscount: {
        color: colors.blanco
    },
    stock:{
        color: colors.rojo
    },
    title:{
        color: colors.negro,
        fontSize:16,
        width:'70%'
    },
    textPrice:{
        fontWeight: 'bold'
    },
    textDescription:{
        width: '60%',
        marginVertical: 5
    },
    containerTags:{
        flexDirection:'row',
    },
    tags:{
        marginHorizontal: 3,
        color: colors.morado
    },
    titleTags:{
        color: colors.morado
    },
    goBack:{
        color: colors.grisMedio,
    },
    goBackContainer:{
        padding:10
    }
})

export default ProductsScreen;
