import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator()

const ProfileNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Perfil" component={ProfileScreen}/>
    </Stack.Navigator>
)

export default ProfileNavigator