import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../services/shopService';

const ProductScreen = ({ route, navigation }) => {
    const [productFound, setProductFound] = useState({})
    const id = useSelector(state =>state.shopSlice.value.productSelected)
    const { data, error, isLoading } = useGetProductQuery(id)
    const { width, height } = useWindowDimensions()

    useEffect(() => {
        setProductFound(data[0])
    }, [data[0]])
    
    const dispatch = useDispatch()

    return (
        <ScrollView style={styles.productContainer}>

            <Text style={styles.textBrand}>{productFound.brand}</Text>
            <Text style={styles.textTitle}>{productFound.title}</Text>
            <Image
                source={{ uri: productFound.mainImage }}
                alt={productFound.title}
                width='100%'
                height={width * .7}
                resizeMode='contain'
            />
            <Text style={styles.longDescription}>{productFound.longDescription}</Text>
            <View style={styles.tagsContainer}>
                <View style={styles.tags}>
                    <Text style={styles.tagText}>Tags : </Text>
                    {
                        productFound.tags?.map(tag => <Text key={Math.random()} style={styles.tagText}>{tag}</Text>)
                    }
                </View>
            </View>
            {
                productFound.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
            }
            <Text style={styles.price}>Precio: $ {productFound.price}</Text>
            <Pressable 
                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 },styles.addToCartButton]}
                onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))}>
                <Text style={styles.textAddToCart}>Agregar al carrito</Text>
            </Pressable>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    goBack: {
        padding: 8,
        color: colors.grisMedio
    },
    productContainer: {
        paddingHorizontal: 16
    },
    textBrand: {
        color: colors.grisOscuro,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700'
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical:8
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.morado
    },
    price: {
        fontWeight: '800',
        fontSize: 18
    },
    discount: {
        backgroundColor: colors.naranjaBrillante,
        width: 64,
        height:64,
        borderRadius: 64,
    },
    discountText: {
        color: colors.blanco,
        textAlign:'center',
        verticalAlign: 'center'
    },
    noStockText: {
        color: 'red'
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginVertical: 16
    },
    textAddToCart: {
        color: colors.blanco,
        fontSize: 24,
        textAlign: 'center',

    }
})
