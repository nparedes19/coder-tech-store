import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FlatCard from '../components/FlatCard';
import {useEffect, useState} from 'react'
import { colors } from '../global/colors';
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
            <View>
                <Search setSearch={setSearch}/>
            </View>
            <FlatList
                data={productsFilterd}
                keyExtractor={item=>item.id}
                renderItem={renderProductItem}
                contentContainerStyle={{ paddingBottom: 70 }}
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
        fontSize:19,
        width:'60%',
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
        width: '60%',
        marginVertical: 3,
        fontSize: 15,
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
