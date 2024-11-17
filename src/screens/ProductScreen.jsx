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
        if (data && data.length > 0) {
            setProductFound(data[0]);
        }
    }, [data])
    
    const dispatch = useDispatch()

    return (
        <ScrollView style={styles.productContainer}>

            <View style={styles.titleBox}>
                <Text style={styles.textTitle}>{productFound.title}</Text>
                {/* <Text style={styles.textBrand}>{productFound.brand}</Text> */}
            </View>
            <View style={styles.productBox}>  
                <Image
                    source={{ uri: productFound.mainImage }}
                    alt={productFound.title}
                    width='100%'
                    height={width * .7}
                    resizeMode='contain'
                />
                <Text style={styles.longDescription}>{productFound.longDescription}</Text>
            </View>
            <View style={styles.priceBox}>
                <Text style={styles.priceText}>Precio: $ {productFound.price}</Text>
            </View>
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
        fontWeight: '700',
        color: colors.azulOscuroTab
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        padding: 8,

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
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.naranjaPrimario,
        borderRadius: 20,
        marginVertical: 16
    },
    textAddToCart: {
        color: colors.blanco,
        fontSize: 24,
        textAlign: 'center',

    },
    titleBox:{
        backgroundColor: colors.azulPrimario,
        padding:15,
        marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20, 
        alignItems: 'center'
    },
    productBox:{
        borderLeftColor: colors.azulOscuroTab,
        borderWidth: 1,
        borderTopColor: colors.blanco,
        borderBottomColor: colors.blanco
       
    },
    priceBox:{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20, 
        backgroundColor: colors.azulPrimario,
    },
    priceText:{
        fontWeight: '800',
        fontSize: 18,
        color: colors.azulOscuroTab,
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16
    }
})
