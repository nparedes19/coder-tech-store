import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import ReceiptsScreen from "../screens/ReceiptsScreen";

const Stack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={ReceiptsScreen} name="Recibos"/>
        </Stack.Navigator>
    );
}


export default ReceiptsNavigator;
