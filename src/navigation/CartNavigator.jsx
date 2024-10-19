import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator()

const CartNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={CartScreen} name="Carrito"/>
        </Stack.Navigator>
    );
}


export default CartNavigator;
