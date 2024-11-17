import { StyleSheet, Text, FlatList } from 'react-native'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'
import { useGetReceiptsQuery } from '../services/receiptsService'

const ReceiptsScreen = () => {

  const { data, error, isLoading } = useGetReceiptsQuery()
  

  console.log(data)

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
        <Text style={styles.title}>Recibo {data.indexOf(item)}</Text>
        <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Co',dateOptions)} Hs.</Text>
        <Text style={styles.total}>Total ${item.total} </Text>
      </FlatCard>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderReceiptItem}
    />
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
  }
})
