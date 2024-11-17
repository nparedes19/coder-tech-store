import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReceiptsScreen from "../screens/ReceiptsScreen";
import { colors } from '../global/colors';

const Stack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={ReceiptsScreen} name="Recibos" options ={{headerStyle:{backgroundColor: colors.blanco},headerTintColor: colors.azulOscuroTab, headerTitleStyle:{fontWeight:'bold', fontSize: 24, fontFamily: "Rubik"}}}/>
        </Stack.Navigator>
    );
}


export default ReceiptsNavigator;
