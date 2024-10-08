import React from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard';

const CategoriesScreen = ({setCategory}) => {

    const renderCategoryItem = ({item, index}) =>{
        return(
            <Pressable onPress={()=>setCategory(item.title)}>
                <FlatCard style={
                        index%2==0 ?
                        {...styles.flatCardContainer,...styles.row} :
                        {...styles.flatCardContainer,...styles.rowReverse}
                    }>
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
        justifyContent:'space-between',
        marginHorizontal:10,
        marginVertical: 5
    },
    image:{
        height:80,
        width:150
    },
    categoryTitle:{
        fontSize:24,
        fontWeight: 'bold'
    },
    row:{
        flexDirection:'row'
    },
    rowReverse:{
        flexDirection: 'row-reverse'
    },
    categoriesContainer:{
        flex:1
    }
})

export default CategoriesScreen;


