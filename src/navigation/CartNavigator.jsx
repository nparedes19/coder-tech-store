import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import { colors } from '../global/colors'

const Stack = createNativeStackNavigator()

const CartNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={CartScreen} name="Carrito" options ={{headerStyle:{backgroundColor: colors.blanco},headerTintColor: colors.azulOscuroTab, headerTitleStyle:{fontWeight:'bold', fontSize: 24, fontFamily: "Rubik"}}}/>
        </Stack.Navigator>
    );
}


export default CartNavigator;
