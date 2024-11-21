import { FlatList, StyleSheet, Text, View, Image,Pressable } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import FlatCard from '../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import { clearCart, removeItem, lessQuantity, moreQuantity } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService'

const CartScreen = ({navigation}) => {

    const cart = useSelector(state => state.cartSlice.value.cartItems)
    const total = useSelector(state => state.cartSlice.value.total)
    const localId = useSelector(state => state.authSlice.value.localId)
    const [trigerPost, result] = usePostReceiptMutation()

    const dispatch = useDispatch()

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerTotal}>Total: $ {total} </Text>
            <Pressable style={styles.confirmButton} onPress={() => {
                    trigerPost({cart, total, createdAt: Date.now(), localId})
                    dispatch(clearCart())
                    navigation.navigate('Receipts')
                }}>
                <Text style={styles.confirmButtonText}>Confirmar compra 😍</Text>
            </Pressable>
            <View style={styles.boxClear}>
                <Icon name="delete" size={32} color="#FC7A5E" style={styles.trashIcon} onPress={()=>{dispatch(dispatch(clearCart()))}}/>
                <Text style={styles.textClear}>Vaciar carrito</Text>
            </View>
        </View>
    )

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <View style={styles.boxImage}>
                <Image
                    source={{ uri: item.mainImage }}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <Text style={styles.price}>Precio: $ {item.price}</Text>
                <View style={styles.quantityBox}>
                    <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                    <Icon name="indeterminate-check-box" style={styles.addIcon} size={26} onPress={()=>{dispatch(lessQuantity(item))}}/>
                    <Icon name="add-box" style={styles.addIcon} size={26} onPress={()=>{dispatch(moreQuantity(item))}}/>
                </View>
                <View style={styles.boxTotal}>
                    <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
                    <View style={styles.boxDelete}>
                        <Icon name="delete" size={29} color="#FC7A5E" style={styles.trashIcon} onPress={()=>{dispatch(removeItem(item))}}/>
                        <Text style={styles.textDelete}>Eliminar</Text>
                    </View>
                </View>
            </View>
        </FlatCard>
    )

    return (
        <View>
            {cart.length === 0 ? (
                <View style={styles.noProducts}>
                    <Text style={styles.textNoProducts}>No tienes productos en tu carrito 😭</Text>
                </View>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={item => item.id}
                    renderItem={renderCartItem}
                    ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito 🛒</Text>}
                    ListFooterComponent={<FooterComponent />}
                />
            )}
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10,
        backgroundColor: colors.azulPrimario
    },
    cartImage: {
        width: 120,
        height: 120,
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.naranjaPrimario
    },
    description: {
        marginBottom: 12,
        marginTop: 5,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.azulOscuroTab
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700',
        width: 145
    },
    trashIcon: {
        alignSelf:'center'
    },
    footerContainer: {
        marginTop: 10,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Rubik',
        color: colors.azulOscuroTab
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.naranjaPrimario,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colors.blanco,
        fontSize: 20,
        fontWeight: '700'
    }, cartScreenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        paddingVertical: 8,
        fontFamily: 'Rubik',
    },
    boxDelete:{
        alignSelf: 'flex-end',
        marginTop: -12,
    },
    textDelete:{
        fontFamily: 'Rubik',
        color: colors.naranjaPrimario,
        fontSize: 18, 
        fontWeight: 'bold',
        marginTop:-2
    },
    price:{
        fontFamily: 'Rubik',
        fontWeight: 'bold'
    },
    quantity:{
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginRight: 10
    },
    quantityBox: {
        flexDirection: 'row', 
        marginTop: 12
    },
    addIcon:{
        color: colors.naranjaPrimario
    },
    boxImage:{
        width: '25%',

    },
    boxTotal:{
        flexDirection: 'row',
    },
    boxClear:{
        alignSelf: 'center',
        height: 50,
        marginBottom: 20,
        marginTop: -12
    },
    textClear:{
        fontFamily: 'Rubik',
        color: colors.naranjaPrimario,
        fontSize: 20, 
        fontWeight: 'bold',
        marginTop:-2
    },
    noProducts:{
        padding: 20,
        backgroundColor: colors.azulPrimario,
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 16
    },
    textNoProducts:{
        fontFamily: 'Rubik',
        color: colors.naranjaPrimario,
        fontSize: 20, 
        fontWeight: 'bold',

    }

})
