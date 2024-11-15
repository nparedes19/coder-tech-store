import React, { useState } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import FlatCard from '../components/FlatCard';
import MapView, {Marker} from 'react-native-maps';


const MyPlacesScreen = () => {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [title, setTitle] = useState('')
    const [places, setPlaces] = useState([])
    console.log('lugares',places)

    
    const renderPlaceItem = ({item}) => (
        <FlatCard style={styles.placeContainer}>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.mapTitle}>Latitud: {item.coords.latitude}</Text>
                <Text style={styles.mapTitle}>Longitud: {item.coords.longitude}</Text>
            </View>
        </FlatCard>
    )

    const showToast = (type,message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000,
        })
    }

    getPermissions = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if(status !== 'granted'){
            return false
        }

        return true
    }

    const getLocation = async () => {
        const permissionOk = await getPermissions()
        if (!permissionOk) {
            setErrorMsg('Permission to access location was denied');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            if(location){
                showToast('success', 'Se encontró la ubicación')
            }else{
                setErrorMsg('Error getting location')
                showToast('error', 'Ubicación no encontrada')
            }
            setLocation(location.coords)
        }
    }

    const savePlace = () => {
        if(location&&title){
            setPlaces(prevState => [...prevState,{id: Math.random(), title, 'coords': {'latitude' : location.latitude, 'longitude' : location.longitude }}])
            setLocation(null)
            setTitle('')
        }else{
            showToast('error', 'No estan completos los datos :(')
        }
        
    }


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput}  placeholder="Ingresa un titulo" onChangeText = {(text) => setTitle(text)} value={title}/>
                <Pressable onPress={getLocation}><Icon name="location-on" color={colors.naranjaBrillante} size={25}></Icon></Pressable>
                <Pressable onPress={savePlace}><Icon name="add-circle" color={colors.verdeNeon} size={30}></Icon></Pressable>
            </View>
            <FlatList
                data ={places}
                keyExtractor={item => item.id}
                renderItem={renderPlaceItem}/>
            <Toast/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 18,
    },
    subtitle: {
      fontSize: 12,
      color: colors.grisOscuro
    },
    inputContainer: {
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.grisMedio,
      borderRadius: 20,
      padding: 8,
      width: '80%',
      paddingLeft: 16,
    },
    placesContainer: {
      marginTop: 16
    },
    placeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 16,
      margin: 4,
      gap: 24
    },
    mapContainer: {
      width: 120,
      height: 120,
      borderRadius: 75,
      overflow: "hidden",
      elevation: 5,
    },
    map: {
      width: 120,
      height: 120,
    },
    mapTitle: {
      fontWeight: '700'
    },
    address: {
  
    },
    placeDescriptionContainer: {
      width: '60%',
      padding: 8
    }
  });

export default MyPlacesScreen;
