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
        margin:10,
        borderWidth: 2,
        borderColor: colors.azulPrimarioOscuro,
        borderRadius: 17,
        padding: 10,
        paddingLeft:15,
        fontSize: 16,
        color: colors.azulPrimarioOscuro
    }
})

export default Search;
