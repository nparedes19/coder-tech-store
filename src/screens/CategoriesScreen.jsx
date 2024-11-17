import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FlatCard from '../components/FlatCard';
import { useDispatch } from 'react-redux';
import { setCategory } from '../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../services/shopService';
import { colors } from '../global/colors'

const CategoriesScreen = ({navigation}) => {

    const { data: categories } = useGetCategoriesQuery()

    const dispatch = useDispatch()

    const renderCategoryItem = ({item}) =>{
        return(
            <Pressable onPress={()=>{
                    dispatch(setCategory(item.title))
                    navigation.navigate('Productos')
                    }}>
                <FlatCard style={styles.flatCardContainer}>
                    <Image
                        source={{uri:item.image}}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        )
    }

    return (
        <View style={styles.categoriesContainer}>
            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderCategoryItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatCardContainer:{
        padding:20,
        alignItems: 'center',
        
        marginHorizontal:10,
        marginVertical: 5,
    },
    image:{
        height:80,
        width:150
    },
    categoryTitle:{
        fontSize:24,
        fontWeight: 'bold',
        fontFamily: "Rubik",
        color: colors.azulOscuroTab,
        marginTop: 7
    },
    categoriesContainer:{
        flex:1, 
        backgroundColor: colors.blanco,
    }
})

export default CategoriesScreen;


