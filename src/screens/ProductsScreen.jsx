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
                    <View style={styles.viewImage}>
                        <Image
                            source={{uri:item.mainImage}}
                            style={styles.productImage}
                            resizeMode='contain'
                        />
                    </View>
                    <View styles={styles.productDescription}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.textDescription}>{item.shortDescription}</Text>
                        <Text style={styles.textPrice}>$ {item.price}</Text>
                    </View>
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <View styles={styles.productsContainer}>
            <Search setSearch={setSearch}/>
            <FlatList
                data={productsFilterd}
                keyExtractir={item=>item.id}
                renderItem={renderProductItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    productImage:{
        width:100,
        height:145,
    },
    productContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        marginVertical: 10,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10

    },
    productDescription:{
        width: '100%',
        
    },
    title:{
        color: colors.blanco,
        fontWeight: 'bold',
        fontSize:20,
        width:'70%',
        marginTop: 10
    },
    textPrice:{
        fontWeight: 'bold',
        marginBottom: 10,
        borderColor: colors.naranjaPrimario,
        borderWidth: 2,
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 20,
        color: colors.naranjaPrimario, 
        fontSize: 18
    },
    textDescription:{
        width: '70%',
        marginVertical: 3,
        fontSize: 15

    },
    viewImage:{
        backgroundColor: colors.azulPrimario,
        height: '100%',
        borderRadius: 10,
    },
    productsContainer:{
        backgroundColor: colors.azulPrimario,
        flex: 1
    }    
})

export default ProductsScreen;
