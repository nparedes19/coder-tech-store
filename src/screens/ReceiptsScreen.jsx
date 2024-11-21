import { StyleSheet, Text, FlatList, View } from 'react-native'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'
import { useGetReceiptsQuery } from '../services/receiptsService'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const ReceiptsScreen = () => {

  const { data } = useGetReceiptsQuery()

  const localId = useSelector(state => state.authSlice.value.localId)

  const [filteredData, setFilteredData] = useState([])

  useEffect(()=>{
    if(data){
      setFilteredData(data.filter(info => info.localId === localId ))
    }
  },[data])
  
  const renderReceiptItem = ({ item }) => {

    dateOptions ={
      year: 'numeric',      
      month: '2-digit',     
      day: '2-digit',       
      hour: '2-digit',      
      minute: '2-digit',    
      hour12: false         
    };

    return (
      <FlatCard style={styles.receiptContainer}>
        <Text style={styles.title}>Recibo {filteredData.indexOf(item)}</Text>
        <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Co',dateOptions)} </Text>
        <Text style={styles.total}>Total ${item.total} </Text>
      </FlatCard>
    )
  }

  return (
    <>
      {filteredData.length === 0 ? (
        <View style={styles.noProducts}>
            <Text style={styles.textNoProducts}>No tienes recibos que mostrar 😬</Text>
        </View>):
        (
          <FlatList
            data={filteredData}
            keyExtractor={item => filteredData.indexOf(item)}
            renderItem={renderReceiptItem}
        />)}
    </>
  )
}

export default ReceiptsScreen

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    gap: 5,
    backgroundColor: colors.azulPrimario
  },
  title: {
    fontWeight: '700',
    fontFamily: 'Rubik',
    fontSize: 20,
    color: colors.naranjaPrimario
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.azulOscuroTab
  },
  date:{
    ontFamily: 'Rubik',
    fontSize: 18,
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
