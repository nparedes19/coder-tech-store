import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPlacesScreen from "../screens/MyPlacesScreen";

const Stack = createNativeStackNavigator()

const MyPlaceNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Mis lugares" component={MyPlacesScreen}/>
    </Stack.Navigator>
)

export default MyPlaceNavigator
