import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../global/colors';

const Search = ({setSearch}) => {
    return (
        <TextInput
            placeholder="Busca un producto"
            style={styles.searchInput}
            onChangeText={(text) => setSearch(text)}

        />
    );
}

const styles = StyleSheet.create({
    searchInput:{
        margin:5,
        borderWidth: 1,
        borderColor: colors.grisMedio,
        borderRadius: 15,
        padding: 5,
        paddingLeft:10
    }
})

export default Search;
